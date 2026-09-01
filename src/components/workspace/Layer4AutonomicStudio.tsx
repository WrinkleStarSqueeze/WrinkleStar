import React, { useState, useEffect, useRef } from 'react';
import { 
  Dna, 
  Code2, 
  Network, 
  Volume2, 
  VolumeX, 
  Play, 
  RotateCcw, 
  ShieldCheck, 
  Sparkles, 
  Cpu, 
  Zap, 
  CheckCircle2, 
  AlertTriangle, 
  Flame, 
  Layers, 
  Activity, 
  GitBranch, 
  Terminal, 
  Eye, 
  ArrowRight,
  RefreshCw,
  Award,
  Sliders
} from 'lucide-react';
import { 
  AgentRuntimeInstance, 
  StateManifoldTelemetry, 
  GeneticAgentGenome, 
  CodeEvolutionArtifact, 
  MissionPlaybookStep,
  SwarmDispatchMode
} from '../../types';

interface Layer4AutonomicStudioProps {
  agents: AgentRuntimeInstance[];
  telemetry: StateManifoldTelemetry;
  onDispatchSwarm: (goal: string, mode: SwarmDispatchMode, allowImprov: boolean) => void;
  onSwitchLayer: (l: 1 | 2 | 3 | 4) => void;
  onInspectAgent: (agent: AgentRuntimeInstance) => void;
}

