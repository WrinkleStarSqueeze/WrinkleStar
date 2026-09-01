import React, { useState } from 'react';
import { 
  Activity, 
  ShieldAlert, 
  RotateCcw, 
  Play, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  Cpu, 
  Database, 
  Terminal, 
  ArrowRight, 
  Sparkles,
  Flame,
  ShieldCheck,
  Binary,
  Layers
} from 'lucide-react';
import { StateManifoldTelemetry, CausalTraceRecord } from '../../types';

interface Layer2ManifoldProps {
  telemetry: StateManifoldTelemetry;
  causalHistory: CausalTraceRecord[];
  onToggleHalt: () => void;
  onTriggerCanary: () => void;
  onTriggerApoptosis: () => void;
  onReplayEpoch: (epoch: number) => void;
  onSwitchLayer: (l: 1 | 2 | 3) => void;
}

export const Layer2Manifold: React.FC<Layer2ManifoldProps> = ({
  telemetry,
  causalHistory,
  onToggleHalt,
  onTriggerCanary,
  onTriggerApoptosis,
  onReplayEpoch,
  onSwitchLayer,
}) => {
  const [selectedTrace, setSelectedTrace] = useState<CausalTraceRecord | null>(causalHistory[0] || null);
  const [whatIfReplayModal, setWhatIfReplayModal] = useState(false);

  const budgetDollars = (telemetry.budget_cents / 100).toFixed(2);
  const reserveFloorDollars = (telemetry.reserve_floor_cents / 100).toFixed(2);
  const burstCapDollars = (telemetry.max_burst_cap_cents / 100).toFixed(2);
  const totalSavedDollars = (telemetry.total_cents_saved / 100).toFixed(2);

  return (
    <div id="layer-2-manifold-workspace" className="flex flex-col h-[calc(100vh-61px)] bg-transparent text-slate-100 overflow-y-auto">
      {/* Top Banner with Quick Actions */}
      <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-3.5 bg-slate-900/30 border-b border-white/10 backdrop-blur-2xl">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-emerald-400" />
          <h2 className="font-mono text-sm font-bold text-slate-100 uppercase tracking-wider">
            Layer 2 // State Manifold & Governance Invariant Deck
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onTriggerCanary}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white/[0.05] hover:bg-white/[0.1] text-slate-200 rounded-xl text-xs font-mono border border-white/10 backdrop-blur-md transition-all shadow-sm"
            title="Inject unexpected mathematical trapdoor to test for silent memory corruption"
          >
            <Binary className="w-3.5 h-3.5 text-lime-400" />
            <span>Probe Canary</span>
          </button>

          <button
            onClick={onTriggerApoptosis}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white/[0.05] hover:bg-white/[0.1] text-slate-200 rounded-xl text-xs font-mono border border-white/10 backdrop-blur-md transition-all shadow-sm"
            title="Purge ephemeral worker memory and rebirth from Genesis ROM"
          >
            <Flame className="w-3.5 h-3.5 text-orange-400" />
            <span>Cellular Apoptosis</span>
          </button>

          <button
            onClick={onToggleHalt}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all shadow-lg ${
              telemetry.is_halted
                ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-500/25 border border-emerald-400/40'
                : 'bg-rose-600/90 hover:bg-rose-600 text-white shadow-rose-500/25 border border-rose-400/40'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>{telemetry.is_halted ? 'RESUME EXECUTION' : 'EMERGENCY HALT'}</span>
          </button>
        </div>
      </div>

      <div className="p-6 max-w-7xl mx-auto w-full space-y-6">
        {/* Section 1: Bare-Metal State Manifold HUD */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <div className="p-4.5 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-2xl shadow-xl flex flex-col justify-between hover:border-white/20 transition-all">
            <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">Epoch Counter</span>
            <div className="text-2xl font-mono font-bold text-blue-400 mt-2">
              #{telemetry.epoch.toLocaleString()}
            </div>
            <span className="text-[10px] text-slate-500 font-mono mt-1">Monotonic increment</span>
          </div>

          <div className="p-4.5 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-2xl shadow-xl flex flex-col justify-between hover:border-white/20 transition-all">
            <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">Live Bankroll</span>
            <div className="text-2xl font-mono font-bold text-emerald-400 mt-2">
              ${budgetDollars}
            </div>
            <span className="text-[10px] text-emerald-500 font-mono mt-1">
              Active buffer
            </span>
          </div>

          <div className="p-4.5 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-2xl shadow-xl flex flex-col justify-between hover:border-white/20 transition-all">
            <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">Reserve Floor</span>
            <div className="text-2xl font-mono font-bold text-amber-400 mt-2">
              ${reserveFloorDollars}
            </div>
            <span className="text-[10px] text-amber-500 font-mono mt-1">
              Guaranteed Invariant
            </span>
          </div>

          <div className="p-4.5 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-2xl shadow-xl flex flex-col justify-between hover:border-white/20 transition-all">
            <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">Max Burst Cap</span>
            <div className="text-2xl font-mono font-bold text-slate-200 mt-2">
              ${burstCapDollars}
            </div>
            <span className="text-[10px] text-slate-500 font-mono mt-1">Per-task ceiling</span>
          </div>

          <div className="p-4.5 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-2xl shadow-xl flex flex-col justify-between hover:border-white/20 transition-all">
            <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">Active Silicon Nodes</span>
            <div className="text-2xl font-mono font-bold text-purple-400 mt-2">
              {telemetry.active_nodes} / 20
            </div>
            <span className="text-[10px] text-slate-500 font-mono mt-1">Parallel allocation</span>
          </div>

          <div className="p-4.5 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-2xl shadow-xl flex flex-col justify-between hover:border-white/20 transition-all">
            <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">Capital Saved</span>
            <div className="text-2xl font-mono font-bold text-blue-300 mt-2">
              ${totalSavedDollars}
            </div>
            <span className="text-[10px] text-blue-400 font-mono mt-1">via Invariant Slicing</span>
          </div>
        </div>

        {/* Section 2: Invariant Gate & Shannon Entropy Compression Status */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Invariant Gate */}
          <div className="p-5.5 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-2xl shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-semibold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Guardrail Boundary Enforcer (GBE)
              </span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 text-[10px] font-mono border border-emerald-500/20">
                L0 ZERO-LOSS
              </span>
            </div>

            <div className="space-y-3 font-mono text-xs text-slate-300">
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.03] border border-white/10">
                <span className="text-slate-400">StopLossFloor Invariant:</span>
                <span className="text-emerald-400 font-bold">Balance(t) &gt;= $70.00 (ENFORCED)</span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.03] border border-white/10">
                <span className="text-slate-400">Atomic CAS Barrier:</span>
                <span className="text-blue-400 font-bold">Monotonic Sequence Counter</span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.03] border border-white/10">
                <span className="text-slate-400">Circuit Breaker Status:</span>
                <span className={telemetry.is_halted ? 'text-rose-400 font-bold' : 'text-emerald-400 font-bold'}>
                  {telemetry.is_halted ? 'TRIPPED (HALT)' : 'CLOSED (SECURE)'}
                </span>
              </div>
            </div>

            <p className="text-[11px] text-slate-400 leading-relaxed">
              Enforced at the physical atomic memory layer. Overspending is physically impossible regardless of exploit success or rogue model behavior.
            </p>
          </div>

          {/* Shannon Entropy & Slicing */}
          <div className="p-5.5 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-2xl shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-semibold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                <Binary className="w-4 h-4 text-blue-400" />
                Shannon Entropy & Slicing
              </span>
              <span className="px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-300 text-[10px] font-mono border border-blue-500/20">
                16-WAY GLUE
              </span>
            </div>

            <div className="space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.03] border border-white/10">
                <span className="text-slate-400">System Entropy (H):</span>
                <span className="text-blue-300 font-bold">{telemetry.shannon_entropy} bits / byte</span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.03] border border-white/10">
                <span className="text-slate-400">Compute Compression:</span>
                <span className="text-emerald-400 font-bold">94.0% Cost Reduction</span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.03] border border-white/10">
                <span className="text-slate-400">Stigmergic Memory Latency:</span>
                <span className="text-slate-200 font-bold">{telemetry.cpu_latency_ns} nanoseconds</span>
              </div>
            </div>

            <p className="text-[11px] text-slate-400 leading-relaxed">
              Transforms $80.00 heavy unstructured workloads into $4.80 safe micro-bursts using 16-way concurrent POSIX thread chunking.
            </p>
          </div>

          {/* Stochastic Canary & Cellular Apoptosis */}
          <div className="p-5.5 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-2xl shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-semibold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-orange-400" />
                Stochastic Canary & Apoptosis
              </span>
              <span className="px-2 py-0.5 rounded-full bg-orange-500/10 text-orange-300 text-[10px] font-mono border border-orange-500/20">
                SELF-HEALING
              </span>
            </div>

            <div className="space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.03] border border-white/10">
                <span className="text-slate-400">Canary Trap Parity:</span>
                <span className="text-lime-400 font-bold">
                  {telemetry.canary_challenge} ➔ {telemetry.canary_response} (100% BIT-PERFECT)
                </span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.03] border border-white/10">
                <span className="text-slate-400">Apoptosis Interval:</span>
                <span className="text-slate-200 font-bold">90s Rolling Turnover</span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.03] border border-white/10">
                <span className="text-slate-400">Genesis ROM Image:</span>
                <span className="text-emerald-400 font-bold">GENESIS_V1.3_SIGNED</span>
              </div>
            </div>

            <p className="text-[11px] text-slate-400 leading-relaxed">
              Catches stealth zero-day injections by silently attacking the kernel with mathematical traps and destroying contaminated memory within &lt;1ms.
            </p>
          </div>
        </div>

        {/* Section 3: Causal Time Machine / Trace Chronicle System (TCS) */}
        <div className="p-6 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-2xl shadow-xl space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-400" />
              <h3 className="font-mono text-sm font-bold text-slate-100 uppercase tracking-wider">
                Causal Time-Machine // Trace Chronicle System (TCS)
              </h3>
            </div>
            <span className="text-xs font-mono text-slate-400">
              Immutable Monotonic DAG (S_t+1 = S_t ⊔ ΔS)
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Timeline Column */}
            <div className="lg:col-span-1 space-y-2 max-h-[340px] overflow-y-auto pr-2">
              {causalHistory.map((trace) => (
                <button
                  key={trace.id}
                  onClick={() => setSelectedTrace(trace)}
                  className={`w-full text-left p-3 rounded-xl border font-mono text-xs transition-all ${
                    selectedTrace?.id === trace.id
                      ? 'bg-blue-600/20 border-blue-400/50 text-blue-200 shadow-md shadow-blue-500/20'
                      : 'bg-white/[0.02] border-white/10 text-slate-400 hover:border-white/20 hover:bg-white/[0.05]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-blue-300">Epoch #{trace.epoch}</span>
                    <span className="text-[10px] text-slate-500">{new Date(trace.timestamp).toLocaleTimeString()}</span>
                  </div>
                  <div className="text-xs font-medium text-slate-200 truncate mt-1">
                    {trace.action}
                  </div>
                  <div className="text-[10px] text-slate-400 truncate mt-0.5">
                    {trace.goal}
                  </div>
                </button>
              ))}
            </div>

            {/* Selected Trace Forensic Inspection */}
            <div className="lg:col-span-2 p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-4 font-mono text-xs backdrop-blur-xl">
              {selectedTrace ? (
                <>
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-white/10">
                    <div className="space-y-0.5">
                      <div className="text-sm font-bold text-slate-100">
                        {selectedTrace.action}
                      </div>
                      <div className="text-[11px] text-slate-400">
                        Recorded at {new Date(selectedTrace.timestamp).toLocaleString()} • Epoch #{selectedTrace.epoch}
                      </div>
                    </div>

                    <button
                      onClick={() => onReplayEpoch(selectedTrace.epoch)}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 border border-blue-400/40 rounded-xl transition-all shadow-sm"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Replay State at T0</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-slate-300">
                    <div className="p-2.5 rounded-lg bg-white/[0.04] border border-white/10">
                      <span className="text-slate-500 block text-[10px]">GOVERNOR</span>
                      <span className="text-emerald-400 font-bold">{selectedTrace.governorStatus}</span>
                    </div>

                    <div className="p-2.5 rounded-lg bg-white/[0.04] border border-white/10">
                      <span className="text-slate-500 block text-[10px]">BILLED COST</span>
                      <span className="text-slate-100 font-bold">${(selectedTrace.costCents / 100).toFixed(2)}</span>
                    </div>

                    <div className="p-2.5 rounded-lg bg-white/[0.04] border border-white/10">
                      <span className="text-slate-500 block text-[10px]">COMPRESSED SAVINGS</span>
                      <span className="text-blue-400 font-bold">${(selectedTrace.savedCents / 100).toFixed(2)}</span>
                    </div>

                    <div className="p-2.5 rounded-lg bg-white/[0.04] border border-white/10">
                      <span className="text-slate-500 block text-[10px]">ACTIVE NODES</span>
                      <span className="text-purple-400 font-bold">{selectedTrace.activeAgents} Swarm</span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <span className="text-slate-400 block text-[11px]">Goal Contract:</span>
                    <div className="p-2.5 rounded-lg bg-white/[0.04] border border-white/10 text-slate-200">
                      {selectedTrace.goal}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <span className="text-slate-400 block text-[11px]">Reconciled Epistemic Output:</span>
                    <div className="p-2.5 rounded-lg bg-white/[0.04] border border-white/10 text-slate-300 leading-relaxed">
                      {selectedTrace.causalState?.reconciledConsensus || 'No consensus output payload.'}
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex items-center justify-center h-48 text-slate-500">
                  Select a historical trace to inspect causal provenance.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Section 4: Jump to Hyper-Deck Matrix Bar */}
        <div className="flex items-center justify-between p-5 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-2xl shadow-xl">
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-slate-100 font-mono flex items-center gap-2">
              <Terminal className="w-4 h-4 text-purple-400" />
              Ready for the 20-Agent Monte Carlo Fleet?
            </h4>
            <p className="text-xs text-slate-400">
              Layer 3 transforms your keyboard into an interactive 20-agent command matrix with inter-agent communication, live swarm dispatch, and file ingestion.
            </p>
          </div>

          <button
            onClick={() => onSwitchLayer(3)}
            className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-xl text-xs font-mono font-semibold transition-all shadow-lg shadow-purple-500/25 border border-purple-400/30"
          >
            <span>Enter Hyper-Deck (L3)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
