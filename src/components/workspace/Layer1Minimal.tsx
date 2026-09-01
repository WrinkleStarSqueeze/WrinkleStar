import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Upload, 
  Sparkles, 
  Play, 
  Bot, 
  FileText, 
  ShieldCheck, 
  Layers, 
  CheckCircle2, 
  RefreshCw, 
  Trash2, 
  Zap,
  ArrowRight,
  Sliders,
  Columns,
  Maximize2,
  Minimize2,
  HardDrive,
  Award,
  Crown,
  BrainCircuit,
  Target,
  FileCode,
  Copy,
  Check,
  Flame,
  Activity,
  Cpu,
  ChevronRight,
  Info
} from 'lucide-react';
import { 
  ChatMessage, 
  IngestedFile, 
  StateManifoldTelemetry, 
  AiModelProvider,
  SwarmDispatchMode,
  QuadModelResponse,
  FiveAxisScore
} from '../../types';
import { FiveAxisMatrix, AXIS_DEFINITIONS } from './FiveAxisMatrix';

interface Layer1MinimalProps {
  messages: ChatMessage[];
  onSendMessage: (
    text: string, 
    customSystemInstruction?: string, 
    modelOverride?: AiModelProvider, 
    isQuadBroadcast?: boolean
  ) => Promise<void>;
  isLoading: boolean;
  onDeploySwarm: (goal: string, mode: SwarmDispatchMode, count: number) => void;
  onOpenFileUpload: () => void;
  onOpenGoogleDrive: () => void;
  files: IngestedFile[];
  onRemoveFile: (fileId: string) => void;
  telemetry: StateManifoldTelemetry;
  selectedModel: AiModelProvider;
  onSelectModel: (m: AiModelProvider) => void;
  onSwitchLayer: (l: 1 | 2 | 3 | 4) => void;
  onClearChat?: () => void;
}

export const QUAD_MODELS: Array<{
  id: AiModelProvider;
  name: string;
  roleTag: string;
  badge: string;
  color: string;
  borderCol: string;
  bgGlow: string;
  desc: string;
}> = [
  {
    id: 'gemini-3.7-flash',
    name: 'Gemini 3.7 Flash',
    roleTag: 'HYPER-LATENCY & REASONING',
    badge: 'FLASH-3.7',
    color: 'text-blue-400',
    borderCol: 'border-blue-500/30',
    bgGlow: 'bg-blue-950/20',
    desc: 'Ultra-low TTFT latency with integrated adaptive reasoning chains.'
  },
  {
    id: 'gemini-3.1-pro-preview',
    name: 'Gemini 3.1 Pro',
    roleTag: 'EPISTEMIC & INVARIANT ARCHITECT',
    badge: 'PRO-3.1',
    color: 'text-purple-400',
    borderCol: 'border-purple-500/30',
    bgGlow: 'bg-purple-950/20',
    desc: 'Deep causal reasoning, mathematical invariants & long-context memory.'
  },
  {
    id: 'claude-3.7-sonnet',
    name: 'Claude 3.7 Sonnet',
    roleTag: 'HYBRID THOUGHT SYNTHESIS',
    badge: 'SONNET-3.7',
    color: 'text-amber-400',
    borderCol: 'border-amber-500/30',
    bgGlow: 'bg-amber-950/20',
    desc: 'Granular step-by-step verification with strong code architecture.'
  },
  {
    id: 'deepseek-r1-v3',
    name: 'DeepSeek R1 / GPT-4o',
    roleTag: 'REFLECTIVE REASONING PROOF',
    badge: 'R1-PROOFS',
    color: 'text-emerald-400',
    borderCol: 'border-emerald-500/30',
    bgGlow: 'bg-emerald-950/20',
    desc: 'Self-correcting verification loops and formal symbolic proofs.'
  }
];

