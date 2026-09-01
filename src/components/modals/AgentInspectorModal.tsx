import React from 'react';
import { X, Cpu, ShieldCheck, Flame, CheckCircle2, AlertTriangle, FileCode, Binary, Activity } from 'lucide-react';
import { AgentRuntimeInstance } from '../../types';

interface AgentInspectorModalProps {
  agent: AgentRuntimeInstance | null;
  onClose: () => void;
}

export const AgentInspectorModal: React.FC<AgentInspectorModalProps> = ({ agent, onClose }) => {
  if (!agent) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in">
      <div className="bg-slate-900/80 border border-white/15 rounded-3xl max-w-2xl w-full p-6 space-y-6 shadow-2xl font-mono text-xs text-slate-100 max-h-[90vh] overflow-y-auto backdrop-blur-2xl">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div
              className="w-3.5 h-3.5 rounded-full ring-2 ring-offset-2 ring-offset-slate-900"
              style={{ backgroundColor: agent.color }}
            />
            <div>
              <h3 className="text-base font-bold font-sans text-slate-100">{agent.name}</h3>
              <span className="text-[11px] text-slate-400">{agent.role} • Badge {agent.badge}</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-100 rounded-xl hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Runtime State Indicators */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-slate-300">
          <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md">
            <span className="text-slate-500 text-[10px] block">CURRENT STATUS</span>
            <span className="font-bold text-blue-400 uppercase mt-0.5 block">{agent.status}</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md">
            <span className="text-slate-500 text-[10px] block">MODEL ENGINE</span>
            <span className="font-bold text-slate-200 mt-0.5 block truncate">{agent.preferredModel}</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md">
            <span className="text-slate-500 text-[10px] block">TEMPERATURE / PRIOR</span>
            <span className="font-bold text-slate-200 mt-0.5 block">{agent.temperature}</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md">
            <span className="text-slate-500 text-[10px] block">IMPROVISATION ATTEMPTS</span>
            <span className="font-bold text-purple-400 mt-0.5 block">{agent.improvisedAttempts}</span>
          </div>
        </div>

        {/* Current Thought / Reasoning Trace */}
        <div className="space-y-2">
          <span className="text-slate-400 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 text-blue-400" />
            Live Reasoning Trace:
          </span>
          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 text-slate-200 text-xs leading-relaxed whitespace-pre-wrap">
            {agent.currentThought || 'Agent currently in quiescent standby state.'}
          </div>
        </div>

        {/* Assigned Task Description */}
        <div className="space-y-2">
          <span className="text-slate-400 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5">
            <FileCode className="w-3.5 h-3.5 text-emerald-400" />
            Constitutional Scope & Specialization:
          </span>
          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 text-slate-300 text-xs leading-relaxed">
            <p className="font-semibold text-slate-200">{agent.specialization}</p>
            <p className="text-slate-400 mt-1">{agent.description}</p>
          </div>
        </div>

        {/* Evidence Pool */}
        {agent.evidencePool && agent.evidencePool.length > 0 && (
          <div className="space-y-2">
            <span className="text-slate-400 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5">
              <Binary className="w-3.5 h-3.5 text-indigo-400" />
              Verified Evidence Pool ({agent.evidencePool.length}):
            </span>
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {agent.evidencePool.map((ev, idx) => (
                <div key={idx} className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-[11px] text-slate-300 flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span>{ev}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-white/10 text-[11px] text-slate-500">
          <span>Tokens Consumed: {agent.tokenCount}</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-white/10 hover:bg-white/15 text-slate-200 rounded-xl font-mono font-bold transition-all border border-white/10"
          >
            Close Inspector
          </button>
        </div>
      </div>
    </div>
  );
};
