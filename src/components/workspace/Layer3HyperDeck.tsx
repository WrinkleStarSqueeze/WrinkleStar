import React, { useState, useRef, useEffect } from 'react';
import { 
  Terminal, 
  Play, 
  RefreshCw, 
  Users, 
  MessageSquare, 
  CheckCircle2, 
  AlertCircle, 
  Upload, 
  ShieldCheck, 
  Zap, 
  Flame, 
  Cpu, 
  FileText, 
  Search, 
  Sparkles,
  Sliders,
  Filter,
  Check,
  Eye
} from 'lucide-react';
import { 
  AgentRuntimeInstance, 
  SwarmDispatchMode, 
  InterAgentMessage, 
  IngestedFile, 
  SwarmExecutionSummary,
  StateManifoldTelemetry 
} from '../../types';

interface Layer3HyperDeckProps {
  agents: AgentRuntimeInstance[];
  selectedAgentIds: string[];
  onToggleAgentSelect: (id: string) => void;
  onSelectAllAgents: () => void;
  onSelectCount: (count: number) => void;
  onInspectAgent: (agent: AgentRuntimeInstance) => void;
  messages: InterAgentMessage[];
  swarmSummary: SwarmExecutionSummary | null;
  isDispatching: boolean;
  onDispatchSwarm: (goal: string, mode: SwarmDispatchMode, allowImprovise: boolean) => Promise<void>;
  files: IngestedFile[];
  onOpenFileUpload: () => void;
  telemetry: StateManifoldTelemetry;
  onSwitchLayer: (l: 1 | 2 | 3) => void;
}

