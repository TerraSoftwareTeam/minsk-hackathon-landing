import React, { useState, useEffect, useRef } from 'react';
import { Cpu, HardDrive, Wifi, Server, Check, Play, Pause, RefreshCw } from 'lucide-react';

const RAM_OPTIONS = [2, 4, 8, 16, 32, 64];
const DISK_OPTIONS = [50, 100, 200, 400, 800];
const CORE_OPTIONS = [1, 2, 4, 8, 16];
const IP_OPTIONS = [0, 1, 2, 4];

export default function SpecsCalculator({ onDeploy }) {
  const [ram, setRam] = useState(8);
  const [disk, setDisk] = useState(100);
  const [cores, setCores] = useState(4);
  const [ips, setIps] = useState(1);
  const [copied, setCopied] = useState(false);
  const [autoDemo, setAutoDemo] = useState(false);

  // Price Calculation formula based on Kyun's actual structure
  const monthlyPrice = (
    cores * 1.10 +
    ram * 0.40 +
    (disk / 50) * 0.35 +
    ips * 1.50
  ).toFixed(2);

  const hourlyPrice = (monthlyPrice / 730).toFixed(4);

  // Automated slider movement demo
  useEffect(() => {
    if (!autoDemo) return;
    const interval = setInterval(() => {
      setRam((prev) => {
        const nextIdx = (RAM_OPTIONS.indexOf(prev) + 1) % RAM_OPTIONS.length;
        return RAM_OPTIONS[nextIdx];
      });
      setDisk((prev) => {
        const nextIdx = (DISK_OPTIONS.indexOf(prev) + 1) % DISK_OPTIONS.length;
        return DISK_OPTIONS[nextIdx];
      });
      setCores((prev) => {
        const nextIdx = (CORE_OPTIONS.indexOf(prev) + 1) % CORE_OPTIONS.length;
        return CORE_OPTIONS[nextIdx];
      });
    }, 2800);

    return () => clearInterval(interval);
  }, [autoDemo]);

  const handleCopySpecs = () => {
    const specSummary = `Kyun VM Specs: ${cores} vCPU Cores, ${ram}GB RAM, ${disk}GB NVMe SSD, ${ips} IPv4 -> $${monthlyPrice}/mo`;
    navigator.clipboard?.writeText(specSummary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div id="specs" className="w-full max-w-4xl mx-auto my-6">
      <div className="bg-[#181818] border border-white/20 rounded-md shadow-2xl p-6 sm:p-8 backdrop-blur-md relative overflow-hidden">
        {/* Header inside box */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
              <h3 className="text-xl font-mono font-bold text-white tracking-wide">
                Configurable Specs
              </h3>
            </div>
            <p className="text-xs font-mono text-kyun-textDark mt-1">
              Real-time resource allocation with zero billing surprises
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setAutoDemo(!autoDemo)}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded border transition-colors ${
                autoDemo
                  ? 'bg-emerald-950/60 border-emerald-500/60 text-emerald-300'
                  : 'bg-black/40 border-white/15 text-[#888] hover:text-white'
              }`}
            >
              {autoDemo ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
              <span>{autoDemo ? 'Demo Running' : 'Auto Demo'}</span>
            </button>
            <button
              onClick={() => {
                setRam(8);
                setDisk(100);
                setCores(4);
                setIps(1);
              }}
              title="Reset to defaults"
              className="p-1.5 bg-black/40 border border-white/15 rounded text-[#888] hover:text-white transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Sliders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 my-8">
          {/* RAM Slider */}
          <div className="space-y-2">
            <div className="flex items-center justify-between font-mono text-xs text-kyun-textFocus">
              <span className="flex items-center gap-1.5">
                <Server className="w-4 h-4 text-emerald-400" />
                Memory (RAM)
              </span>
              <span className="text-white font-bold text-sm bg-black/50 px-2.5 py-0.5 rounded border border-white/10">
                {ram} GB
              </span>
            </div>
            <input
              type="range"
              min="0"
              max={RAM_OPTIONS.length - 1}
              value={RAM_OPTIONS.indexOf(ram)}
              onChange={(e) => {
                setAutoDemo(false);
                setRam(RAM_OPTIONS[Number(e.target.value)]);
              }}
              className="w-full accent-white bg-white/10 h-2 rounded cursor-pointer"
            />
            <div className="flex justify-between text-[10px] font-mono text-kyun-textDark px-0.5">
              {RAM_OPTIONS.map((val) => (
                <span
                  key={val}
                  onClick={() => {
                    setAutoDemo(false);
                    setRam(val);
                  }}
                  className={`cursor-pointer hover:text-white transition-colors ${
                    val === ram ? 'text-white font-bold' : ''
                  }`}
                >
                  {val}G
                </span>
              ))}
            </div>
          </div>

          {/* NVMe Disk Slider */}
          <div className="space-y-2">
            <div className="flex items-center justify-between font-mono text-xs text-kyun-textFocus">
              <span className="flex items-center gap-1.5">
                <HardDrive className="w-4 h-4 text-sky-400" />
                NVMe SSD Storage
              </span>
              <span className="text-white font-bold text-sm bg-black/50 px-2.5 py-0.5 rounded border border-white/10">
                {disk} GB
              </span>
            </div>
            <input
              type="range"
              min="0"
              max={DISK_OPTIONS.length - 1}
              value={DISK_OPTIONS.indexOf(disk)}
              onChange={(e) => {
                setAutoDemo(false);
                setDisk(DISK_OPTIONS[Number(e.target.value)]);
              }}
              className="w-full accent-white bg-white/10 h-2 rounded cursor-pointer"
            />
            <div className="flex justify-between text-[10px] font-mono text-kyun-textDark px-0.5">
              {DISK_OPTIONS.map((val) => (
                <span
                  key={val}
                  onClick={() => {
                    setAutoDemo(false);
                    setDisk(val);
                  }}
                  className={`cursor-pointer hover:text-white transition-colors ${
                    val === disk ? 'text-white font-bold' : ''
                  }`}
                >
                  {val}G
                </span>
              ))}
            </div>
          </div>

          {/* CPU Cores Slider */}
          <div className="space-y-2">
            <div className="flex items-center justify-between font-mono text-xs text-kyun-textFocus">
              <span className="flex items-center gap-1.5">
                <Cpu className="w-4 h-4 text-purple-400" />
                vCPU Cores
              </span>
              <span className="text-white font-bold text-sm bg-black/50 px-2.5 py-0.5 rounded border border-white/10">
                {cores} {cores === 1 ? 'Core' : 'Cores'}
              </span>
            </div>
            <input
              type="range"
              min="0"
              max={CORE_OPTIONS.length - 1}
              value={CORE_OPTIONS.indexOf(cores)}
              onChange={(e) => {
                setAutoDemo(false);
                setCores(CORE_OPTIONS[Number(e.target.value)]);
              }}
              className="w-full accent-white bg-white/10 h-2 rounded cursor-pointer"
            />
            <div className="flex justify-between text-[10px] font-mono text-kyun-textDark px-0.5">
              {CORE_OPTIONS.map((val) => (
                <span
                  key={val}
                  onClick={() => {
                    setAutoDemo(false);
                    setCores(val);
                  }}
                  className={`cursor-pointer hover:text-white transition-colors ${
                    val === cores ? 'text-white font-bold' : ''
                  }`}
                >
                  {val}c
                </span>
              ))}
            </div>
          </div>

          {/* IPv4 Slider */}
          <div className="space-y-2">
            <div className="flex items-center justify-between font-mono text-xs text-kyun-textFocus">
              <span className="flex items-center gap-1.5">
                <Wifi className="w-4 h-4 text-amber-400" />
                Dedicated IPv4
              </span>
              <span className="text-white font-bold text-sm bg-black/50 px-2.5 py-0.5 rounded border border-white/10">
                {ips === 0 ? 'IPv6 only' : `${ips} IPv4`}
              </span>
            </div>
            <input
              type="range"
              min="0"
              max={IP_OPTIONS.length - 1}
              value={IP_OPTIONS.indexOf(ips)}
              onChange={(e) => {
                setAutoDemo(false);
                setIps(IP_OPTIONS[Number(e.target.value)]);
              }}
              className="w-full accent-white bg-white/10 h-2 rounded cursor-pointer"
            />
            <div className="flex justify-between text-[10px] font-mono text-kyun-textDark px-0.5">
              {IP_OPTIONS.map((val) => (
                <span
                  key={val}
                  onClick={() => {
                    setAutoDemo(false);
                    setIps(val);
                  }}
                  className={`cursor-pointer hover:text-white transition-colors ${
                    val === ips ? 'text-white font-bold' : ''
                  }`}
                >
                  {val === 0 ? 'None' : `${val}`}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Total & Action Footer */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-baseline gap-3">
            <div className="text-3xl sm:text-4xl font-pixel font-bold text-white tracking-wider">
              ${monthlyPrice}
            </div>
            <div className="font-mono text-xs text-kyun-textDark">
              <span>/ month</span>
              <span className="mx-1.5">•</span>
              <span className="text-kyun-textFocus/70">~${hourlyPrice}/hr</span>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={handleCopySpecs}
              className="flex-1 sm:flex-none px-4 py-2.5 bg-black/50 hover:bg-black/80 border border-white/20 rounded font-mono text-xs text-kyun-textFocus transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : null}
              <span>{copied ? 'Copied!' : 'Copy Config'}</span>
            </button>
            <button
              onClick={onDeploy}
              className="flex-1 sm:flex-none px-6 py-2.5 bg-white text-black hover:bg-gray-200 rounded font-mono text-xs uppercase tracking-wider font-bold transition-colors shadow-lg cursor-pointer"
            >
              Deploy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
