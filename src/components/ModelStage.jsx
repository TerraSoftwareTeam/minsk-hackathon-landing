import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import modelsData from '../models_data.json';

// Model Vertex Shader
const modelVertexShader = `
varying vec2 vUv;
varying vec3 vNormalView;

void main() {
	vUv = uv;
	vNormalView = normalize(normalMatrix * normal);
	gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

// Model Fragment Shader matching Kyun's exact rasterizer formula
const modelFragmentShader = `
uniform sampler2D map;
uniform float opacity;
varying vec2 vUv;
varying vec3 vNormalView;

void main() {
	vec4 texel = texture2D(map, vUv);
	if (texel.a < 0.05) discard;
	vec3 normal = normalize(vNormalView);
	vec3 keyDirection = normalize(vec3(-0.45, 0.7, 0.55));
	vec3 fillDirection = normalize(vec3(0.55, -0.25, 0.3));
	float f = max(dot(normal, keyDirection), 0.0);
	float p = max(dot(normal, fillDirection), 0.0);
	float m = clamp(normal.z * 0.5 + 0.5, 0.0, 1.0);
	float h = clamp(normal.y * 0.5 + 0.5, 0.0, 1.0);
	float g = pow(max(0.0, 1.0 - abs(normal.z)), 1.65);
	float light = (0.46 + f * 0.58 + p * 0.14 + m * 0.2 + h * 0.08 + g * 0.18) * opacity;
	// Kyun's 5-step tone quantization for authentic retro shading
	light = floor(light * 5.0 + 0.5) / 5.0;
	vec3 color = texel.rgb * light;
	gl_FragColor = vec4(color, texel.a * (opacity > 0.8 ? 1.0 : opacity));
}
`;

// Post-Processing Screen Quad Shader (Crisp pixel art + subtle specular glint)
const postVertexShader = `
varying vec2 vUv;
void main() {
	vUv = uv;
	gl_Position = vec4(position.xy, 0.0, 1.0);
}
`;

const postFragmentShader = `
uniform sampler2D source;
uniform vec2 resolution;
varying vec2 vUv;

