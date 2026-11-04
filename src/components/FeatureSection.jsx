import React from 'react';
import { FeatureArtwork } from './FeatureArtwork';

export default function FeatureSection({
  title,
  paragraphs = [],
  model,
  modelSide = 'right',
  theme = 'dark', // 'dark' | 'light'
  children,
}) {
  const isLight = theme === 'light';

  return (
    <div
      className={`relative w-full py-16 sm:py-24 px-4 sm:px-8 transition-colors duration-300 ${
        isLight
          ? 'bg-[#eaeaea] text-[#222]'
          : 'bg-[#151515] text-[#949494]'
      }`}
    >
      {/* Subtle Dither Pattern Separation at Top */}
      <div className="dither-boundary absolute top-0 left-0 right-0 pointer-events-none" />

      <div className="max-w-6xl w-full mx-auto">
        <div
          className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center ${
            modelSide === 'left' ? 'lg:flex-row-reverse' : ''
          }`}
        >
          {/* Artwork / Canvas Column */}
          {model && (
            <div
              className={`lg:col-span-5 flex items-center justify-center ${
                modelSide === 'left' ? 'lg:order-1' : 'lg:order-2'
              }`}
            >
              <FeatureArtwork type={model} theme={theme} />
            </div>
          )}

          {/* Copy Column */}
          <div
            className={`${
              model ? 'lg:col-span-7' : 'lg:col-span-12 max-w-3xl mx-auto text-center'
            } ${modelSide === 'left' ? 'lg:order-2' : 'lg:order-1'}`}
          >
            {title && (
              <h2
                className={`text-3xl sm:text-4xl md:text-5xl font-pixel font-bold tracking-tight mb-6 ${
                  isLight ? 'text-black' : 'text-white'
                }`}
              >
                {title}
              </h2>
            )}

            <div
              className={`space-y-4 text-base sm:text-lg leading-relaxed ${
                isLight ? 'text-[#444]' : 'text-kyun-text'
              }`}
            >
              {paragraphs.map((p, idx) => (
                <p key={idx} className="font-sans">
                  {p}
                </p>
              ))}
            </div>

            {children && <div className="mt-8">{children}</div>}
          </div>
        </div>
      </div>
    </div>
  );
}
