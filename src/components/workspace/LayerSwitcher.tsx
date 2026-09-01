import React from 'react';
import { LayerMode } from '../../types';
import { Layers, Zap, Cpu, Sparkles, Terminal, Activity, Dna } from 'lucide-react';

interface LayerSwitcherProps {
  currentLayer: LayerMode;
  onLayerChange: (layer: LayerMode) => void;
  isHalted: boolean;
  activeAgentsCount: number;
}

export const LayerSwitcher: React.FC<LayerSwitcherProps> = ({
  currentLayer,
  onLayerChange,
  isHalted,
  activeAgentsCount,
}) => {
  const nextLayer: LayerMode = currentLayer === 1 ? 2 : currentLayer === 2 ? 3 : currentLayer === 3 ? 4 : 1;

  return (
    <div id="layer-switcher-container" className="flex flex-wrap items-center justify-between gap-3 px-6 py-3 bg-slate-900/40 border-b border-white/10 backdrop-blur-2xl sticky top-0 z-40 shadow-xl">
      {/* Brand & System Status */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2.5">
          <div className={`w-2.5 h-2.5 rounded-full ${isHalted ? 'bg-rose-500 animate-pulse shadow-[0_0_10px_rgba(244,63,94,0.8)]' : 'bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]'}`} />
          <span className="font-mono font-bold tracking-wider text-sm text-slate-100 flex items-center gap-1.5">
            ARG<span className="text-blue-400">OS</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/15 text-blue-300 font-semibold border border-blue-400/30 shadow-[0_0_8px_rgba(96,165,250,0.25)]">APEX</span>
          </span>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-xs text-slate-400 font-mono border-l border-white/10 pl-3">
          <span className="flex items-center gap-1.5 text-slate-300">
            <Cpu className="w-3.5 h-3.5 text-blue-400" />
            <span>{activeAgentsCount} / 20 Swarm Nodes</span>
          </span>
          {isHalted && (
            <span className="px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40 text-[11px] font-bold shadow-[0_0_8px_rgba(244,63,94,0.3)]">
              EMERGENCY HALT ACTIVE
            </span>
          )}
        </div>
      </div>

      {/* Layer Toggle Button & Multi-State Switcher */}
      <div className="flex items-center gap-2.5">
        {/* Layer 1, 2, 3, 4 Tabs */}
        <div className="flex items-center bg-white/[0.04] p-1 rounded-xl border border-white/10 backdrop-blur-xl shadow-inner">
          <button
            id="layer-tab-1"
            onClick={() => onLayerChange(1)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
              currentLayer === 1
                ? 'bg-blue-600/30 text-blue-200 shadow-[0_0_12px_rgba(59,130,246,0.3)] border border-blue-400/40 font-semibold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.06]'
            }`}
            title="Layer 1: AI Studio Dual-Pane & Real-Time Telemetry"
          >
            <Zap className="w-3.5 h-3.5 text-blue-400" />
            <span className="hidden md:inline">L1: AI Studio</span>
            <span className="md:hidden">L1</span>
            <kbd className="hidden lg:inline text-[9px] px-1 bg-white/10 text-slate-400 rounded">1</kbd>
          </button>

          <button
            id="layer-tab-2"
            onClick={() => onLayerChange(2)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
              currentLayer === 2
                ? 'bg-emerald-600/30 text-emerald-200 shadow-[0_0_12px_rgba(16,185,129,0.3)] border border-emerald-400/40 font-semibold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.06]'
            }`}
            title="Layer 2: Deep Manifold & Invariant Telemetry"
          >
            <Activity className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden md:inline">L2: Manifold</span>
            <span className="md:hidden">L2</span>
            <kbd className="hidden lg:inline text-[9px] px-1 bg-white/10 text-slate-400 rounded">2</kbd>
          </button>

          <button
            id="layer-tab-3"
            onClick={() => onLayerChange(3)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
              currentLayer === 3
                ? 'bg-purple-600/30 text-purple-200 shadow-[0_0_12px_rgba(168,85,247,0.3)] border border-purple-400/40 font-semibold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.06]'
            }`}
            title="Layer 3: Ultimate Hyper-Deck Matrix (20-Agent Swarm)"
          >
            <Terminal className="w-3.5 h-3.5 text-purple-400" />
            <span className="hidden md:inline">L3: Hyper-Deck</span>
            <span className="md:hidden">L3</span>
            <kbd className="hidden lg:inline text-[9px] px-1 bg-white/10 text-slate-400 rounded">3</kbd>
          </button>

          <button
            id="layer-tab-4"
            onClick={() => onLayerChange(4)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
              currentLayer === 4
                ? 'bg-pink-600/30 text-pink-200 shadow-[0_0_12px_rgba(236,72,153,0.3)] border border-pink-400/40 font-semibold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.06]'
            }`}
            title="Layer 4: Autonomic Genesis & Neural Mesh Studio"
          >
            <Dna className="w-3.5 h-3.5 text-pink-400" />
            <span className="hidden md:inline">L4: Genesis Mesh</span>
            <span className="md:hidden">L4</span>
            <kbd className="hidden lg:inline text-[9px] px-1 bg-white/10 text-slate-400 rounded">4</kbd>
          </button>
        </div>

        {/* Primary Step-Through Toggle Button */}
        <button
          id="layer-toggle-btn"
          onClick={() => onLayerChange(nextLayer)}
          className="flex items-center gap-1.5 px-3.5 py-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl text-xs font-mono font-semibold shadow-lg shadow-blue-500/25 border border-blue-400/30 active:scale-95 transition-all"
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Toggle Layer ({nextLayer})</span>
          <Sparkles className="w-3 h-3 text-blue-200" />
        </button>
      </div>
    </div>
  );
};