void main() {
	vec4 base = texture2D(source, vUv);
	if (base.a < 0.05) {
		// Subtle specular edge glint on highlights
		float count = 0.0;
		vec2 step = 1.0 / resolution;
		for (float x = -1.0; x <= 1.0; x += 1.0) {
			for (float y = -1.0; y <= 1.0; y += 1.0) {
				if (x == 0.0 && y == 0.0) continue;
				vec4 s = texture2D(source, vUv + vec2(x, y) * step);
				if (max(max(s.r, s.g), s.b) >= 0.91) {
					count += 1.0;
				}
			}
		}
		if (count > 0.0) {
			gl_FragColor = vec4(1.0, 1.0, 1.0, (count / 8.0) * 0.22);
			return;
		}
		discard;
	}
	gl_FragColor = base;
}
`;

export default function ModelStage({ model, side = 'right', mirror = false, tone = 'dark' }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const data = modelsData[model];
    if (!data) return;

    const renderSize = 144;

    // 1. Scene & Camera setup matching Kyun's exact parameters
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(78, 1, 0.01, 2000);
    // Camera is positioned at y = 6, z = 3.05
    camera.position.set(0, 6, 3.05);

    // 2. Offscreen Render Target for Scene
    const renderTarget = new THREE.WebGLRenderTarget(renderSize, renderSize, {
      minFilter: THREE.NearestFilter,
      magFilter: THREE.NearestFilter,
      format: THREE.RGBAFormat,
    });

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: false,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(renderSize, renderSize);
    renderer.setPixelRatio(1);
    renderer.setClearColor(0x000000, 0);

    const canvas = renderer.domElement;
    canvas.style.width = '100%';
    canvas.style.maxWidth = '560px';
    canvas.style.height = 'auto';
    canvas.style.aspectRatio = '1 / 1';
    canvas.style.display = 'block';
    canvas.style.imageRendering = 'pixelated';

    container.innerHTML = '';
    container.appendChild(canvas);

    // 4. Post-processing Screen Quad
    const postScene = new THREE.Scene();
    const postCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const postMaterial = new THREE.ShaderMaterial({
      uniforms: {
        source: { value: renderTarget.texture },
        resolution: { value: new THREE.Vector2(renderSize, renderSize) },
      },
      vertexShader: postVertexShader,
      fragmentShader: postFragmentShader,
      transparent: true,
      depthTest: false,
      depthWrite: false,
    });
    const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), postMaterial);
    postScene.add(quad);

    // 5. Texture & 3D Object Loading
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load(data.texture);
    texture.minFilter = THREE.NearestFilter;
    texture.magFilter = THREE.NearestFilter;
    texture.generateMipmaps = false;

    const material = new THREE.ShaderMaterial({
      uniforms: {
        map: { value: texture },
        opacity: { value: 1.0 },
      },
      vertexShader: modelVertexShader,
      fragmentShader: modelFragmentShader,
      transparent: true,
      depthTest: true,
      depthWrite: true,
    });

    const orbitMaterial = new THREE.ShaderMaterial({
      uniforms: {
        map: { value: texture },
        opacity: { value: 0.62 },
      },
      vertexShader: modelVertexShader,
      fragmentShader: modelFragmentShader,
      transparent: true,
      depthTest: true,
      depthWrite: false,
    });

    let mainMesh = null;
    const orbitMeshes = [];
    let baseScale = 1.0;

    const loader = new OBJLoader();
    loader.load(
      data.obj,
      (obj) => {
        let geometry = null;
        obj.traverse((child) => {
          if (child.isMesh && !geometry) {
            geometry = child.geometry;
          }
        });

        if (!geometry) return;

        geometry.computeVertexNormals();
        geometry.computeBoundingBox();
        const bbox = geometry.boundingBox;
        geometry.center();

        const size = new THREE.Vector3();
        bbox.getSize(size);
        const maxDim = Math.max(size.x, size.y, size.z);
        baseScale = 1.95 / (maxDim || 1);

        // Main Center Mesh
        mainMesh = new THREE.Mesh(geometry, material);
        // Important: keep scale.y POSITIVE so lock is right-side up!
        mainMesh.scale.set(baseScale * (mirror ? -1 : 1), baseScale, baseScale);
        mainMesh.position.set(0, 6, 0);
        scene.add(mainMesh);

        // 7 Orbiting Satellites (Kyun's exact signature effect with 0.62 opacity!)
        for (let i = 0; i < 7; i++) {
          const orbitMesh = new THREE.Mesh(geometry, orbitMaterial);
          orbitMesh.scale.set(baseScale * 0.2 * (mirror ? -1 : 1), baseScale * 0.2, baseScale * 0.2);
          scene.add(orbitMesh);
          orbitMeshes.push(orbitMesh);
        }
      },
      undefined,
      (err) => console.warn('Error loading OBJ:', err)
    );

    let animationId;
    const startTime = performance.now();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const time = (performance.now() - startTime) * 0.00095;

      if (mainMesh) {
        // Main Mesh motion matching Kyun's exact formula:
        mainMesh.position.set(0, Math.sin(time * 1.4) * 0.3 + 6, 0);
        mainMesh.rotation.set(
          Math.sin(time * 0.8) * 0.05 - 0.025,
          Math.cos(time) * 0.5 - 0.3,
          Math.cos(time * 1.2) * 0.4 - 0.4
        );

        // 7 Orbiting Satellites matching Kyun's exact formula:
        const orbitRadius = 1.5;
        orbitMeshes.forEach((mesh, i) => {
          const orbitAngle = time + (i / 7) * 6;
          const orbitX = orbitRadius * Math.cos(orbitAngle);
          const orbitY = 0.4 * Math.sin((time + i) * 0.7) - Math.sin((time + i) * 1.3) * 0.3 + 6;
          const orbitZ = orbitRadius * Math.sin(orbitAngle);

          mesh.position.set(orbitX, orbitY, orbitZ);
          mesh.rotation.set(
            0,
            Math.cos((time + Math.pow(4, i % 3)) * 0.7) * 2.6 - 1,
            Math.cos((time + Math.pow(4, i % 3)) * 1) * 0.1 + 0.2
          );
        });
      }

      // Step 1: Render 3D scene to offscreen render target
      renderer.setRenderTarget(renderTarget);
      renderer.clear();
      renderer.render(scene, camera);

      // Step 2: Render composite post-process with Bloom + Pixelation to canvas
      renderer.setRenderTarget(null);
      renderer.render(postScene, postCamera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      renderer.dispose();
      renderTarget.dispose();
      if (container) {
        container.innerHTML = '';
      }
    };
  }, [model, mirror, tone]);

  return (
    <div className={`_stage_wfqf8_1 ${mirror ? '_mirror_wfqf8_12' : ''}`} aria-hidden="true">
      <div className="_renderTarget_wfqf8_16" ref={mountRef}></div>
    </div>
  );
}