export const Layer1Minimal: React.FC<Layer1MinimalProps> = ({
  messages,
  onSendMessage,
  isLoading,
  onDeploySwarm,
  onOpenFileUpload,
  onOpenGoogleDrive,
  files,
  onRemoveFile,
  telemetry,
  selectedModel,
  onSelectModel,
  onSwitchLayer,
  onClearChat
}) => {
  const [inputText, setInputText] = useState('');
  const [isQuadBroadcast, setIsQuadBroadcast] = useState(true);
  const [activeViewMode, setActiveViewMode] = useState<'quad' | 'unified' | 'arbiter'>('quad');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeModelTab, setActiveModelTab] = useState<number>(0);

  const chatEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim() || isLoading) return;
    const text = inputText;
    setInputText('');
    onSendMessage(text, undefined, selectedModel, isQuadBroadcast);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const quickPrompts = [
    {
      label: '⚡ Monte Carlo (20 Agents)',
      prompt: 'Please set up a Monte Carlo of 20 agents to run parallel epistemic reconciliation on: "Design a zero-loss financial invariant gateway for high-frequency trades."',
      mode: 'monte_carlo_consensus' as SwarmDispatchMode,
      count: 20,
    },
    {
      label: '🛡️ Invariant Check ($70 Floor)',
      prompt: 'Execute a governance check on current bankroll balance and verify that no transaction breaches the $70.00 reserve floor.',
      mode: 'monte_carlo_consensus' as SwarmDispatchMode,
      count: 6,
    },
    {
      label: '📊 5-Axis Model Benchmark',
      prompt: 'Subject all 4 models to the 5-Axis grading matrix: Compare reasoning depth, invariant safety, TTFT velocity, factuality, and Shannon context fidelity.',
      mode: 'monte_carlo_consensus' as SwarmDispatchMode,
      count: 8,
    },
    {
      label: '📂 Ingest Google Drive Asset',
      prompt: 'Analyze our attached Google Drive dataset with 16-way Shannon entropy partitioning and synthesize an executive risk mitigation vector.',
      mode: 'heterogeneous_distributed' as SwarmDispatchMode,
      count: 12,
    },
  ];

  return (
    <div id="layer-1-ai-studio-workspace" className="flex flex-col h-[calc(100vh-61px)] bg-transparent text-slate-100 overflow-hidden font-sans">
      
      {/* ========================================================================= */}
      {/* TOP HEADER: MINIMALIST STATUS & 4-MODEL ARENA CONTROLS                    */}
      {/* ========================================================================= */}
      <div className="shrink-0 px-4 md:px-6 py-2.5 bg-slate-900/40 border-b border-white/10 backdrop-blur-2xl flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
        
        {/* Left: Mode Title & 4-Model Indicator */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-bold text-slate-100 uppercase tracking-wider">
              ArgOS Level 9 Intelligence Arena
            </span>
          </div>

          <span className="hidden sm:inline-block px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-300 border border-blue-400/20 text-[10px]">
            4-MODEL COMPARISON ARENA
          </span>

          <span className="hidden md:inline-block px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-300 border border-purple-400/20 text-[10px]">
            5-AXIS GRADING MATRIX ACTIVE
          </span>
        </div>

        {/* Right: Quick Controls (Google Drive, View Toggle, Invariants) */}
        <div className="flex items-center gap-2.5">
          {/* Google Drive Button */}
          <button
            onClick={onOpenGoogleDrive}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-slate-300 hover:text-blue-300 transition-colors text-[11px]"
            title="Open Google Drive File Browser & Ingestion"
          >
            <HardDrive className="w-3.5 h-3.5 text-blue-400" />
            <span>Google Drive</span>
          </button>

          {/* Context Assets Pill */}
          <button
            onClick={onOpenFileUpload}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-slate-300 hover:text-purple-300 transition-colors text-[11px]"
          >
            <FileText className="w-3.5 h-3.5 text-purple-400" />
            <span>Assets ({files.length})</span>
          </button>

          {/* 4-Way Broadcast Toggle */}
          <button
            onClick={() => setIsQuadBroadcast(!isQuadBroadcast)}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl border text-[11px] font-bold transition-all ${
              isQuadBroadcast
                ? 'bg-blue-600/25 text-blue-200 border-blue-400/40 shadow-sm'
                : 'bg-white/[0.04] text-slate-400 border-white/10'
            }`}
            title="Toggle whether prompts broadcast to all 4 models in parallel"
          >
            <Columns className="w-3.5 h-3.5" />
            <span>{isQuadBroadcast ? '4-Way Broadcast ON' : 'Single Target'}</span>
          </button>

          {/* Invariant Balance pill */}
          <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-emerald-950/20 border border-emerald-500/30 text-emerald-300 text-[11px]">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>${(telemetry.budget_cents / 100).toFixed(2)} ($70 Floor)</span>
          </div>

          {messages.length > 0 && onClearChat && (
            <button
              onClick={onClearChat}
              className="p-1 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-white/[0.04] transition-colors"
              title="Clear Arena History"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

      </div>

      {/* ========================================================================= */}
      {/* MAIN ARENA BODY: CHAT STREAM & 4-COLUMN SIDE-BY-SIDE MODEL VIEW           */}
      {/* ========================================================================= */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
        
        {/* EMPTY STATE / HERO BANNER */}
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[50vh] text-center space-y-6 max-w-5xl mx-auto py-8">
            
            {/* Minimalist Glowing Badge */}
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-600/15 border border-blue-400/30 text-blue-300 text-xs font-mono shadow-lg backdrop-blur-xl">
              <Sparkles className="w-4 h-4 text-blue-400" />
              <span>ArgOS Level 9 Intelligence & 5-Axis Model Grading Matrix</span>
            </div>

            <div className="space-y-2 max-w-2xl">
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-100 font-sans">
                Minimalist Orchestration & 4-Model Parallel Arena
              </h2>
              <p className="text-xs md:text-sm text-slate-400 leading-relaxed font-mono">
                Ask ArgOS anything, command 20-agent Monte Carlo swarms, or evaluate 4 frontier models side-by-side graded autonomously on 5 epistemic axes.
              </p>
            </div>

            {/* 4 Models Preview Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 w-full text-left font-mono text-xs">
              {QUAD_MODELS.map((m) => (
                <div
                  key={m.id}
                  onClick={() => onSelectModel(m.id)}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer group ${
                    selectedModel === m.id
                      ? `${m.bgGlow} ${m.borderCol} shadow-lg ring-1 ring-white/10`
                      : 'bg-white/[0.02] border-white/10 hover:border-white/20 hover:bg-white/[0.04]'
                  }`}
                >
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/5">
                    <span className={`font-bold text-xs ${m.color}`}>{m.name}</span>
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-white/5 text-slate-400">{m.badge}</span>
                  </div>
                  <div className="text-[10px] text-slate-400 leading-relaxed font-sans line-clamp-2">
                    {m.desc}
                  </div>
                  <div className="mt-2.5 pt-2 border-t border-white/5 flex items-center justify-between text-[10px] text-slate-500">
                    <span>{m.roleTag}</span>
                    <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              ))}
            </div>

            {/* 5 Evaluative Axes Preview Cards */}
            <div className="w-full p-4 rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-xl">
              <div className="flex items-center justify-between pb-2 mb-3 border-b border-white/5 text-xs font-mono">
                <span className="font-bold text-slate-300 flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-amber-400" />
                  The 5-Axis Model Grading Matrix:
                </span>
                <span className="text-[10px] text-slate-500">RLHF & Epistemic Verification Engine</span>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 text-left font-mono text-xs">
                {AXIS_DEFINITIONS.map((axis) => {
                  const Icon = axis.icon;
                  return (
                    <div key={axis.key} className="p-2.5 rounded-xl bg-black/30 border border-white/5 space-y-1">
                      <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-200">
                        <Icon className={`w-3.5 h-3.5 ${axis.color}`} />
                        <span>{axis.shortLabel}</span>
                      </div>
                      <p className="text-[9px] text-slate-400 line-clamp-2 font-sans">
                        {axis.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick Action Invocations */}
            <div className="w-full space-y-2">
              <div className="text-xs font-mono text-slate-400 font-bold uppercase tracking-wider text-left">
                Direct Substrate Commands:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 font-mono text-xs">
                {quickPrompts.map((qp, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setInputText(qp.prompt);
                      textareaRef.current?.focus();
                    }}
                    className="p-3 rounded-2xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/10 hover:border-blue-400/40 text-left transition-all group flex flex-col justify-between"
                  >
                    <div className="font-bold text-blue-300 group-hover:text-blue-200 text-xs mb-1">
                      {qp.label}
                    </div>
                    <div className="text-[10px] text-slate-400 line-clamp-2 font-sans">
                      {qp.prompt}
                    </div>
                  </button>
                ))}
              </div>
            </div>

          </div>
        ) : (
          /* MULTI-TURN MESSAGE THREAD WITH 4-MODEL SIDE-BY-SIDE CARDS */
          messages.map((msg, index) => (
            <div key={msg.id} className="space-y-3 font-mono text-xs">
              
              {/* User Prompt Bubble */}
              {msg.role === 'user' && (
                <div className="flex justify-end">
                  <div className="max-w-[85%] sm:max-w-[75%] p-4 rounded-3xl bg-blue-600/25 border border-blue-400/40 text-blue-100 rounded-tr-none shadow-xl backdrop-blur-2xl space-y-1.5">
                    <div className="flex items-center justify-between text-[10px] text-blue-300 pb-1 border-b border-blue-400/20">
                      <span className="font-bold">OPERATOR / HUMAN IN THE LOOP</span>
                      <span>{new Date(msg.timestamp).toLocaleTimeString()}</span>
                    </div>
                    <div className="text-xs sm:text-sm whitespace-pre-wrap font-sans font-medium leading-relaxed">
                      {msg.content}
                    </div>
                  </div>
                </div>
              )}

              {/* Assistant / Swarm / 4-Model Response Body */}
              {msg.role === 'assistant' && (
                <div className="space-y-4">
                  
                  {/* Message Header */}
                  <div className="flex items-center justify-between text-[11px] text-slate-400 px-1">
                    <div className="flex items-center gap-2">
                      <Bot className="w-4 h-4 text-blue-400" />
                      <span className="font-bold text-slate-200">
                        {msg.quadResponses ? '4-Model Parallel Arena Stream' : (msg.modelUsed || 'ArgOS Orchestration Engine')}
                      </span>
                      <span className="text-[10px] text-slate-500">• {new Date(msg.timestamp).toLocaleTimeString()}</span>
                    </div>

                    {msg.quadResponses && (
                      <div className="flex items-center gap-1.5 bg-white/[0.04] p-0.5 rounded-lg border border-white/10 text-[10px]">
                        <button
                          onClick={() => setActiveViewMode('quad')}
                          className={`px-2 py-0.5 rounded-md font-semibold transition-all ${
                            activeViewMode === 'quad' ? 'bg-blue-600/30 text-blue-200' : 'text-slate-400'
                          }`}
                        >
                          4 Columns
                        </button>
                        <button
                          onClick={() => setActiveViewMode('unified')}
                          className={`px-2 py-0.5 rounded-md font-semibold transition-all ${
                            activeViewMode === 'unified' ? 'bg-blue-600/30 text-blue-200' : 'text-slate-400'
                          }`}
                        >
                          Tabbed
                        </button>
                      </div>
                    )}
                  </div>

                  {/* IF 4 QUAD RESPONSES ARE PRESENT: RENDER 4 SIDE-BY-SIDE COLUMNS */}
                  {msg.quadResponses && msg.quadResponses.length > 0 ? (
                    <div>
                      {/* View Mode: 4 Columns (Desktop Grid) */}
                      {activeViewMode === 'quad' ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3.5">
                          {msg.quadResponses.map((qr, qIdx) => {
                            const isWinner = msg.epistemicArbiterVerdict?.winnerModelId === qr.modelId;
                            return (
                              <div
                                key={qr.modelId}
                                className={`rounded-3xl border flex flex-col justify-between overflow-hidden shadow-2xl backdrop-blur-2xl transition-all ${
                                  isWinner
                                    ? 'bg-blue-950/25 border-blue-400/40 ring-1 ring-blue-400/30'
                                    : 'bg-white/[0.03] border-white/10'
                                }`}
                              >
                                {/* Column Model Header */}
                                <div className="p-3.5 border-b border-white/10 bg-white/[0.02] flex items-center justify-between">
                                  <div className="flex items-center gap-2">
                                    {isWinner && <Crown className="w-4 h-4 text-amber-400" />}
                                    <div>
                                      <div className="font-bold text-xs text-slate-100 flex items-center gap-1.5">
                                        <span className={qr.color}>{qr.name}</span>
                                      </div>
                                      <div className="text-[9px] text-slate-400 uppercase">{qr.roleTag}</div>
                                    </div>
                                  </div>

                                  <div className="text-right text-[10px] text-slate-400">
                                    <div className="text-blue-400 font-bold">{qr.latencyMs}ms</div>
                                    <div className="text-[9px] text-slate-500">{qr.throughputTps} t/s</div>
                                  </div>
                                </div>

                                {/* Content Stream */}
                                <div className="p-4 text-xs font-mono text-slate-200 leading-relaxed whitespace-pre-wrap max-h-[360px] overflow-y-auto flex-1">
                                  {qr.content}
                                </div>

                                {/* Integrated 5-Axis Model Grading Matrix Component */}
                                <div className="p-2.5 border-t border-white/10 bg-black/20 space-y-2">
                                  <FiveAxisMatrix
                                    score={qr.scores}
                                    modelName={qr.name}
                                    modelBadge={qr.badge}
                                    interactive={true}
                                    compact={true}
                                  />

                                  <div className="flex items-center justify-between pt-1 text-[10px] text-slate-400">
                                    <span className="text-emerald-400 flex items-center gap-1">
                                      <CheckCircle2 className="w-3 h-3" /> Invariant Safe
                                    </span>
                                    <button
                                      onClick={() => handleCopy(qr.content, `qr-${msg.id}-${qIdx}`)}
                                      className="flex items-center gap-1 text-slate-400 hover:text-slate-200 transition-colors"
                                    >
                                      {copiedId === `qr-${msg.id}-${qIdx}` ? (
                                        <Check className="w-3 h-3 text-emerald-400" />
                                      ) : (
                                        <Copy className="w-3 h-3" />
                                      )}
                                      <span>{copiedId === `qr-${msg.id}-${qIdx}` ? 'Copied' : 'Copy'}</span>
                                    </button>
                                  </div>
                                </div>

                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        /* Tabbed View on Smaller Screens */
                        <div className="rounded-3xl border border-white/10 bg-white/[0.03] overflow-hidden shadow-2xl backdrop-blur-2xl">
                          <div className="flex border-b border-white/10 bg-black/30 overflow-x-auto">
                            {msg.quadResponses.map((qr, tIdx) => (
                              <button
                                key={qr.modelId}
                                onClick={() => setActiveModelTab(tIdx)}
                                className={`px-4 py-2.5 text-xs font-mono font-semibold transition-all border-b-2 flex items-center gap-2 shrink-0 ${
                                  activeModelTab === tIdx
                                    ? 'border-blue-400 text-blue-200 bg-white/[0.04]'
                                    : 'border-transparent text-slate-400 hover:text-slate-200'
                                }`}
                              >
                                <span>{qr.name}</span>
                                <span className="text-[10px] text-slate-500">({qr.scores.compositeScore}/100)</span>
                              </button>
                            ))}
                          </div>

                          {msg.quadResponses[activeModelTab] && (
                            <div className="p-4 space-y-4">
                              <div className="text-xs font-mono text-slate-200 leading-relaxed whitespace-pre-wrap">
                                {msg.quadResponses[activeModelTab].content}
                              </div>
                              <FiveAxisMatrix
                                score={msg.quadResponses[activeModelTab].scores}
                                modelName={msg.quadResponses[activeModelTab].name}
                                modelBadge={msg.quadResponses[activeModelTab].badge}
                                interactive={true}
                              />
                            </div>
                          )}
                        </div>
                      )}

                      {/* 5-Axis Epistemic Arbiter Consolidated Verdict */}
                      {msg.epistemicArbiterVerdict && (
                        <div className="p-4 rounded-3xl bg-gradient-to-r from-blue-950/30 to-purple-950/30 border border-blue-400/30 shadow-xl backdrop-blur-2xl space-y-2">
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-bold text-amber-300 flex items-center gap-2">
                              <Crown className="w-4 h-4 text-amber-400" />
                              5-Axis Epistemic Arbiter Consensus: Winner [{msg.epistemicArbiterVerdict.winnerModelName}]
                            </span>
                            <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px]">
                              GOVERNOR INVARIANT APPROVED
                            </span>
                          </div>

                          <p className="text-xs text-slate-200 leading-relaxed font-sans">
                            {msg.epistemicArbiterVerdict.consensusSummary}
                          </p>

                          <div className="text-[11px] text-slate-400 font-mono pt-1 border-t border-white/10">
                            <strong>5-Axis Proof</strong>: {msg.epistemicArbiterVerdict.axisBreakdown}
                          </div>
                        </div>
                      )}

                    </div>
                  ) : (
                    /* Standard Single / Orchestrator Message Bubble */
                    <div className="p-4 rounded-3xl bg-white/[0.04] text-slate-200 border border-white/10 rounded-tl-none shadow-xl backdrop-blur-2xl space-y-3 font-mono">
                      <div className="text-xs sm:text-sm whitespace-pre-wrap leading-relaxed">
                        {msg.content}
                      </div>

                      {/* Grading Matrix if attached */}
                      {msg.grading && (
                        <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-400">
                          <span className="text-emerald-400 flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Invariant Verified Safe
                          </span>
                          <span className="text-blue-400 font-bold">Grade: {msg.grading.accuracyScore}/5</span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Swarm Deployment Suggestion Trigger */}
                  {msg.suggestedSwarm && (
                    <div className="p-3.5 rounded-2xl bg-black/30 border border-white/10 flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-2 text-xs">
                        <Sparkles className="w-4 h-4 text-blue-400" />
                        <span className="font-bold text-slate-200">
                          Ready to deploy {msg.suggestedSwarm.agentCount}-agent Swarm on this task?
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            onDeploySwarm(
                              messages[index - 1]?.content || 'Execute Mission Objective',
                              msg.suggestedSwarm!.mode,
                              msg.suggestedSwarm!.agentCount
                            )
                          }
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl text-xs font-bold shadow-md border border-blue-400/30 transition-all active:scale-95"
                        >
                          <Play className="w-3.5 h-3.5" />
                          <span>Deploy {msg.suggestedSwarm.agentCount} Agents (L3)</span>
                        </button>
                      </div>
                    </div>
                  )}

                </div>
              )}

            </div>
          ))
        )}

        {isLoading && (
          <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center gap-3 text-xs font-mono text-slate-300 shadow-xl backdrop-blur-xl">
            <RefreshCw className="w-4 h-4 text-blue-400 animate-spin shrink-0" />
            <div className="space-y-0.5">
              <div className="font-semibold text-slate-100">
                {isQuadBroadcast 
                  ? 'Broadcasting to all 4 models & synthesizing 5-Axis Grading Matrix...' 
                  : `Synthesizing reasoning with ${selectedModel}...`}
              </div>
              <div className="text-[10px] text-slate-400">
                Evaluating chain-of-thought, zero-loss invariant bounds & Shannon entropy...
              </div>
            </div>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* ========================================================================= */}
      {/* BOTTOM CHAT CONSOLE: SPACIOUS, PROMINENT, LEVEL-9 WORKSPACE INPUT AREA     */}
      {/* ========================================================================= */}
      <div className="shrink-0 p-4 md:p-5 bg-slate-900/50 border-t border-white/10 backdrop-blur-2xl">
        <form onSubmit={handleSubmit} className="max-w-5xl mx-auto space-y-2.5">
          
          {/* Main Rounded Input Frame */}
          <div className="flex flex-col bg-slate-950/70 border border-white/15 focus-within:border-blue-400/60 focus-within:ring-2 focus-within:ring-blue-500/20 rounded-3xl p-3 md:p-4 shadow-2xl backdrop-blur-2xl transition-all">
            
            {/* Multiline Textarea with Full Visibility */}
            <textarea
              ref={textareaRef}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder='Talk to the orchestration or 5-Axis matrix: "Set up a Monte Carlo of 20 agents for this task..." (Shift+Enter for newline)'
              rows={3}
              className="w-full bg-transparent text-slate-100 placeholder-slate-500 text-xs sm:text-sm font-mono outline-none resize-none px-1 leading-relaxed min-h-[70px]"
              disabled={isLoading}
            />

            {/* Bottom Action Tray */}
            <div className="flex flex-wrap items-center justify-between pt-2.5 border-t border-white/10 mt-2 gap-2 text-xs font-mono">
              
              {/* Left Utilities: Google Drive, Attach, Broadcast Mode */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={onOpenGoogleDrive}
                  className="px-2.5 py-1.5 text-slate-300 hover:text-blue-400 hover:bg-white/[0.06] rounded-xl border border-white/10 transition-colors flex items-center gap-1.5 text-[11px]"
                  title="Import files from Google Drive"
                >
                  <HardDrive className="w-3.5 h-3.5 text-blue-400" />
                  <span className="hidden sm:inline">Google Drive</span>
                </button>

                <button
                  type="button"
                  onClick={onOpenFileUpload}
                  className="px-2.5 py-1.5 text-slate-300 hover:text-purple-400 hover:bg-white/[0.06] rounded-xl border border-white/10 transition-colors flex items-center gap-1.5 text-[11px]"
                  title="Attach file or dataset for 16-way slice extraction"
                >
                  <Upload className="w-3.5 h-3.5 text-purple-400" />
                  <span className="hidden sm:inline">Attach</span>
                  {files.length > 0 && (
                    <span className="w-4 h-4 rounded-full bg-purple-500 text-slate-950 text-[9px] flex items-center justify-center font-bold">
                      {files.length}
                    </span>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setIsQuadBroadcast(!isQuadBroadcast)}
                  className={`px-2.5 py-1.5 rounded-xl border transition-all flex items-center gap-1 text-[11px] font-bold ${
                    isQuadBroadcast
                      ? 'bg-blue-600/30 text-blue-200 border-blue-400/40'
                      : 'bg-white/[0.04] text-slate-400 border-white/10'
                  }`}
                  title="Broadcast to all 4 models or target single model"
                >
                  <Columns className="w-3.5 h-3.5" />
                  <span>{isQuadBroadcast ? '4 Models' : selectedModel}</span>
                </button>
              </div>

              {/* Right: Character count & Send Button */}
              <div className="flex items-center gap-3">
                <span className="text-[10px] text-slate-500 hidden md:inline">
                  {inputText.length} chars • Enter to Send
                </span>

                <button
                  type="submit"
                  disabled={!inputText.trim() || isLoading}
                  className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 disabled:opacity-30 text-white rounded-2xl text-xs font-bold shadow-lg border border-blue-400/30 transition-all active:scale-95"
                >
                  <span>{isQuadBroadcast ? 'Run 4-Model Arena' : 'Send'}</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>

          </div>

        </form>
      </div>

    </div>
  );
};