export const Layer3HyperDeck: React.FC<Layer3HyperDeckProps> = ({
  agents,
  selectedAgentIds,
  onToggleAgentSelect,
  onSelectAllAgents,
  onSelectCount,
  onInspectAgent,
  messages,
  swarmSummary,
  isDispatching,
  onDispatchSwarm,
  files,
  onOpenFileUpload,
  telemetry,
  onSwitchLayer,
}) => {
  const [goalText, setGoalText] = useState('');
  const [swarmMode, setSwarmMode] = useState<SwarmDispatchMode>('monte_carlo_consensus');
  const [allowImprovisation, setAllowImprovisation] = useState(true);
  const [roleFilter, setRoleFilter] = useState<string>('ALL');
  const [activeTab, setActiveTab] = useState<'matrix' | 'bus' | 'result'>('matrix');

  const busEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activeTab === 'bus') {
      busEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, activeTab]);

  const handleLaunch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!goalText.trim() || isDispatching) return;
    onDispatchSwarm(goalText, swarmMode, allowImprovisation);
  };

  const filteredAgents = agents.filter(a => {
    if (roleFilter === 'ALL') return true;
    return a.role.includes(roleFilter) || a.name.toLowerCase().includes(roleFilter.toLowerCase());
  });

  const getStatusBadge = (status: AgentRuntimeInstance['status']) => {
    switch (status) {
      case 'idle':
        return <span className="px-2 py-0.5 rounded-full bg-white/[0.06] text-slate-400 text-[10px] font-mono border border-white/10">IDLE</span>;
      case 'reasoning':
      case 'decomposing':
        return <span className="px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 text-[10px] font-mono border border-blue-500/30 animate-pulse">REASONING</span>;
      case 'cross_checking':
        return <span className="px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 text-[10px] font-mono border border-indigo-500/30">CROSS-CHECK</span>;
      case 'conflicted':
        return <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-mono border border-amber-500/30 animate-bounce">CONFLICT</span>;
      case 'reconciling':
        return <span className="px-2 py-0.5 rounded-full bg-violet-500/20 text-violet-300 text-[10px] font-mono border border-violet-500/30">RECONCILING</span>;
      case 'improvised':
        return <span className="px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 text-[10px] font-mono border border-purple-500/30 font-bold">IMPROVISED</span>;
      case 'succeeded':
        return <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-mono border border-emerald-500/30 font-bold">SUCCEEDED</span>;
      case 'failed':
        return <span className="px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 text-[10px] font-mono border border-rose-500/30">FAILED</span>;
      default:
        return <span className="px-2 py-0.5 rounded-full bg-white/[0.06] text-slate-400 text-[10px] font-mono border border-white/10">{status}</span>;
    }
  };

  return (
    <div id="layer-3-hyperdeck-workspace" className="flex flex-col h-[calc(100vh-61px)] bg-transparent text-slate-100 overflow-hidden">
      {/* Top Command Center Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-3.5 bg-slate-900/30 border-b border-white/10 backdrop-blur-2xl">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-purple-400" />
            <h2 className="font-mono text-sm font-bold text-slate-100 uppercase tracking-wider">
              Layer 3 // 20-Agent Monte Carlo Hyper-Deck
            </h2>
          </div>
          <span className="px-2.5 py-0.5 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20 text-[10px] font-mono hidden sm:inline">
            {selectedAgentIds.length} / 20 AGENTS ARMED
          </span>
        </div>

        {/* View Tabs */}
        <div className="flex items-center gap-1 bg-white/[0.04] p-1 rounded-xl border border-white/10 text-xs font-mono backdrop-blur-md">
          <button
            onClick={() => setActiveTab('matrix')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'matrix' ? 'bg-blue-600/30 border border-blue-400/40 text-blue-200 font-semibold shadow-sm' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            20-Agent Matrix
          </button>
          <button
            onClick={() => setActiveTab('bus')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
              activeTab === 'bus' ? 'bg-blue-600/30 border border-blue-400/40 text-blue-200 font-semibold shadow-sm' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <span>Inter-Agent Bus</span>
            {messages.length > 0 && (
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
            )}
          </button>
          {swarmSummary && (
            <button
              onClick={() => setActiveTab('result')}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                activeTab === 'result' ? 'bg-emerald-600/30 border border-emerald-400/40 text-emerald-200 font-semibold shadow-sm' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <span>Consensus Result</span>
              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
            </button>
          )}
        </div>
      </div>

      {/* Main Content Layout: Grid / Split View */}
      <div className="flex-1 overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-0">
        {/* Left / Main Workspace Area (8 cols on large) */}
        <div className="lg:col-span-8 flex flex-col h-full border-r border-white/10 overflow-y-auto p-4 md:p-6 space-y-4">
          {activeTab === 'matrix' && (
            <>
              {/* Agent Matrix Filter & Multi-Select Controls */}
              <div className="flex flex-wrap items-center justify-between gap-3 bg-white/[0.04] p-3.5 rounded-2xl border border-white/10 backdrop-blur-xl text-xs font-mono shadow-md">
                <div className="flex items-center gap-2">
                  <span className="text-slate-400 flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-blue-400" />
                    Select Swarm Size:
                  </span>
                  <div className="flex items-center gap-1">
                    {[1, 4, 8, 12, 16, 20].map((num) => (
                      <button
                        key={num}
                        onClick={() => onSelectCount(num)}
                        className={`px-2.5 py-1 rounded-lg text-[11px] transition-all ${
                          selectedAgentIds.length === num
                            ? 'bg-blue-600 text-white font-bold shadow-sm shadow-blue-500/20'
                            : 'bg-white/[0.05] text-slate-300 hover:bg-white/[0.1] border border-white/5'
                        }`}
                      >
                        {num}
                      </button>
                    ))}
                    <button
                      onClick={onSelectAllAgents}
                      className="px-2.5 py-1 rounded-lg bg-purple-600/30 hover:bg-purple-600/50 text-purple-200 text-[11px] border border-purple-500/30 ml-1 transition-all"
                    >
                      All 20
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-slate-400">Filter:</span>
                  <select
                    value={roleFilter}
                    onChange={(e) => setRoleFilter(e.target.value)}
                    className="bg-slate-900 border border-white/10 rounded-lg px-2.5 py-1 text-[11px] text-slate-300 font-mono outline-none cursor-pointer"
                  >
                    <option value="ALL">All Roles (20)</option>
                    <option value="ARCH">Architect & Decomp</option>
                    <option value="RED">Red-Team & Skeptic</option>
                    <option value="SYM">Symbolic & Math</option>
                    <option value="EXEC">POSIX & Runtime</option>
                    <option value="IMM">Immune & Apoptosis</option>
                    <option value="REC">Reconciliation</option>
                  </select>
                </div>
              </div>

              {/* 20-Agent Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
                {filteredAgents.map((agent) => {
                  const isSelected = selectedAgentIds.includes(agent.id);
                  return (
                    <div
                      key={agent.id}
                      onClick={() => onToggleAgentSelect(agent.id)}
                      className={`relative p-4 rounded-2xl border font-mono text-xs flex flex-col justify-between transition-all cursor-pointer group select-none backdrop-blur-xl ${
                        isSelected
                          ? 'bg-white/[0.08] border-blue-400/50 shadow-xl shadow-blue-500/10 ring-1 ring-blue-400/40'
                          : 'bg-white/[0.02] border-white/10 text-slate-400 opacity-70 hover:opacity-100 hover:border-white/25 hover:bg-white/[0.05]'
                      }`}
                    >
                      {/* Checkbox indicator */}
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-1.5">
                          <div
                            className="w-2.5 h-2.5 rounded-full"
                            style={{ backgroundColor: agent.color }}
                          />
                          <span className="text-[10px] font-bold tracking-wider text-slate-300">
                            {agent.badge}
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5">
                          {getStatusBadge(agent.status)}
                          <div
                            className={`w-4 h-4 rounded-md border flex items-center justify-center transition-colors ${
                              isSelected
                                ? 'bg-blue-500 border-blue-400 text-white'
                                : 'border-white/20 bg-white/[0.05]'
                            }`}
                          >
                            {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                          </div>
                        </div>
                      </div>

                      {/* Agent Name & Model */}
                      <div className="space-y-0.5">
                        <h4 className="font-sans font-bold text-slate-100 text-xs truncate group-hover:text-blue-200">
                          {agent.name}
                        </h4>
                        <span className="text-[10px] text-slate-500 truncate block">
                          {agent.preferredModel}
                        </span>
                      </div>

                      {/* Current Thought / Status Snippet */}
                      <div className="mt-2.5 p-2 rounded-xl bg-black/20 border border-white/5 text-[11px] text-slate-400 min-h-[38px] line-clamp-2 leading-tight">
                        {agent.currentThought || agent.description}
                      </div>

                      {/* Progress Bar & Inspect Trigger */}
                      <div className="mt-2.5 pt-2 border-t border-white/10 flex items-center justify-between text-[10px] text-slate-500">
                        <span>Tokens: {agent.tokenCount}</span>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onInspectAgent(agent);
                          }}
                          className="flex items-center gap-1 text-blue-400 hover:text-blue-300 font-bold"
                        >
                          <Eye className="w-3 h-3" />
                          <span>Inspect</span>
                        </button>
                      </div>

                      {/* Progress line */}
                      {agent.status !== 'idle' && (
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10 rounded-b-2xl overflow-hidden">
                          <div
                            className="h-full bg-blue-400 transition-all duration-300"
                            style={{ width: `${agent.progress}%` }}
                          />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </>
          )}

          {activeTab === 'bus' && (
            <div className="flex flex-col h-full bg-white/[0.03] rounded-2xl border border-white/10 p-5 font-mono text-xs space-y-3 overflow-hidden backdrop-blur-2xl shadow-xl">
              <div className="flex items-center justify-between pb-3 border-b border-white/10 text-slate-400">
                <span className="flex items-center gap-2 font-bold text-slate-100">
                  <MessageSquare className="w-4 h-4 text-blue-400" />
                  Inter-Agent Event Bus // Live Stream ({messages.length} Events)
                </span>
                <span className="text-[10px] text-emerald-400">● REAL-TIME PUB/SUB</span>
              </div>

              <div className="flex-1 overflow-y-auto space-y-3 pr-2">
                {messages.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-48 text-slate-500 text-center">
                    <span>No inter-agent events recorded yet.</span>
                    <span className="text-[11px] text-slate-600 mt-1">Launch a Monte Carlo or Distributed Swarm to observe inter-agent consensus and improvisation.</span>
                  </div>
                ) : (
                  messages.map((m) => (
                    <div
                      key={m.id}
                      className={`p-3.5 rounded-xl border leading-relaxed backdrop-blur-md ${
                        m.type === 'adversarial_challenge'
                          ? 'bg-rose-950/30 border-rose-500/40 text-rose-200'
                          : m.type === 'conflict_detected'
                          ? 'bg-amber-950/30 border-amber-500/40 text-amber-200'
                          : m.type === 'improvisation_pivot'
                          ? 'bg-purple-950/30 border-purple-500/40 text-purple-200'
                          : m.type === 'consensus_vote' || m.type === 'execution_success'
                          ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200'
                          : 'bg-white/[0.04] border-white/10 text-slate-200'
                      }`}
                    >
                      <div className="flex items-center justify-between text-[10px] opacity-80 mb-1">
                        <div className="flex items-center gap-1.5 font-bold">
                          <span className="text-blue-300">{m.senderName}</span>
                          <span>➔</span>
                          <span className="text-slate-400">{m.recipientId === 'all' ? 'BROADCAST' : m.recipientId}</span>
                        </div>
                        <span>{new Date(m.timestamp).toLocaleTimeString()}</span>
                      </div>
                      <p className="text-xs">{m.content}</p>
                    </div>
                  ))
                )}
                <div ref={busEndRef} />
              </div>
            </div>
          )}

          {activeTab === 'result' && swarmSummary && (
            <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-6 space-y-6 font-mono text-xs backdrop-blur-2xl shadow-xl">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/10">
                <div className="space-y-1">
                  <div className="text-base font-bold font-sans text-slate-100 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    Swarm Mission Consensus Achieved
                  </div>
                  <div className="text-slate-400 text-xs">
                    Goal: "{swarmSummary.goal}"
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 font-bold">
                    Score: {(swarmSummary.consensusScore * 100).toFixed(1)}% Agreement
                  </span>
                  <span className="px-3 py-1 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/30 font-bold">
                    {swarmSummary.improvisationsCount} Improvisation Pivots
                  </span>
                </div>
              </div>

              {/* Core Output */}
              <div className="space-y-2">
                <span className="text-slate-400 block font-bold text-xs uppercase tracking-wider">
                  Reconciled Epistemic Solution:
                </span>
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 text-slate-200 text-sm leading-relaxed whitespace-pre-wrap">
                  {swarmSummary.reconciledResult}
                </div>
              </div>

              {/* Financial & Invariant Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3.5 rounded-xl bg-white/[0.04] border border-white/10">
                  <span className="text-slate-500 text-[10px]">PARALLEL AGENTS</span>
                  <div className="text-lg font-bold text-blue-400 mt-1">{swarmSummary.agentCount} Nodes</div>
                </div>
                <div className="p-3.5 rounded-xl bg-white/[0.04] border border-white/10">
                  <span className="text-slate-500 text-[10px]">ACTUAL BILLED</span>
                  <div className="text-lg font-bold text-slate-200 mt-1">${swarmSummary.compressedCostDollars.toFixed(2)}</div>
                </div>
                <div className="p-3.5 rounded-xl bg-white/[0.04] border border-white/10">
                  <span className="text-slate-500 text-[10px]">CAPSULE SAVINGS</span>
                  <div className="text-lg font-bold text-emerald-400 mt-1">${swarmSummary.dollarsSaved.toFixed(2)}</div>
                </div>
                <div className="p-3.5 rounded-xl bg-white/[0.04] border border-white/10">
                  <span className="text-slate-500 text-[10px]">EXECUTION TIME</span>
                  <div className="text-lg font-bold text-purple-400 mt-1">{swarmSummary.totalDurationMs} ms</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Sidebar: Swarm Dispatch Controller & File Capsule Ingest (4 cols on large) */}
        <div className="lg:col-span-4 flex flex-col h-full bg-slate-900/30 backdrop-blur-2xl p-4 md:p-6 space-y-5 overflow-y-auto">
          <form onSubmit={handleLaunch} className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-mono font-bold text-slate-300 flex items-center justify-between">
                <span>SWARM OBJECTIVE / PROMPT</span>
                <span className="text-[10px] text-blue-400 font-normal">{selectedAgentIds.length} Agents Selected</span>
              </label>
              <textarea
                value={goalText}
                onChange={(e) => setGoalText(e.target.value)}
                placeholder='e.g. "Execute a 16-agent Monte Carlo on financial arbitrage under extreme volatility and test resilience against memory corruption."'
                rows={4}
                className="w-full bg-white/[0.04] border border-white/10 focus:border-blue-400/60 rounded-2xl p-3 text-xs font-mono text-slate-100 placeholder-slate-500 outline-none resize-none backdrop-blur-md transition-all shadow-inner"
                disabled={isDispatching}
              />
            </div>

            {/* Mode Selector */}
            <div className="space-y-2">
              <label className="text-xs font-mono font-bold text-slate-300">
                DISPATCH ARCHITECTURE
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setSwarmMode('monte_carlo_consensus')}
                  className={`p-3 rounded-xl border text-left font-mono text-xs transition-all backdrop-blur-md ${
                    swarmMode === 'monte_carlo_consensus'
                      ? 'bg-blue-600/20 border-blue-400/50 text-blue-200 shadow-md'
                      : 'bg-white/[0.03] border-white/10 text-slate-400 hover:bg-white/[0.06]'
                  }`}
                >
                  <div className="font-bold text-blue-300">Monte Carlo</div>
                  <div className="text-[10px] text-slate-500 leading-tight mt-0.5">All agents converge on same goal</div>
                </button>

                <button
                  type="button"
                  onClick={() => setSwarmMode('heterogeneous_distributed')}
                  className={`p-3 rounded-xl border text-left font-mono text-xs transition-all backdrop-blur-md ${
                    swarmMode === 'heterogeneous_distributed'
                      ? 'bg-purple-600/20 border-purple-400/50 text-purple-200 shadow-md'
                      : 'bg-white/[0.03] border-white/10 text-slate-400 hover:bg-white/[0.06]'
                  }`}
                >
                  <div className="font-bold text-purple-300">Distributed</div>
                  <div className="text-[10px] text-slate-500 leading-tight mt-0.5">Separate subtask per agent</div>
                </button>
              </div>
            </div>

            {/* Priority Mandate: Improvise Until Successful */}
            <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-slate-200 flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-orange-400" />
                  Self-Correcting Improvisation
                </span>
                <input
                  type="checkbox"
                  checked={allowImprovisation}
                  onChange={(e) => setAllowImprovisation(e.target.checked)}
                  className="accent-blue-500 w-4 h-4 rounded cursor-pointer"
                />
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
                Mandate: Learn from prior agent failure, detect conflicts, adapt alternative paths, and iterate until 100% success. Failure is not an option.
              </p>
            </div>

            {/* Ingested File Attachments */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-slate-300">
                <span>ATTACHED ASSETS ({files.length})</span>
                <button
                  type="button"
                  onClick={onOpenFileUpload}
                  className="text-blue-400 hover:text-blue-300 flex items-center gap-1 font-bold text-[11px]"
                >
                  <Upload className="w-3 h-3" />
                  <span>+ Ingest File</span>
                </button>
              </div>

              {files.length === 0 ? (
                <div
                  onClick={onOpenFileUpload}
                  className="p-3.5 rounded-xl border border-dashed border-white/15 hover:border-blue-400/50 bg-white/[0.02] text-center cursor-pointer text-[11px] text-slate-400 font-mono transition-colors"
                >
                  Drop code, data, or files here to slice into 16-way capsules.
                </div>
              ) : (
                <div className="space-y-1.5 max-h-32 overflow-y-auto">
                  {files.map((file) => (
                    <div
                      key={file.id}
                      className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs font-mono text-slate-300"
                    >
                      <div className="truncate flex-1 pr-2">
                        <div className="truncate font-semibold text-slate-200">{file.name}</div>
                        <div className="text-[10px] text-slate-500">
                          {(file.size / 1024).toFixed(1)} KB • Entropy H: {file.shannonEntropy}
                        </div>
                      </div>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        16 Chunks
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Launch Swarm Action Button */}
            <button
              type="submit"
              disabled={isDispatching || !goalText.trim() || selectedAgentIds.length === 0}
              className="w-full py-3.5 px-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 disabled:opacity-40 text-white rounded-2xl font-mono text-xs font-bold shadow-xl shadow-blue-500/25 border border-blue-400/30 flex items-center justify-center gap-2 transition-all active:scale-95"
            >
              {isDispatching ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-blue-200" />
                  <span>Swarm Active ({selectedAgentIds.length} Nodes)...</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 text-blue-200" />
                  <span>Dispatch Swarm ({selectedAgentIds.length} Agents) [Key: M]</span>
                </>
              )}
            </button>
          </form>

          {/* Interactive Keyboard Matrix Strip */}
          <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md space-y-2.5 font-mono text-[11px]">
            <div className="text-slate-400 font-bold uppercase tracking-wider flex items-center gap-1.5 text-[10px]">
              <Terminal className="w-3 h-3 text-blue-400" />
              Keyboard Shortcuts Matrix
            </div>
            <div className="grid grid-cols-2 gap-2 text-slate-300 text-[10px]">
              <div className="flex items-center justify-between p-2 rounded-lg bg-white/[0.04] border border-white/10">
                <span>Layer 1 (Focus)</span>
                <kbd className="px-1.5 py-0.5 bg-white/10 text-blue-300 rounded text-[9px]">1</kbd>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-white/[0.04] border border-white/10">
                <span>Layer 2 (Telemetry)</span>
                <kbd className="px-1.5 py-0.5 bg-white/10 text-emerald-300 rounded text-[9px]">2</kbd>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-white/[0.04] border border-white/10">
                <span>Layer 3 (Hyper-Deck)</span>
                <kbd className="px-1.5 py-0.5 bg-white/10 text-purple-300 rounded text-[9px]">3</kbd>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-white/[0.04] border border-white/10">
                <span>Deploy Swarm</span>
                <kbd className="px-1.5 py-0.5 bg-white/10 text-blue-300 rounded text-[9px]">M</kbd>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-white/[0.04] border border-white/10">
                <span>Upload File</span>
                <kbd className="px-1.5 py-0.5 bg-white/10 text-slate-300 rounded text-[9px]">U</kbd>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-white/[0.04] border border-white/10">
                <span>Command Palette</span>
                <kbd className="px-1.5 py-0.5 bg-white/10 text-slate-300 rounded text-[9px]">Ctrl+K</kbd>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
