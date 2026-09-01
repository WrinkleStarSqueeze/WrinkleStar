import React, { useState, useEffect } from 'react';
import { Search, X, Terminal, Zap, Activity, Play, Flame, ShieldAlert, Binary, Upload, ShieldCheck } from 'lucide-react';
import { LayerMode } from '../../types';

interface CommandPaletteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectLayer: (layer: LayerMode) => void;
  onQuickSwarm: (count: number, mode: 'monte_carlo_consensus' | 'heterogeneous_distributed') => void;
  onTriggerCanary: () => void;
  onTriggerApoptosis: () => void;
  onToggleHalt: () => void;
  onOpenFileUpload: () => void;
}

export const CommandPaletteModal: React.FC<CommandPaletteModalProps> = ({
  isOpen,
  onClose,
  onSelectLayer,
  onQuickSwarm,
  onTriggerCanary,
  onTriggerApoptosis,
  onToggleHalt,
  onOpenFileUpload,
}) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const commands = [
    {
      id: 'swarm-20',
      title: 'Deploy 20-Agent Monte Carlo Swarm',
      category: 'Swarm Execution',
      icon: <Play className="w-4 h-4 text-fuchsia-400" />,
      shortcut: 'M',
      action: () => {
        onQuickSwarm(20, 'monte_carlo_consensus');
        onClose();
      },
    },
    {
      id: 'swarm-8',
      title: 'Deploy 8-Agent Monte Carlo Consensus',
      category: 'Swarm Execution',
      icon: <Play className="w-4 h-4 text-cyan-400" />,
      shortcut: '8',
      action: () => {
        onQuickSwarm(8, 'monte_carlo_consensus');
        onClose();
      },
    },
    {
      id: 'swarm-dist',
      title: 'Deploy 12-Agent Distributed Fleet',
      category: 'Swarm Execution',
      icon: <Play className="w-4 h-4 text-emerald-400" />,
      shortcut: 'D',
      action: () => {
        onQuickSwarm(12, 'heterogeneous_distributed');
        onClose();
      },
    },
    {
      id: 'layer-1',
      title: 'Switch to Layer 1: Minimalist Focus Workspace',
      category: 'Navigation',
      icon: <Zap className="w-4 h-4 text-cyan-400" />,
      shortcut: '1',
      action: () => {
        onSelectLayer(1);
        onClose();
      },
    },
    {
      id: 'layer-2',
      title: 'Switch to Layer 2: State Manifold & Telemetry Deck',
      category: 'Navigation',
      icon: <Activity className="w-4 h-4 text-emerald-400" />,
      shortcut: '2',
      action: () => {
        onSelectLayer(2);
        onClose();
      },
    },
    {
      id: 'layer-3',
      title: 'Switch to Layer 3: Ultimate Hyper-Deck Matrix',
      category: 'Navigation',
      icon: <Terminal className="w-4 h-4 text-purple-400" />,
      shortcut: '3',
      action: () => {
        onSelectLayer(3);
        onClose();
      },
    },
    {
      id: 'layer-4',
      title: 'Switch to Layer 4: Autonomic Genesis & Neural Mesh Studio',
      category: 'Navigation',
      icon: <Zap className="w-4 h-4 text-pink-400" />,
      shortcut: '4',
      action: () => {
        onSelectLayer(4);
        onClose();
      },
    },
    {
      id: 'canary',
      title: 'Probe Stochastic Canary Attestation',
      category: 'Integrity & Security',
      icon: <Binary className="w-4 h-4 text-lime-400" />,
      shortcut: 'C',
      action: () => {
        onTriggerCanary();
        onClose();
      },
    },
    {
      id: 'apoptosis',
      title: 'Trigger Cellular Apoptosis (Rebirth from Genesis ROM)',
      category: 'Integrity & Security',
      icon: <Flame className="w-4 h-4 text-orange-400" />,
      shortcut: 'A',
      action: () => {
        onTriggerApoptosis();
        onClose();
      },
    },
    {
      id: 'halt',
      title: 'Toggle Emergency Halt Invariant Lock',
      category: 'Governance',
      icon: <ShieldAlert className="w-4 h-4 text-rose-400" />,
      shortcut: 'H',
      action: () => {
        onToggleHalt();
        onClose();
      },
    },
    {
      id: 'upload',
      title: 'Ingest File & Slice 16-Way Capsules',
      category: 'Data Slicing',
      icon: <Upload className="w-4 h-4 text-cyan-400" />,
      shortcut: 'U',
      action: () => {
        onOpenFileUpload();
        onClose();
      },
    },
  ];

  const filteredCommands = commands.filter((c) =>
    c.title.toLowerCase().includes(query.toLowerCase()) ||
    c.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/60 backdrop-blur-md animate-in fade-in">
      <div className="bg-slate-900/80 border border-white/15 rounded-3xl max-w-xl w-full p-4 space-y-4 shadow-2xl font-mono text-xs text-slate-100 backdrop-blur-2xl">
        {/* Search Input */}
        <div className="flex items-center gap-2.5 px-3.5 py-2.5 bg-white/[0.04] border border-white/10 rounded-2xl focus-within:border-blue-400/60 shadow-inner">
          <Search className="w-4 h-4 text-slate-400" />
          <input
            autoFocus
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command or search action..."
            className="flex-1 bg-transparent text-slate-100 placeholder-slate-500 outline-none text-xs font-mono"
          />
          <kbd className="px-2 py-0.5 bg-white/10 text-slate-300 rounded-lg text-[10px] border border-white/10">ESC</kbd>
        </div>

        {/* Command List */}
        <div className="space-y-1.5 max-h-[380px] overflow-y-auto pr-1">
          {filteredCommands.length === 0 ? (
            <div className="py-8 text-center text-slate-500">
              No commands matching "{query}"
            </div>
          ) : (
            filteredCommands.map((cmd) => (
              <button
                key={cmd.id}
                onClick={cmd.action}
                className="w-full flex items-center justify-between p-3 rounded-2xl hover:bg-white/[0.06] text-left transition-all group border border-transparent hover:border-white/10 backdrop-blur-md"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-white/[0.04] border border-white/10 group-hover:border-blue-400/40">
                    {cmd.icon}
                  </div>
                  <div>
                    <div className="font-semibold text-slate-200 group-hover:text-blue-300">
                      {cmd.title}
                    </div>
                    <div className="text-[10px] text-slate-500">
                      {cmd.category}
                    </div>
                  </div>
                </div>

                {cmd.shortcut && (
                  <kbd className="px-2 py-0.5 bg-white/[0.06] border border-white/10 text-slate-300 rounded-lg text-[10px] font-bold">
                    {cmd.shortcut}
                  </kbd>
                )}
              </button>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-white/10 text-[10px] text-slate-500 px-2">
          <span>Navigate with mouse or quick keys</span>
          <span>ArgOS Substrate Core</span>
        </div>
      </div>
    </div>
  );
};