export const Layer4AutonomicStudio: React.FC<Layer4AutonomicStudioProps> = ({
  agents,
  telemetry,
  onDispatchSwarm,
  onSwitchLayer,
  onInspectAgent,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'neural_mesh' | 'code_evolution' | 'genetic_optimizer' | 'playbook'>('neural_mesh');
  const [selectedNodeId, setSelectedNodeId] = useState<string>('agent-1');
  const [audioEnabled, setAudioEnabled] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Genetic Optimizer State
  const [generation, setGeneration] = useState(14);
  const [genomes, setGenomes] = useState<GeneticAgentGenome[]>([
    {
      id: 'genome-01',
      name: 'Alpha-Skeptic-V4',
      generation: 14,
      fitnessScore: 98.6,
      traits: {
        skepticism: 0.92,
        epistemicCuriosity: 0.85,
        entropyTolerance: 0.25,
        temperatureVariance: 0.15,
        invariantStrictness: 0.99,
      },
      strategySignature: 'Dual-Barrier CAS + Monte Carlo Epistemic Sheaf',
      successRate: 99.2,
      mutationsCount: 7,
    },
    {
      id: 'genome-02',
      name: 'Deterministic-Gluer-X',
      generation: 14,
      fitnessScore: 96.4,
      traits: {
        skepticism: 0.75,
        epistemicCuriosity: 0.90,
        entropyTolerance: 0.10,
        temperatureVariance: 0.05,
        invariantStrictness: 1.00,
      },
      strategySignature: 'Zero-Copy C-ABI Vector Alignment with Stop-Loss Floor',
      successRate: 98.4,
      mutationsCount: 5,
    },
    {
      id: 'genome-03',
      name: 'Entropy-Compressor-9',
      generation: 13,
      fitnessScore: 94.8,
      traits: {
        skepticism: 0.60,
        epistemicCuriosity: 0.95,
        entropyTolerance: 0.80,
        temperatureVariance: 0.40,
        invariantStrictness: 0.95,
      },
      strategySignature: '16-Way Shannon Slicing + Lossless Reconstruction',
      successRate: 96.7,
      mutationsCount: 9,
    },
  ]);

  // Code Evolution & Self-Repair Artifacts State
  const [codeArtifact, setCodeArtifact] = useState<CodeEvolutionArtifact>({
    id: 'art-01',
    title: 'Financial Invariant Zero-Loss Guard & CAS Monotonic Barrier',
    language: 'typescript',
    code: `// ArgOS Invariant Gateway - Autonomous Self-Repaired Routine
export class InvariantBankrollGateway {
  private balanceCents: bigint = 9520n; // $95.20
  private readonly floorCents: bigint = 7000n; // $70.00 Non-Negotiable
  private readonly maxBurstCents: bigint = 500n; // $5.00 Cap

  /**
   * Evaluates transaction against StopLossFloor Invariant.
   * Uses Atomic Monotonic verification with 0ns lock overhead.
   */
  public executeTransaction(costCents: bigint): { approved: boolean; newBalance: bigint } {
    if (costCents > this.maxBurstCents) {
      throw new Error("INVARIANT_VIOLATION: Single-burst cap exceeded");
    }
    const candidateBalance = this.balanceCents - costCents;
    if (candidateBalance < this.floorCents) {
      throw new Error("INVARIANT_VIOLATION: Breach of $70.00 StopLoss reserve floor");
    }
    this.balanceCents = candidateBalance;
    return { approved: true, newBalance: this.balanceCents };
  }
}`,
    previousVersionCode: `// Faulty Candidate (Red-Team Refuted due to Race Condition)
export class InvariantBankrollGateway {
  private balance = 95.20;
  executeTransaction(cost: number) {
    // BUG: Missing atomic check and floor breach vulnerability!
    this.balance -= cost;
    return { approved: true, newBalance: this.balance };
  }
}`,
    executionLogs: [
      '[TEST 1] Single Burst Verification ($4.80 <= $5.00 Cap)... PASSED',
      '[TEST 2] StopLoss Reserve Floor Invariant ($70.00 Floor)... PASSED',
      '[TEST 3] Atomic CAS Monotonic Epoch Barrier... PASSED (0ns lock contention)',
      '[TEST 4] 16-way Parallel Sheaf Reconstruction... BIT-PERFECT (0% Loss)',
    ],
    testStatus: 'passing',
    gasCostTokens: 420,
    coveragePct: 100,
    invariantStatus: 'VERIFIED_SAFE',
  });

  // Mission Playbook DAG State
  const [playbookSteps, setPlaybookSteps] = useState<MissionPlaybookStep[]>([
    {
      id: 'step-1',
      title: 'Goal Ingestion & Contract Freeze',
      description: 'Formalize objective and lock the $70.00 reserve floor invariant.',
      agentRole: 'LEAD_ARCHITECT',
      assignedNode: 'ARCH-01 (Argus-Prime)',
      status: 'completed',
      durationMs: 42,
    },
    {
      id: 'step-2',
      title: 'Shannon Entropy Slicing (16 Chunks)',
      description: 'Decompose raw workload into 16 non-overlapping epistemic chunks.',
      agentRole: 'SHANNON_ENTROPY_COMPRESSOR',
      assignedNode: 'ENT-05 (Entropy-Shannon)',
      status: 'completed',
      durationMs: 78,
    },
    {
      id: 'step-3',
      title: 'Parallel 20-Agent Monte Carlo Probe',
      description: 'Execute concurrent hypothesis generation across multi-model pool.',
      agentRole: 'TASK_DECOMPOSITION_ENGINE',
      assignedNode: 'DEC-10 (Atom-Splitter)',
      status: 'active',
      durationMs: 620,
    },
    {
      id: 'step-4',
      title: 'Adversarial Red-Team Challenge',
      description: 'Attempt boundary refutation and edge-case attacks.',
      agentRole: 'RED_TEAM_SKEPTIC',
      assignedNode: 'RED-02 (Skeptic-Red)',
      status: 'pending',
      durationMs: 0,
    },
    {
      id: 'step-5',
      title: 'Epistemic Sheaf Gluing & Consensus Seal',
      description: 'Reconcile verified solutions with bit-perfect mathematical proof.',
      agentRole: 'EPISTEMIC_RECONCILER',
      assignedNode: 'REC-16 (Harmonia)',
      status: 'pending',
      durationMs: 0,
    },
  ]);

  // Audio Synthesizer Toggle
  const toggleAudio = () => {
    if (!audioEnabled) {
      try {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioContextClass) {
          const ctx = new AudioContextClass();
          audioCtxRef.current = ctx;
          // Play subtle harmonious sine chord
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(440, ctx.currentTime); // A4
          gain.gain.setValueAtTime(0.04, ctx.currentTime);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start();
          setTimeout(() => {
            gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.5);
            setTimeout(() => osc.stop(), 500);
          }, 300);
        }
      } catch (e) {
        console.warn('Audio API unavailable');
      }
      setAudioEnabled(true);
    } else {
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
      }
      setAudioEnabled(false);
    }
  };

  // Evolve / Mutate Genome
  const handleMutateGenome = () => {
    setGeneration((prev) => prev + 1);
    setGenomes((prev) =>
      prev.map((g, idx) => ({
        ...g,
        generation: generation + 1,
        fitnessScore: Math.min(99.9, +(g.fitnessScore + (Math.random() * 0.4 - 0.1)).toFixed(1)),
        mutationsCount: g.mutationsCount + 1,
        traits: {
          ...g.traits,
          skepticism: +(Math.min(0.99, g.traits.skepticism + 0.02)).toFixed(2),
          invariantStrictness: 1.0,
        },
      }))
    );
  };

  const selectedAgent = agents.find((a) => a.id === selectedNodeId) || agents[0];

  return (
    <div id="layer-4-autonomic-genesis-studio" className="flex flex-col h-[calc(100vh-61px)] bg-transparent text-slate-100 font-mono overflow-hidden">
      
      {/* Top Header Strip */}
      <div className="px-6 py-3 bg-slate-900/40 border-b border-white/10 backdrop-blur-2xl flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-purple-600/40 to-pink-600/40 border border-purple-400/40 flex items-center justify-center shadow-lg shadow-purple-500/20">
            <Dna className="w-4 h-4 text-purple-300" />
          </div>
          <div>
            <div className="font-bold text-slate-100 flex items-center gap-2 font-sans text-sm">
              <span>Layer 4: Autonomic Genesis & Swarm Synthesis Studio</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-400/30">
                PROPRIETARY MESH
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-mono">
              Live Neural Mesh Topology • Code Self-Repair • Genetic Trait Breeding • Auditory Telemetry
            </p>
          </div>
        </div>

        {/* Audio Synthesizer & Sub-Tabs */}
        <div className="flex items-center gap-2.5">
          {/* Audio Synthesizer Toggle */}
          <button
            onClick={toggleAudio}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs transition-all ${
              audioEnabled
                ? 'bg-blue-600/30 text-blue-200 border-blue-400/50 shadow-md shadow-blue-500/20'
                : 'bg-white/[0.04] text-slate-400 border-white/10 hover:text-slate-200'
            }`}
            title="Toggle Swarm Auditory Sonification"
          >
            {audioEnabled ? <Volume2 className="w-3.5 h-3.5 text-blue-400 animate-pulse" /> : <VolumeX className="w-3.5 h-3.5" />}
            <span>{audioEnabled ? 'Synth Sound ON' : 'Audio Muted'}</span>
          </button>

          {/* Sub Navigation */}
          <div className="flex items-center bg-white/[0.04] p-1 rounded-xl border border-white/10">
            <button
              onClick={() => setActiveSubTab('neural_mesh')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs transition-all ${
                activeSubTab === 'neural_mesh'
                  ? 'bg-purple-600/30 text-purple-200 border border-purple-400/40 font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Network className="w-3.5 h-3.5 text-purple-400" />
              <span>Neural Mesh</span>
            </button>

            <button
              onClick={() => setActiveSubTab('code_evolution')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs transition-all ${
                activeSubTab === 'code_evolution'
                  ? 'bg-blue-600/30 text-blue-200 border border-blue-400/40 font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Code2 className="w-3.5 h-3.5 text-blue-400" />
              <span>Code Evolution</span>
            </button>

            <button
              onClick={() => setActiveSubTab('genetic_optimizer')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs transition-all ${
                activeSubTab === 'genetic_optimizer'
                  ? 'bg-pink-600/30 text-pink-200 border border-pink-400/40 font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Dna className="w-3.5 h-3.5 text-pink-400" />
              <span>Genetic Optimizer</span>
            </button>

            <button
              onClick={() => setActiveSubTab('playbook')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs transition-all ${
                activeSubTab === 'playbook'
                  ? 'bg-emerald-600/30 text-emerald-200 border border-emerald-400/40 font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <GitBranch className="w-3.5 h-3.5 text-emerald-400" />
              <span>Playbook DAG</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Layer 4 Body */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
        
        {/* ========================================================================= */}
        {/* VIEW 1: INTERACTIVE 20-NODE NEURAL MESH TOPOLOGY                          */}
        {/* ========================================================================= */}
        {activeSubTab === 'neural_mesh' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full min-h-[520px]">
            
            {/* Visual Topology Canvas Panel (8 Cols) */}
            <div className="lg:col-span-8 p-5 rounded-3xl bg-slate-900/30 border border-white/10 backdrop-blur-2xl flex flex-col justify-between relative overflow-hidden shadow-2xl">
              
              <div className="flex items-center justify-between z-10">
                <div className="flex items-center gap-2">
                  <Network className="w-4 h-4 text-purple-400" />
                  <span className="font-bold text-slate-100 text-sm font-sans">
                    20-Node Force-Directed Causal Topology
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-300 border border-blue-400/20">
                    INTER-AGENT BUS ACTIVE
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <span>Packet Latency: <strong className="text-emerald-400">{telemetry.cpu_latency_ns}ns</strong></span>
                  <span>•</span>
                  <span>Entropy: <strong className="text-purple-400">H = {telemetry.shannon_entropy}</strong></span>
                </div>
              </div>

              {/* 20 Nodes Interactive Geometric Orbit Map */}
              <div className="relative w-full h-[360px] md:h-[400px] my-4 flex items-center justify-center">
                
                {/* Central Kernel Core Hub */}
                <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-blue-600/30 to-purple-600/30 border-2 border-blue-400/60 flex flex-col items-center justify-center text-center shadow-[0_0_30px_rgba(59,130,246,0.3)] z-20 backdrop-blur-xl animate-pulse">
                  <Cpu className="w-6 h-6 text-blue-300 mb-0.5" />
                  <span className="text-[10px] font-bold text-slate-100">ARGOS</span>
                  <span className="text-[8px] text-blue-300">CORE KERNEL</span>
                </div>

                {/* Concentric Orbit Rings */}
                <div className="absolute w-[240px] h-[240px] rounded-full border border-dashed border-white/15 pointer-events-none" />
                <div className="absolute w-[360px] h-[360px] rounded-full border border-dashed border-white/10 pointer-events-none" />

                {/* 20 Dynamic Interactive Node Orbits */}
                {agents.map((agent, idx) => {
                  const angle = (idx / agents.length) * 2 * Math.PI;
                  const radius = idx < 8 ? 120 : 180;
                  const x = Math.cos(angle) * radius;
                  const y = Math.sin(angle) * radius;
                  const isSelected = selectedNodeId === agent.id;

                  return (
                    <button
                      key={agent.id}
                      onClick={() => setSelectedNodeId(agent.id)}
                      onDoubleClick={() => onInspectAgent(agent)}
                      style={{
                        transform: `translate(${x}px, ${y}px)`,
                      }}
                      className={`absolute w-9 h-9 rounded-2xl flex items-center justify-center transition-all group z-20 cursor-pointer ${
                        isSelected
                          ? 'bg-blue-600 text-white border-2 border-white shadow-[0_0_20px_rgba(59,130,246,0.8)] scale-125'
                          : agent.status === 'succeeded'
                          ? 'bg-emerald-600/30 border border-emerald-400 text-emerald-300 hover:scale-110'
                          : agent.status === 'conflicted'
                          ? 'bg-rose-600/30 border border-rose-400 text-rose-300 hover:scale-110 animate-bounce'
                          : 'bg-white/[0.06] border border-white/15 text-slate-300 hover:border-blue-400 hover:scale-110'
                      }`}
                      title={`${agent.name} (${agent.role})`}
                    >
                      <span className="text-[10px] font-bold">{agent.badge.slice(0, 3)}</span>
                      
                      {/* Pulse Indicator */}
                      <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-slate-900 shadow-sm" />
                    </button>
                  );
                })}

                {/* SVG Interconnecting Force Rays */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40">
                  {agents.slice(0, 10).map((agent, idx) => {
                    const angle = (idx / agents.length) * 2 * Math.PI;
                    const x2 = 50 + (Math.cos(angle) * 35);
                    const y2 = 50 + (Math.sin(angle) * 35);
                    return (
                      <line
                        key={idx}
                        x1="50%"
                        y1="50%"
                        x2={`${x2}%`}
                        y2={`${y2}%`}
                        stroke="#60a5fa"
                        strokeWidth="1"
                        strokeDasharray="4 4"
                      />
                    );
                  })}
                </svg>
              </div>

              {/* Bottom Legend */}
              <div className="flex flex-wrap items-center justify-between text-[11px] text-slate-400 border-t border-white/10 pt-3 z-10">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-400" /> Succeeded</span>
                  <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-blue-400" /> Active Reasoning</span>
                  <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-rose-400" /> Adversarial Challenge</span>
                </div>
                <span>Double-click any node to open Full Forensic Inspector</span>
              </div>
            </div>

            {/* Selected Node Telemetry Card (4 Cols) */}
            <div className="lg:col-span-4 p-5 rounded-3xl bg-slate-900/30 border border-white/10 backdrop-blur-2xl flex flex-col justify-between space-y-4 shadow-xl">
              <div className="space-y-3">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-blue-300 font-bold text-xs">
                      {selectedAgent.badge}
                    </div>
                    <div>
                      <div className="font-bold text-slate-100 text-sm font-sans">{selectedAgent.name}</div>
                      <div className="text-[10px] text-blue-400">{selectedAgent.role}</div>
                    </div>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                    selectedAgent.status === 'succeeded' ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400/30' : 'bg-blue-500/20 text-blue-300 border-blue-400/30'
                  }`}>
                    {selectedAgent.status.toUpperCase()}
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="text-slate-400 font-sans leading-relaxed">
                    {selectedAgent.description}
                  </div>

                  <div className="p-3 rounded-2xl bg-white/[0.04] border border-white/10 space-y-1.5">
                    <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">
                      Current Epistemic Thought:
                    </span>
                    <p className="text-slate-200 text-xs italic">
                      "{selectedAgent.currentThought}"
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
                    <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5">
                      <span className="text-slate-400 block text-[10px]">Model Provider</span>
                      <span className="text-blue-300 font-semibold">{selectedAgent.preferredModel}</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5">
                      <span className="text-slate-400 block text-[10px]">Temperature</span>
                      <span className="text-slate-200 font-semibold">{selectedAgent.temperature}</span>
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={() => onInspectAgent(selectedAgent)}
                className="w-full py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-2xl text-xs font-bold shadow-lg border border-blue-400/30 transition-all flex items-center justify-center gap-2"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Open Complete Node Inspector</span>
              </button>
            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* VIEW 2: CODE EVOLUTION & SELF-REPAIR SANDBOX                             */}
        {/* ========================================================================= */}
        {activeSubTab === 'code_evolution' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full">
            
            {/* Code Editor & Diff Viewer (8 Cols) */}
            <div className="lg:col-span-8 p-5 rounded-3xl bg-slate-900/30 border border-white/10 backdrop-blur-2xl space-y-4 shadow-2xl flex flex-col justify-between">
              
              <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs">
                <div className="flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-blue-400" />
                  <span className="font-bold text-slate-100 font-sans text-sm">{codeArtifact.title}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 font-bold">
                    {codeArtifact.invariantStatus}
                  </span>
                </div>
              </div>

              {/* Code Viewer */}
              <div className="relative bg-black/40 border border-white/10 rounded-2xl p-4 overflow-x-auto text-xs leading-relaxed text-slate-200">
                <pre className="font-mono">{codeArtifact.code}</pre>
              </div>

              {/* Execution Test Suite Logs */}
              <div className="space-y-2 p-3.5 rounded-2xl bg-white/[0.03] border border-white/10">
                <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-blue-400" />
                  Live Unit Test Execution & Invariant Gate:
                </span>
                <div className="space-y-1 text-[11px]">
                  {codeArtifact.executionLogs.map((log, i) => (
                    <div key={i} className="flex items-center gap-2 text-emerald-300 font-mono">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                      <span>{log}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Code Metrics & Mutation Controller (4 Cols) */}
            <div className="lg:col-span-4 p-5 rounded-3xl bg-slate-900/30 border border-white/10 backdrop-blur-2xl space-y-4 shadow-xl flex flex-col justify-between">
              <div className="space-y-3">
                <div className="font-bold text-slate-100 text-sm font-sans pb-3 border-b border-white/10 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Autonomous Invariant Guard</span>
                </div>

                <div className="space-y-2.5 text-xs">
                  <div className="p-3 rounded-2xl bg-white/[0.04] border border-white/10 space-y-1">
                    <span className="text-slate-400 text-[10px]">Test Coverage</span>
                    <div className="text-lg font-bold text-emerald-400">100.0% Verified</div>
                  </div>

                  <div className="p-3 rounded-2xl bg-white/[0.04] border border-white/10 space-y-1">
                    <span className="text-slate-400 text-[10px]">Gas Execution Cost</span>
                    <div className="text-lg font-bold text-blue-400">{codeArtifact.gasCostTokens} Tokens</div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-blue-950/20 border border-blue-500/30 text-blue-200 text-[11px] leading-relaxed space-y-1">
                    <div className="font-bold flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                      Self-Repair Mechanism
                    </div>
                    <p className="text-[10px] text-blue-300/80 font-sans">
                      When Red-Team Skeptic refutes race condition vulnerabilities, Symbolic Validator immediately generates an atomic CAS barrier and commits verified patch.
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => onDispatchSwarm('Verify code evolution against $70.00 stop-loss invariant', 'monte_carlo_consensus', true)}
                className="w-full py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-2xl text-xs font-bold shadow-lg border border-blue-400/30 transition-all flex items-center justify-center gap-2"
              >
                <Play className="w-3.5 h-3.5" />
                <span>Run Full Invariant Verification Swarm</span>
              </button>
            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* VIEW 3: GENETIC AGENT OPTIMIZER & TRAIT BREEDER                           */}
        {/* ========================================================================= */}
        {activeSubTab === 'genetic_optimizer' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full">
            
            {/* Genomes Table & Pareto Frontier (8 Cols) */}
            <div className="lg:col-span-8 p-5 rounded-3xl bg-slate-900/30 border border-white/10 backdrop-blur-2xl space-y-4 shadow-2xl">
              <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs">
                <div className="flex items-center gap-2">
                  <Dna className="w-4 h-4 text-pink-400" />
                  <span className="font-bold text-slate-100 font-sans text-sm">
                    Genetic Population (Generation #{generation})
                  </span>
                </div>
                <button
                  onClick={handleMutateGenome}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white rounded-xl text-xs font-bold shadow-md transition-all active:scale-95"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Evolve Generation +1</span>
                </button>
              </div>

              {/* Genomes List */}
              <div className="space-y-3">
                {genomes.map((g) => (
                  <div key={g.id} className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <Award className="w-4 h-4 text-pink-400" />
                        <div>
                          <div className="font-bold text-slate-100 text-sm font-sans">{g.name}</div>
                          <div className="text-[10px] text-slate-400">{g.strategySignature}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-bold text-pink-300">{g.fitnessScore}% Fitness</div>
                        <div className="text-[10px] text-slate-400">{g.mutationsCount} Mutations</div>
                      </div>
                    </div>

                    {/* Trait Bars */}
                    <div className="grid grid-cols-3 gap-3 text-[10px] pt-2 border-t border-white/5">
                      <div>
                        <span className="text-slate-400">Skepticism: <strong>{(g.traits.skepticism * 100).toFixed(0)}%</strong></span>
                        <div className="w-full h-1 bg-white/10 rounded-full mt-1">
                          <div className="h-full bg-pink-400 rounded-full" style={{ width: `${g.traits.skepticism * 100}%` }} />
                        </div>
                      </div>
                      <div>
                        <span className="text-slate-400">Curiosity: <strong>{(g.traits.epistemicCuriosity * 100).toFixed(0)}%</strong></span>
                        <div className="w-full h-1 bg-white/10 rounded-full mt-1">
                          <div className="h-full bg-purple-400 rounded-full" style={{ width: `${g.traits.epistemicCuriosity * 100}%` }} />
                        </div>
                      </div>
                      <div>
                        <span className="text-slate-400">Invariant: <strong>{(g.traits.invariantStrictness * 100).toFixed(0)}%</strong></span>
                        <div className="w-full h-1 bg-white/10 rounded-full mt-1">
                          <div className="h-full bg-emerald-400 rounded-full" style={{ width: `${g.traits.invariantStrictness * 100}%` }} />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </div>

            {/* Optimization Benchmark (4 Cols) */}
            <div className="lg:col-span-4 p-5 rounded-3xl bg-slate-900/30 border border-white/10 backdrop-blur-2xl space-y-4 shadow-xl flex flex-col justify-between">
              <div className="space-y-3">
                <div className="font-bold text-slate-100 text-sm font-sans pb-3 border-b border-white/10 flex items-center gap-2">
                  <Flame className="w-4 h-4 text-pink-400" />
                  <span>Pareto Optimization</span>
                </div>

                <div className="space-y-2.5 text-xs">
                  <div className="p-3 rounded-2xl bg-white/[0.04] border border-white/10 space-y-1">
                    <span className="text-slate-400 text-[10px]">Benchmark Win-Rate</span>
                    <div className="text-lg font-bold text-pink-300">99.2% Superiority</div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-pink-950/20 border border-pink-500/30 text-pink-200 text-[11px] leading-relaxed space-y-1">
                    <div className="font-bold flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-pink-400" />
                      Continuous Evolutionary Pressure
                    </div>
                    <p className="text-[10px] text-pink-300/80 font-sans">
                      Agents that resolve conflicts fastest without breaching safety bounds receive higher fitness weighting in swarm dispatch selections.
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => onSwitchLayer(3)}
                className="w-full py-2.5 bg-white/[0.06] hover:bg-white/[0.1] text-slate-200 rounded-2xl text-xs font-bold border border-white/10 transition-all flex items-center justify-center gap-2"
              >
                <span>Deploy Fittest Fleet to Hyper-Deck (L3)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* VIEW 4: MISSION PLAYBOOK DAG WORKFLOW COMPOSER                            */}
        {/* ========================================================================= */}
        {activeSubTab === 'playbook' && (
          <div className="p-5 rounded-3xl bg-slate-900/30 border border-white/10 backdrop-blur-2xl space-y-5 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs">
              <div className="flex items-center gap-2">
                <GitBranch className="w-4 h-4 text-emerald-400" />
                <span className="font-bold text-slate-100 font-sans text-sm">
                  Autonomous Mission Playbook DAG (Execution Blueprint)
                </span>
              </div>
              <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                5 STAGES DIRECTED ACYCLIC GRAPH
              </span>
            </div>

            {/* Playbook Steps Pipeline */}
            <div className="space-y-3">
              {playbookSteps.map((step, idx) => (
                <div
                  key={step.id}
                  className={`p-4 rounded-2xl border transition-all flex items-start justify-between ${
                    step.status === 'completed'
                      ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-200'
                      : step.status === 'active'
                      ? 'bg-blue-950/30 border-blue-500/50 text-blue-100 shadow-lg shadow-blue-500/10 animate-pulse'
                      : 'bg-white/[0.03] border-white/10 text-slate-400'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${
                      step.status === 'completed'
                        ? 'bg-emerald-500 text-slate-950'
                        : step.status === 'active'
                        ? 'bg-blue-500 text-white'
                        : 'bg-white/10 text-slate-400'
                    }`}>
                      {idx + 1}
                    </div>

                    <div className="space-y-1">
                      <div className="font-bold font-sans text-sm text-slate-100">{step.title}</div>
                      <p className="text-xs text-slate-300 font-sans">{step.description}</p>
                      <div className="text-[10px] text-slate-400 pt-1 font-mono">
                        Node: <strong className="text-blue-300">{step.assignedNode}</strong> • Role: <strong className="text-slate-300">{step.agentRole}</strong>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                      step.status === 'completed'
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400/30'
                        : step.status === 'active'
                        ? 'bg-blue-500/20 text-blue-300 border-blue-400/30'
                        : 'bg-white/5 text-slate-500 border-white/10'
                    }`}>
                      {step.status.toUpperCase()}
                    </span>
                    {step.durationMs > 0 && (
                      <div className="text-[10px] text-slate-400 mt-1">{step.durationMs}ms</div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-white/10">
              <div className="text-xs text-slate-400 font-sans">
                Each stage is cryptographically validated and attested before transitioning to state manifold commit.
              </div>
              <button
                onClick={() => onDispatchSwarm('Execute Autonomous Mission Playbook DAG across 20 nodes', 'monte_carlo_consensus', true)}
                className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl text-xs font-bold shadow-lg border border-emerald-400/30 transition-all flex items-center gap-1.5"
              >
                <Play className="w-3.5 h-3.5" />
                <span>Execute Complete Playbook</span>
              </button>
            </div>

          </div>
        )}

      </div>

    </div>
  );
};
