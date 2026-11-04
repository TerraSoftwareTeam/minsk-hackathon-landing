import React, { useState } from 'react';
import { X, Key, Shield, Check, Copy } from 'lucide-react';

export default function AuthModal({ isOpen, onClose }) {
  const [tab, setTab] = useState('login');
  const [token, setToken] = useState('');
  const [generatedToken, setGeneratedToken] = useState('');
  const [copied, setCopied] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleGenerateToken = () => {
    // Generate private access token in Kyun's style
    const randPart = Array.from({ length: 32 }, () =>
      Math.floor(Math.random() * 16).toString(16)
    ).join('');
    const newToken = `kyn_sec_${randPart}`;
    setGeneratedToken(newToken);
  };

  const handleCopy = () => {
    navigator.clipboard?.writeText(generatedToken);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[10010] bg-black/80 flex items-center justify-center p-4 backdrop-blur-md animate-fade-in">
      <div className="bg-[#181818] border border-white/20 rounded-lg max-w-md w-full p-6 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 text-[#888] hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Tab switch */}
        <div className="flex border-b border-white/10 mb-6 font-mono text-sm">
          <button
            onClick={() => setTab('login')}
            className={`pb-2.5 px-4 font-bold border-b-2 transition-colors ${
              tab === 'login'
                ? 'border-white text-white'
                : 'border-transparent text-[#777] hover:text-white'
            }`}
          >
            Log In
          </button>
          <button
            onClick={() => setTab('register')}
            className={`pb-2.5 px-4 font-bold border-b-2 transition-colors ${
              tab === 'register'
                ? 'border-white text-white'
                : 'border-transparent text-[#777] hover:text-white'
            }`}
          >
            Create Anonymous Account
          </button>
        </div>

        {tab === 'login' ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-mono text-kyun-textFocus mb-1.5">
                Account Token or Secret Key
              </label>
              <input
                type="password"
                required
                value={token}
                onChange={(e) => setToken(e.target.value)}
                placeholder="kyn_sec_..."
                className="w-full bg-black/60 border border-white/15 rounded px-3 py-2 text-xs font-mono text-white placeholder-white/30 focus:outline-none focus:border-white/50"
              />
              <p className="text-[11px] font-mono text-kyun-textDark mt-1.5">
                No passwords or email required. Authenticate directly via your cryptographic token.
              </p>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-2.5 bg-white text-black hover:bg-gray-200 rounded font-mono text-xs uppercase tracking-wider font-bold transition-colors shadow-lg"
              >
                {isSuccess ? 'Authorized!' : 'Access Console'}
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-4">
            <div className="p-3 bg-emerald-950/40 border border-emerald-500/30 rounded text-xs font-mono text-emerald-300 flex items-start gap-2">
              <Shield className="w-4 h-4 shrink-0 mt-0.5 text-emerald-400" />
              <div>
                <strong>Zero Knowledge Account:</strong> No email, phone number, or ID required.
                Your generated private key is the only way to recover and access your services.
              </div>
            </div>

            {generatedToken ? (
              <div className="space-y-2">
                <label className="block text-xs font-mono text-white font-bold">
                  Your New Secret Key:
                </label>
                <div className="p-2.5 bg-black border border-white/20 rounded font-mono text-xs text-amber-300 break-all select-all flex items-center justify-between gap-2">
                  <span>{generatedToken}</span>
                  <button
                    onClick={handleCopy}
                    className="p-1.5 bg-white/10 hover:bg-white/20 rounded text-white shrink-0"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
                <p className="text-[10px] font-mono text-red-400">
                  Save this key in a secure password manager. We cannot recover lost keys.
                </p>

                <button
                  onClick={() => {
                    setToken(generatedToken);
                    setTab('login');
                  }}
                  className="w-full mt-3 py-2 bg-white text-black rounded font-mono text-xs uppercase tracking-wider font-bold hover:bg-gray-200 transition-colors"
                >
                  Proceed to Login
                </button>
              </div>
            ) : (
              <div>
                <button
                  type="button"
                  onClick={handleGenerateToken}
                  className="w-full py-2.5 bg-[#252525] hover:bg-[#303030] border border-white/20 text-white rounded font-mono text-xs uppercase tracking-wider font-bold flex items-center justify-center gap-2 transition-colors shadow-lg"
                >
                  <Key className="w-4 h-4 text-emerald-400" />
                  <span>Generate Master Token</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
