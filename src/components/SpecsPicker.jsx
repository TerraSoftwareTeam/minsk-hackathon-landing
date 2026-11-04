import React, { useState, useEffect, useRef } from 'react';

const RAM_VALUES = [0.5, 1, 2, 4, 8, 16, 32, 64];
const DISK_VALUES = [10, 25, 50, 100, 200, 400, 800];
const CPU_VALUES = [1, 2, 4, 8, 16];
const IP_VALUES = [0, 1, 2, 3, 4];

export default function SpecsPicker() {
  const [ram, setRam] = useState(8);
  const [disk, setDisk] = useState(100);
  const [cpu, setCpu] = useState(4);
  const [ips, setIps] = useState(1);
  const [activeSpec, setActiveSpec] = useState('ram');

  // Virtual cursor positions over sliders
  const [cursorPos, setCursorPos] = useState({ x: 138, y: 65, down: true });

  useEffect(() => {
    let step = 0;
    const interval = setInterval(() => {
      step = (step + 1) % 4;
      if (step === 0) {
        setActiveSpec('ram');
        setRam((prev) => (prev >= 32 ? 4 : prev * 2));
        setCursorPos({ x: 120 + Math.random() * 80, y: 45, down: true });
      } else if (step === 1) {
        setActiveSpec('disk');
        setDisk((prev) => (prev >= 400 ? 50 : prev * 2));
        setCursorPos({ x: 140 + Math.random() * 60, y: 115, down: true });
      } else if (step === 2) {
        setActiveSpec('cpu');
        setCpu((prev) => (prev >= 8 ? 2 : prev * 2));
        setCursorPos({ x: 110 + Math.random() * 70, y: 185, down: true });
      } else {
        setActiveSpec('ipv4');
        setIps((prev) => (prev >= 3 ? 1 : prev + 1));
        setCursorPos({ x: 90 + Math.random() * 50, y: 255, down: false });
      }
    }, 2400);

    return () => clearInterval(interval);
  }, []);

  const ramPercent = (RAM_VALUES.indexOf(ram) / (RAM_VALUES.length - 1)) * 100;
  const diskPercent = (DISK_VALUES.indexOf(disk) / (DISK_VALUES.length - 1)) * 100;
  const cpuPercent = (CPU_VALUES.indexOf(cpu) / (CPU_VALUES.length - 1)) * 100;
  const ipPercent = (IP_VALUES.indexOf(ips) / (IP_VALUES.length - 1)) * 100;

  return (
    <div className="_demoBox_1w2bm_143 relative z-2 min-h-0 p-0 overflow-visible light">
      <div
        data-yakiniku="box"
        className="relative overflow-hidden _box_19lkn_1 _specsPickerBox_1w2bm_147 relative min-h-0 p-7 overflow-visible"
      >
        <div className="_sliders_1d0qp_1">
          {/* RAM */}
          <div className="_spec_1sa4b_1">
            <div className="_title_1sa4b_4 flex-between">
              <small className="flex items-center gap-1">
                <img
                  alt=""
                  className="icon _icon_1sa4b_4 _icon_w1wai_1"
                  draggable="false"
                  data-yakiniku="icon"
                  src="data:image/gif;base64,R0lGODlhCAAIAPEAAAAAADg4OFhYWHp6eiH5BAEAAAAAIf8LSW1hZ2VNYWdpY2sOZ2FtbWE9MC40NTQ1NDUALAAAAAAIAAgAAAIUhH+hahIDgzAvtjokhflyDSwMUAAAOw=="
                  style={{ width: '16px', height: '16px' }}
                />{' '}
                ram
              </small>
            </div>
            <div className="_sliderContainer_1sa4b_8 flex">
              <div
                data-testid="slider"
                role="slider"
                tabIndex={0}
                className={`_slider_1sa4b_8 ${activeSpec === 'ram' ? '_active_qw3c9_41' : ''} _slider_qw3c9_1`}
                style={{ '--percent': `${ramPercent}%` }}
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
                  const idx = Math.round(pct * (RAM_VALUES.length - 1));
                  setRam(RAM_VALUES[idx]);
                  setActiveSpec('ram');
                }}
              >
                <div className="_bar_qw3c9_11">
                  <div className="_fill_qw3c9_18" style={{ width: `${ramPercent}%` }}></div>
                </div>
                <div className="_ball_qw3c9_29" style={{ left: `${ramPercent}%` }}></div>
              </div>
              <span data-yakiniku="input" className="control _inputFrame_g5sgk_24 _input_1sa4b_16">
                <input
                  min="0"
                  className="_inputElement_g5sgk_50"
                  type="number"
                  value={ram}
                  onChange={(e) => setRam(Number(e.target.value) || 1)}
                />
                <span className="_suffix_g5sgk_77">GiB</span>
              </span>
            </div>
          </div>

          {/* DISK */}
          <div className="_spec_1sa4b_1">
            <div className="_title_1sa4b_4 flex-between">
              <small className="flex items-center gap-1">
                <img
                  alt=""
                  className="icon _icon_1sa4b_4 _icon_w1wai_1"
                  draggable="false"
                  data-yakiniku="icon"
                  src="data:image/gif;base64,R0lGODlhCAAIAPEAAAAAADg4OFhYWHp6eiH5BAEAAAAAIf8LSW1hZ2VNYWdpY2sOZ2FtbWE9MC40NTQ1NDUALAAAAAAIAAgAAAIThG+imzEfBBChVkndnXZniy1MAQA7"
                  style={{ width: '16px', height: '16px' }}
                />{' '}
                disk
              </small>
            </div>
            <div className="_sliderContainer_1sa4b_8 flex">
              <div
                data-testid="slider"
                role="slider"
                tabIndex={0}
                className={`_slider_1sa4b_8 ${activeSpec === 'disk' ? '_active_qw3c9_41' : ''} _slider_qw3c9_1`}
                style={{ '--percent': `${diskPercent}%` }}
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
                  const idx = Math.round(pct * (DISK_VALUES.length - 1));
                  setDisk(DISK_VALUES[idx]);
                  setActiveSpec('disk');
                }}
              >
                <div className="_bar_qw3c9_11">
                  <div className="_fill_qw3c9_18" style={{ width: `${diskPercent}%` }}></div>
                </div>
                <div className="_ball_qw3c9_29" style={{ left: `${diskPercent}%` }}></div>
              </div>
              <span data-yakiniku="input" className="control _inputFrame_g5sgk_24 _input_1sa4b_16">
                <input
                  min="0"
                  className="_inputElement_g5sgk_50"
                  type="number"
                  value={disk}
                  onChange={(e) => setDisk(Number(e.target.value) || 10)}
                />
                <span className="_suffix_g5sgk_77">GB</span>
              </span>
            </div>
          </div>

          {/* CPU */}
          <div className="_spec_1sa4b_1">
            <div className="_title_1sa4b_4 flex-between">
              <small className="flex items-center gap-1">
                <img
                  alt=""
                  className="icon _icon_1sa4b_4 _icon_w1wai_1"
                  draggable="false"
                  data-yakiniku="icon"
                  src="data:image/gif;base64,R0lGODlhCAAIAPEAAAAAADg4OFhYWHp6eiH5BAEAAAAAIf8LSW1hZ2VNYWdpY2sOZ2FtbWE9MC40NTQ1NDUALAAAAAAIAAgAAAIUhH8Cqhv/Whg0GDGrpMM6GDTMYhQAOw=="
                  style={{ width: '16px', height: '16px' }}
                />{' '}
                cpu
              </small>
            </div>
            <div className="_sliderContainer_1sa4b_8 flex">
              <div
                data-testid="slider"
                role="slider"
                tabIndex={0}
                className={`_slider_1sa4b_8 ${activeSpec === 'cpu' ? '_active_qw3c9_41' : ''} _slider_qw3c9_1`}
                style={{ '--percent': `${cpuPercent}%` }}
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
                  const idx = Math.round(pct * (CPU_VALUES.length - 1));
                  setCpu(CPU_VALUES[idx]);
                  setActiveSpec('cpu');
                }}
              >
                <div className="_bar_qw3c9_11">
                  <div className="_fill_qw3c9_18" style={{ width: `${cpuPercent}%` }}></div>
                </div>
                <div className="_ball_qw3c9_29" style={{ left: `${cpuPercent}%` }}></div>
              </div>
              <span data-yakiniku="input" className="control _inputFrame_g5sgk_24 _input_1sa4b_16">
                <input
                  min="0"
                  className="_inputElement_g5sgk_50"
                  type="number"
                  value={cpu}
                  onChange={(e) => setCpu(Number(e.target.value) || 1)}
                />
                <span className="_suffix_g5sgk_77">vCPUs</span>
              </span>
            </div>
          </div>

          {/* IPV4 */}
          <div className="_spec_1sa4b_1">
            <div className="_title_1sa4b_4 flex-between">
              <small className="flex items-center gap-1">
                <img
                  alt=""
                  className="icon _icon_1sa4b_4 _icon_w1wai_1"
                  draggable="false"
                  data-yakiniku="icon"
                  src="data:image/gif;base64,R0lGODlhCAAIAPEAAAAAADg4OFhYWHp6eiH5BAEAAAAAIf8LSW1hZ2VNYWdpY2sOZ2FtbWE9MC40NTQ1NDUALAAAAAAIAAgAAAIThI8Jwi0bYnxCzjVCHrRmdjRHAQA7"
                  style={{ width: '16px', height: '16px' }}
                />{' '}
                ipv4
              </small>
            </div>
            <div className="_sliderContainer_1sa4b_8 flex">
              <div
                data-testid="slider"
                role="slider"
                tabIndex={0}
                className={`_slider_1sa4b_8 ${activeSpec === 'ipv4' ? '_active_qw3c9_41' : ''} _slider_qw3c9_1`}
                style={{ '--percent': `${ipPercent}%` }}
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
                  const idx = Math.round(pct * (IP_VALUES.length - 1));
                  setIps(IP_VALUES[idx]);
                  setActiveSpec('ipv4');
                }}
              >
                <div className="_bar_qw3c9_11">
                  <div className="_fill_qw3c9_18" style={{ width: `${ipPercent}%` }}></div>
                </div>
                <div className="_ball_qw3c9_29" style={{ left: `${ipPercent}%` }}></div>
              </div>
              <span data-yakiniku="input" className="control _inputFrame_g5sgk_24 _input_1sa4b_16">
                <input
                  min="0"
                  className="_inputElement_g5sgk_50"
                  type="number"
                  value={ips}
                  onChange={(e) => setIps(Number(e.target.value) || 0)}
                />
                <span className="_suffix_g5sgk_77">IPv4</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Animated Hand Cursor */}
      <div
        aria-hidden="true"
        className={`_fakeDemoCursor_1w2bm_159 absolute pointer-events-none ${
          cursorPos.down ? '_fakeDemoCursorDown_1w2bm_213' : ''
        }`}
        style={{
          left: `${cursorPos.x}px`,
          top: `${cursorPos.y}px`,
          transition: 'all 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)',
        }}
      >
        <span className="_fakeCursorPointer_1w2bm_182"></span>
      </div>
    </div>
  );
}
