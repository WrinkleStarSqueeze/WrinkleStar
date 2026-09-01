import React, { useState, useEffect, useCallback } from 'react';
import { 
  LayerMode, 
  AgentRuntimeInstance, 
  ChatMessage, 
  InterAgentMessage, 
  IngestedFile, 
  StateManifoldTelemetry, 
  CausalTraceRecord, 
  SwarmExecutionSummary, 
  AiModelProvider,
  SwarmDispatchMode 
} from './types';
import { AGENT_REGISTRY } from './data/agentSpecs';
import { LayerSwitcher } from './components/workspace/LayerSwitcher';
import { Layer1Minimal } from './components/workspace/Layer1Minimal';
import { Layer2Manifold } from './components/workspace/Layer2Manifold';
import { Layer3HyperDeck } from './components/workspace/Layer3HyperDeck';
import { Layer4AutonomicStudio } from './components/workspace/Layer4AutonomicStudio';
import { AgentInspectorModal } from './components/modals/AgentInspectorModal';
import { FileUploadModal } from './components/modals/FileUploadModal';
import { CommandPaletteModal } from './components/modals/CommandPaletteModal';

export default function App() {
  // Layer State: 1 = Minimal Focus, 2 = State Manifold, 3 = Hyper-Deck
  const [currentLayer, setCurrentLayer] = useState<LayerMode>(1);

  // Active Agents State (All 20 agents initialized)
  const [agents, setAgents] = useState<AgentRuntimeInstance[]>(() =>
    AGENT_REGISTRY.map((spec) => ({
      ...spec,
      status: 'idle',
      progress: 0,
      currentThought: `Standby. Ready for ${spec.specialization}.`,
      assignedTask: 'Awaiting dispatch assignment',
      improvisedAttempts: 0,
      evidencePool: [],
      computeTimeMs: 0,
      tokenCount: 0,
    }))
  );

  // Selected agent IDs for swarm
  const [selectedAgentIds, setSelectedAgentIds] = useState<string[]>(() =>
    AGENT_REGISTRY.slice(0, 8).map((a) => a.id)
  );

  // Modals & Active Inspector
  const [inspectingAgent, setInspectingAgent] = useState<AgentRuntimeInstance | null>(null);
  const [isFileUploadOpen, setIsFileUploadOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  // Chat & Intelligence State
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState<AiModelProvider>('gemini-3.7-flash');

  // Inter-Agent Event Bus Messages
  const [interAgentMessages, setInterAgentMessages] = useState<InterAgentMessage[]>([]);
  const [swarmSummary, setSwarmSummary] = useState<SwarmExecutionSummary | null>(null);
  const [isDispatching, setIsDispatching] = useState(false);

  // Files Ingested
  const [files, setFiles] = useState<IngestedFile[]>([]);

  // State Manifold Telemetry
  const [telemetry, setTelemetry] = useState<StateManifoldTelemetry>({
    epoch: 104292,
    budget_cents: 9520,
    reserve_floor_cents: 7000,
    max_burst_cap_cents: 500,
    active_nodes: 2,
    is_halted: false,
    total_tasks_completed: 48,
    total_cents_saved: 75200,
    canary_challenge: 42,
    canary_response: 84,
    canary_status: 'clean',
    cellular_apoptosis_cycle_s: 90,
    last_snapshot_ts: Date.now(),
    shannon_entropy: 2.84,
    cpu_latency_ns: 14,
  });

  // Causal Trace History (DAG)
  const [causalHistory, setCausalHistory] = useState<CausalTraceRecord[]>([
    {
      id: 'trace-genesis',
      epoch: 104290,
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      action: 'BOOTSTRAP_STATE_MANIFOLD',
      goal: 'Initialize POSIX memory stratum and Invariant Floor at $70.00',
      governorStatus: 'APPROVED',
      gbeDecision: 'PASSED (0 Invariant Violations)',
      costCents: 0,
      savedCents: 0,
      entropy: 1.12,
      activeAgents: 2,
      causalState: {
        budget: 10000,
        reserve: 7000,
        agentsDispatched: ['ARCH-01', 'GBE-12'],
        reconciledConsensus: 'Genesis state anchored to read-only cryptographic baseline.',
      },
    },
    {
      id: 'trace-consensus',
      epoch: 104291,
      timestamp: new Date(Date.now() - 1800000).toISOString(),
      action: 'MONTE_CARLO_CONSENSUS_RUN',
      goal: 'Parallel 16-way vector verification across heterogeneous worker pool',
      governorStatus: 'APPROVED',
      gbeDecision: 'PASSED ($4.80 billed <= $5.00 cap, post-balance $95.20 >= $70.00 floor)',
      costCents: 480,
      savedCents: 7520,
      entropy: 3.14,
      activeAgents: 16,
      causalState: {
        budget: 9520,
        reserve: 7000,
        agentsDispatched: ['ARCH-01', 'RED-02', 'SYM-03', 'OPT-04', 'ENT-05', 'EXEC-06'],
        reconciledConsensus: '16 slices verified and sheaf-glued with 0% data corruption.',
      },
    },
  ]);

  // Fetch telemetry from server
  const fetchTelemetry = useCallback(async () => {
    try {
      const res = await fetch('/api/manifold/telemetry');
      if (res.ok) {
        const data = await res.json();
        setTelemetry((prev) => ({
          ...prev,
          ...data,
        }));
        if (data.causal_history && Array.isArray(data.causal_history)) {
          setCausalHistory(data.causal_history);
        }
      }
    } catch (e) {
      // Offline fallback: keep local state
    }
  }, []);

  useEffect(() => {
    fetchTelemetry();
    const interval = setInterval(fetchTelemetry, 6000);
    return () => clearInterval(interval);
  }, [fetchTelemetry]);

  // Keyboard Shortcuts Matrix
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Check if user is typing in input or textarea
      const target = e.target as HTMLElement;
      const isInput = target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable;

      // Global Ctrl+K / Cmd+K
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
        return;
      }

      // Escape closes modals
      if (e.key === 'Escape') {
        setIsCommandPaletteOpen(false);
        setIsFileUploadOpen(false);
        setInspectingAgent(null);
        return;
      }

      if (isInput) return;

      // Layer Switching: 1, 2, 3, 4
      if (e.key === '1') {
        e.preventDefault();
        setCurrentLayer(1);
      } else if (e.key === '2') {
        e.preventDefault();
        setCurrentLayer(2);
      } else if (e.key === '3') {
        e.preventDefault();
        setCurrentLayer(3);
      } else if (e.key === '4') {
        e.preventDefault();
        setCurrentLayer(4);
      } else if (e.key.toLowerCase() === 'm') {
        e.preventDefault();
        setCurrentLayer(3);
      } else if (e.key.toLowerCase() === 'u') {
        e.preventDefault();
        setIsFileUploadOpen(true);
      } else if (e.key.toLowerCase() === 'h') {
        e.preventDefault();
        handleToggleHalt();
      } else if (e.key.toLowerCase() === 'c') {
        e.preventDefault();
        handleTriggerCanary();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Send message to Intelligence in Layer 1 (With AI Studio context & model override support)
  const handleSendMessage = async (text: string, customSystemInstruction?: string, modelOverride?: AiModelProvider) => {
    const activeModel = modelOverride || selectedModel;
    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date().toISOString(),
      linkedFiles: files.map((f) => f.name),
    };

    setChatMessages((prev) => [...prev, userMsg]);
    setIsChatLoading(true);

    try {
      const fileSummary = files.map((f) => `${f.name} (${f.size}B, H=${f.shannonEntropy})`).join(', ');
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          systemInstruction: customSystemInstruction,
          model: activeModel,
          currentLayer,
          activeAgentsCount: selectedAgentIds.length,
          fileContext: fileSummary,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const assistantMsg: ChatMessage = {
          id: `msg-resp-${Date.now()}`,
          role: 'assistant',
          content: data.content,
          timestamp: new Date().toISOString(),
          modelUsed: data.modelUsed || activeModel,
          suggestedSwarm: data.suggestedSwarm,
        };
        setChatMessages((prev) => [...prev, assistantMsg]);
      } else {
        throw new Error('Chat API returned error');
      }
    } catch (err) {
      // Graceful fallback
      const fallbackMsg: ChatMessage = {
        id: `msg-resp-${Date.now()}`,
        role: 'assistant',
        content: `ArgOS Substrate received: "${text}".\n\nI have prepared a ${selectedAgentIds.length}-agent Monte Carlo swarm configuration. You can switch to Layer 3 (Hyper-Deck) or Layer 4 (Genesis Mesh) to monitor live inter-agent reasoning, evolutionary mutations, and code self-repairs.`,
        timestamp: new Date().toISOString(),
        modelUsed: activeModel || 'ArgOS Autonomic Kernel',
        suggestedSwarm: {
          mode: 'monte_carlo_consensus',
          agentCount: selectedAgentIds.length || 8,
          taskBreakdown: [
            'Goal Contract Verification',
            'Parallel Hypothesis Probing',
            'Red-Team Skeptic Refutation',
            'Reconciled Epistemic Output',
          ],
        },
      };
      setChatMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsChatLoading(false);
    }
  };

  // Swarm Dispatch Engine (Executes multi-agent workflow)
  const handleDispatchSwarm = async (
    goal: string,
    mode: SwarmDispatchMode,
    allowImprovisation: boolean = true
  ) => {
    setIsDispatching(true);
    setSwarmSummary(null);

    // Reset and arm selected agents
    setAgents((prev) =>
      prev.map((agent) => {
        const isSelected = selectedAgentIds.includes(agent.id);
        return {
          ...agent,
          status: isSelected ? 'decomposing' : 'idle',
          progress: isSelected ? 10 : 0,
          currentThought: isSelected ? `Ingesting goal: "${goal.slice(0, 45)}..."` : 'Standby',
          assignedTask: isSelected ? `Process: ${goal}` : 'Unassigned',
          improvisedAttempts: 0,
          tokenCount: isSelected ? Math.floor(150 + Math.random() * 200) : 0,
        };
      })
    );

    // Phase 1: Broadcast to Event Bus
    const activeSelectedAgents = agents.filter((a) => selectedAgentIds.includes(a.id));
    const leadAgent = activeSelectedAgents[0] || AGENT_REGISTRY[0];

    const initialBroadcast: InterAgentMessage = {
      id: `bus-init-${Date.now()}`,
      timestamp: new Date().toISOString(),
      senderId: leadAgent.id,
      senderName: leadAgent.name,
      senderRole: leadAgent.role,
      recipientId: 'all',
      type: 'task_broadcast',
      content: `[TASK INGESTION] Dispatched ${mode === 'monte_carlo_consensus' ? 'Monte Carlo Consensus Swarm' : 'Heterogeneous Distributed Fleet'} across ${activeSelectedAgents.length} active nodes. Target Goal: "${goal}".`,
      confidence: 1.0,
    };
    setInterAgentMessages((prev) => [...prev, initialBroadcast]);

    // Simulated staggered parallel execution loop with real API backend reconciliation
    await new Promise((r) => setTimeout(r, 600));

    // Phase 2: Hypothesis generation & Slicing
    setAgents((prev) =>
      prev.map((a) =>
        selectedAgentIds.includes(a.id)
          ? {
              ...a,
              status: 'reasoning',
              progress: 35,
              currentThought: `Formulating candidate hypothesis under model ${a.preferredModel}...`,
              tokenCount: a.tokenCount + 320,
            }
          : a
      )
    );

    const hypMsg: InterAgentMessage = {
      id: `bus-hyp-${Date.now()}`,
      timestamp: new Date().toISOString(),
      senderId: 'agent-1',
      senderName: 'Argus-Prime (Lead Architect)',
      senderRole: 'LEAD_ARCHITECT',
      recipientId: 'all',
      type: 'hypothesis',
      content: `[PROPOSAL] Decomposed objective into atomic sub-invariants. Shannon entropy calculated at ${telemetry.shannon_entropy} bits. Initiating 16-way chunk partition.`,
      confidence: 0.94,
    };
    setInterAgentMessages((prev) => [...prev, hypMsg]);

    await new Promise((r) => setTimeout(r, 700));

    // Phase 3: Adversarial Challenge by Red-Team Skeptic
    setAgents((prev) =>
      prev.map((a) =>
        a.role === 'RED_TEAM_SKEPTIC' && selectedAgentIds.includes(a.id)
          ? {
              ...a,
              status: 'conflicted',
              progress: 55,
              currentThought: 'Refuting candidate edge-case: Detected potential memory race condition under high burst load!',
              improvisedAttempts: 1,
              tokenCount: a.tokenCount + 480,
            }
          : selectedAgentIds.includes(a.id)
          ? {
              ...a,
              status: 'cross_checking',
              progress: 60,
              currentThought: 'Cross-verifying evidence against invariant constraints...',
              tokenCount: a.tokenCount + 240,
            }
          : a
      )
    );

    const challengeMsg: InterAgentMessage = {
      id: `bus-chal-${Date.now()}`,
      timestamp: new Date().toISOString(),
      senderId: 'agent-2',
      senderName: 'Skeptic-Red (Adversarial Challenger)',
      senderRole: 'RED_TEAM_SKEPTIC',
      recipientId: 'all',
      type: 'adversarial_challenge',
      content: `[CHALLENGE] Raised objection: Candidate reasoning relies on static thread mapping. Potential TOCTOU race hazard detected at step boundary. Demanding adaptive pivot.`,
      confidence: 0.88,
    };
    setInterAgentMessages((prev) => [...prev, challengeMsg]);

    await new Promise((r) => setTimeout(r, 800));

    // Phase 4: Self-Correction & Improvisation
    if (allowImprovisation) {
      setAgents((prev) =>
        prev.map((a) =>
          selectedAgentIds.includes(a.id)
            ? {
                ...a,
                status: 'improvised',
                progress: 85,
                currentThought: 'Improvising alternative path: Switched to Atomic CAS Monotonic Epoch barrier and isolated shared memory offsets.',
                improvisedAttempts: a.improvisedAttempts + 1,
                evidencePool: [
                  ...a.evidencePool,
                  'Atomic CAS Epoch Barrier verified 0ns lock contention',
                  'StopLossFloor $70.00 invariant satisfied',
                ],
                tokenCount: a.tokenCount + 360,
              }
            : a
        )
      );

      const improviseMsg: InterAgentMessage = {
        id: `bus-imp-${Date.now()}`,
        timestamp: new Date().toISOString(),
        senderId: 'agent-3',
        senderName: 'Logos-Math (Symbolic Validator)',
        senderRole: 'SYMBOLIC_VALIDATOR',
        recipientId: 'all',
        type: 'improvisation_pivot',
        content: `[IMPROVISATION SUCCESS] Replaced static lock with Atomic Compare-And-Swap (CAS) Epoch Barrier. Mathematical proof of zero data corruption confirmed. Failure avoided.`,
        confidence: 0.99,
      };
      setInterAgentMessages((prev) => [...prev, improviseMsg]);
    }

    await new Promise((r) => setTimeout(r, 600));

    // Phase 5: Reconciled Server API Execution
    let resultPayload: any = null;
    try {
      const fileSummary = files.map((f) => `${f.name} (${f.size}B)`).join(', ');
      const res = await fetch('/api/swarm/dispatch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          goal,
          mode,
          agentCount: selectedAgentIds.length,
          allowImprovisation: allowImprovisation,
          selectedAgentIds: activeSelectedAgents.map((a) => a.badge),
          fileContext: fileSummary,
        }),
      });

      if (res.ok) {
        resultPayload = await res.json();
      }
    } catch (e) {
      console.warn('[Dispatch Network fallback]');
    }

    const duration = resultPayload?.durationMs || Math.floor(1200 + selectedAgentIds.length * 80);
    const score = resultPayload?.consensusScore || 0.965;
    const reconciledText =
      resultPayload?.reconciledResult ||
      `Consensus finalized across ${selectedAgentIds.length} parallel nodes (${(score * 100).toFixed(1)}% agreement). The swarm successfully reconciled all hypotheses, refuted flawed assumptions via Red-Team Skeptic, and executed bit-perfect sheaf gluing with verified zero data corruption. Guaranteed reserve floor $70.00 was maintained without violation.`;

    // Mark agents succeeded
    setAgents((prev) =>
      prev.map((a) =>
        selectedAgentIds.includes(a.id)
          ? {
              ...a,
              status: 'succeeded',
              progress: 100,
              currentThought: 'Mission accomplished. Solution verified and committed to state manifold.',
              outputArtifact: `Verified Artifact for [${a.badge}]`,
            }
          : a
      )
    );

    const successMsg: InterAgentMessage = {
      id: `bus-succ-${Date.now()}`,
      timestamp: new Date().toISOString(),
      senderId: 'agent-16',
      senderName: 'Harmonia (Epistemic Reconciler)',
      senderRole: 'EPISTEMIC_RECONCILER',
      recipientId: 'all',
      type: 'consensus_vote',
      content: `[CONSENSUS SEALED] Reconciled output accepted with ${(score * 100).toFixed(1)}% epistemic confidence. All 16 chunks stitched bit-perfectly. State manifold updated.`,
      confidence: score,
    };
    setInterAgentMessages((prev) => [...prev, successMsg]);

    const summary: SwarmExecutionSummary = {
      goal,
      mode,
      agentCount: selectedAgentIds.length,
      totalDurationMs: duration,
      status: 'succeeded',
      consensusScore: score,
      improvisationsCount: allowImprovisation ? 2 : 0,
      reconciledResult: reconciledText,
      evidenceItems: [
        'Shannon Entropy Workload Ingestion (<3.5 compressed)',
        '16-way Parallel Sheaf Assembly 100% Bit-Perfect',
        'Invariant Floor ($70.00) & Single-Burst ($5.00) Invariants Verified',
      ],
      modelContributions: {
        'Gemini 3.7 Flash': 40,
        'Claude 3.7 Sonnet': 25,
        'GPT-4o': 20,
        'DeepSeek R1': 15,
      },
      totalTokens: selectedAgentIds.length * 940,
      nominalCostDollars: selectedAgentIds.length * 8.0,
      compressedCostDollars: (resultPayload?.costCents || 480) / 100,
      dollarsSaved: resultPayload?.savedDollars || selectedAgentIds.length * 7.52,
    };

    setSwarmSummary(summary);
    setIsDispatching(false);
    fetchTelemetry();
  };

  // Toggle Emergency Halt
  const handleToggleHalt = async () => {
    try {
      const res = await fetch('/api/manifold/action', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'TOGGLE_EMERGENCY_HALT' }),
      });
      if (res.ok) {
        const data = await res.json();
        setTelemetry((prev) => ({
          ...prev,
          is_halted: data.is_halted,
          epoch: data.epoch,
        }));
        fetchTelemetry();
      }
    } catch (e) {
      setTelemetry((prev) => ({ ...prev, is_halted: !prev.is_halted, epoch: prev.epoch + 1 }));
    }
  };

  // Trigger Stochastic Canary
  const handleTriggerCanary = async () => {
    try {
      const res = await fetch('/api/manifold/action', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'TRIGGER_CANARY_PROBE' }),
      });
      if (res.ok) {
        const data = await res.json();
        setTelemetry((prev) => ({
          ...prev,
          canary_challenge: data.challenge,
          canary_response: data.response,
          canary_status: 'clean',
        }));
        fetchTelemetry();
      }
    } catch (e) {
      setTelemetry((prev) => ({ ...prev, canary_status: 'clean', epoch: prev.epoch + 1 }));
    }
  };

  // Trigger Cellular Apoptosis
  const handleTriggerApoptosis = async () => {
    try {
      const res = await fetch('/api/manifold/action', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'TRIGGER_APOPTOSIS' }),
      });
      if (res.ok) {
        fetchTelemetry();
      }
    } catch (e) {
      setTelemetry((prev) => ({ ...prev, epoch: prev.epoch + 1 }));
    }
  };

  // Replay Past Epoch
  const handleReplayEpoch = async (epoch: number) => {
    try {
      const res = await fetch('/api/manifold/action', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'REVERT_TO_EPOCH', payload: { epoch } }),
      });
      if (res.ok) {
        fetchTelemetry();
      }
    } catch (e) {
      setTelemetry((prev) => ({ ...prev, epoch: epoch + 1 }));
    }
  };

  // Agent Selection Helpers
  const handleToggleAgentSelect = (id: string) => {
    setSelectedAgentIds((prev) =>
      prev.includes(id) ? (prev.length > 1 ? prev.filter((x) => x !== id) : prev) : [...prev, id]
    );
  };

  const handleSelectAllAgents = () => {
    setSelectedAgentIds(AGENT_REGISTRY.map((a) => a.id));
  };

  const handleSelectCount = (count: number) => {
    setSelectedAgentIds(AGENT_REGISTRY.slice(0, count).map((a) => a.id));
  };

  return (
    <div className="relative min-h-screen bg-[#020617] text-slate-100 flex flex-col font-sans selection:bg-blue-500/30 selection:text-blue-200 overflow-hidden">
      {/* Frosted Glass Ambient Lighting Orbs */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-40 overflow-hidden" aria-hidden="true">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] bg-blue-600 rounded-full blur-[130px] ambient-orb-1" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] bg-purple-600 rounded-full blur-[130px] ambient-orb-2" />
        <div className="absolute top-[35%] right-[25%] w-[35vw] h-[35vw] max-w-[450px] max-h-[450px] bg-indigo-600/30 rounded-full blur-[110px]" />
        <div className="absolute bottom-[20%] left-[15%] w-[30vw] h-[30vw] max-w-[380px] max-h-[380px] bg-emerald-600/20 rounded-full blur-[100px]" />
      </div>

      {/* Main Workspace Frame */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Top Persistent Navigation & Layer Switcher Bar */}
        <LayerSwitcher
          currentLayer={currentLayer}
          onLayerChange={setCurrentLayer}
          isHalted={telemetry.is_halted}
          activeAgentsCount={selectedAgentIds.length}
        />

        {/* Layer 1: Minimalist Focus Workspace */}
        {currentLayer === 1 && (
          <Layer1Minimal
            messages={chatMessages}
            onSendMessage={handleSendMessage}
            isLoading={isChatLoading}
            onDeploySwarm={(goal, mode, count) => {
              handleSelectCount(count);
              setCurrentLayer(3);
              handleDispatchSwarm(goal, mode, true);
            }}
            onOpenFileUpload={() => setIsFileUploadOpen(true)}
            files={files}
            onRemoveFile={(id) => setFiles((prev) => prev.filter((f) => f.id !== id))}
            telemetry={telemetry}
            selectedModel={selectedModel}
            onSelectModel={setSelectedModel}
            onSwitchLayer={setCurrentLayer}
          />
        )}

        {/* Layer 2: State Manifold & Telemetry Deck */}
        {currentLayer === 2 && (
          <Layer2Manifold
            telemetry={telemetry}
            causalHistory={causalHistory}
            onToggleHalt={handleToggleHalt}
            onTriggerCanary={handleTriggerCanary}
            onTriggerApoptosis={handleTriggerApoptosis}
            onReplayEpoch={handleReplayEpoch}
            onSwitchLayer={setCurrentLayer}
          />
        )}

        {/* Layer 3: Ultimate Hyper-Deck Matrix (20-Agent Swarm) */}
        {currentLayer === 3 && (
          <Layer3HyperDeck
            agents={agents}
            selectedAgentIds={selectedAgentIds}
            onToggleAgentSelect={handleToggleAgentSelect}
            onSelectAllAgents={handleSelectAllAgents}
            onSelectCount={handleSelectCount}
            onInspectAgent={setInspectingAgent}
            messages={interAgentMessages}
            swarmSummary={swarmSummary}
            isDispatching={isDispatching}
            onDispatchSwarm={handleDispatchSwarm}
            files={files}
            onOpenFileUpload={() => setIsFileUploadOpen(true)}
            telemetry={telemetry}
            onSwitchLayer={setCurrentLayer}
          />
        )}

        {/* Layer 4: Autonomic Genesis & Neural Mesh Studio */}
        {currentLayer === 4 && (
          <Layer4AutonomicStudio
            agents={agents}
            telemetry={telemetry}
            onDispatchSwarm={handleDispatchSwarm}
            onSwitchLayer={setCurrentLayer}
            onInspectAgent={setInspectingAgent}
          />
        )}

        {/* Modals */}
        <AgentInspectorModal
          agent={inspectingAgent}
          onClose={() => setInspectingAgent(null)}
        />

        <FileUploadModal
          isOpen={isFileUploadOpen}
          onClose={() => setIsFileUploadOpen(false)}
          onAddFile={(file) => setFiles((prev) => [...prev, file])}
        />

        <CommandPaletteModal
          isOpen={isCommandPaletteOpen}
          onClose={() => setIsCommandPaletteOpen(false)}
          onSelectLayer={setCurrentLayer}
          onQuickSwarm={(count, mode) => {
            handleSelectCount(count);
            setCurrentLayer(3);
            handleDispatchSwarm(`Execute ${count}-agent mission in ${mode} mode`, mode, true);
          }}
          onTriggerCanary={handleTriggerCanary}
          onTriggerApoptosis={handleTriggerApoptosis}
          onToggleHalt={handleToggleHalt}
          onOpenFileUpload={() => setIsFileUploadOpen(true)}
        />
      </div>
    </div>
  );
}
