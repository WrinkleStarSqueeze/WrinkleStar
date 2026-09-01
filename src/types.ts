export type LayerMode = 1 | 2 | 3 | 4; // 1: AI Studio Dual-Pane & Telemetry, 2: Deep Manifold & Invariants, 3: 20-Agent Monte Carlo Hyper-Deck, 4: Autonomic Genesis & Neural Mesh

export type AiModelProvider = 
  | 'gemini-3.7-flash'
  | 'gemini-3.1-pro-preview'
  | 'claude-3.7-sonnet'
  | 'gpt-4o'
  | 'deepseek-r1-v3';

export type AgentStatus =
  | 'idle'
  | 'spawning'
  | 'decomposing'
  | 'reasoning'
  | 'cross_checking'
  | 'conflicted'
  | 'reconciling'
  | 'executing'
  | 'improvised'
  | 'succeeded'
  | 'failed'
  | 'quarantined';

export type AgentRoleType =
  | 'LEAD_ARCHITECT'
  | 'RED_TEAM_SKEPTIC'
  | 'SYMBOLIC_VALIDATOR'
  | 'DETERMINISTIC_OPTIMIZER'
  | 'SHANNON_ENTROPY_COMPRESSOR'
  | 'POSIX_EXECUTOR'
  | 'SECURITY_IMMUNE_SENTINEL'
  | 'CAUSAL_TIME_RECONSTRUCTOR'
  | 'EVIDENCE_FORENSIC_AUDITOR'
  | 'TASK_DECOMPOSITION_ENGINE'
  | 'DATA_SYNTHESIZER'
  | 'GOVERNANCE_INVARIANT_GATE'
  | 'STOCHASTIC_CANARY_PROBER'
  | 'CELLULAR_APOPTOSIS_REBOOTER'
  | 'SHEAF_GLUING_OPERATOR'
  | 'EPISTEMIC_RECONCILER'
  | 'EXPERIENCE_REGISTRY_INDEXER'
  | 'ZERO_KNOWLEDGE_WITNESS'
  | 'THERMODYNAMIC_PACER'
  | 'IMMORTAL_FUNCTOR_LENS';

export interface AgentSpec {
  id: string;
  name: string;
  role: AgentRoleType;
  description: string;
  preferredModel: AiModelProvider;
  temperature: number;
  color: string;
  badge: string;
  specialization: string;
}

export interface AgentRuntimeInstance extends AgentSpec {
  status: AgentStatus;
  progress: number; // 0 to 100
  currentThought: string;
  assignedTask: string;
  improvisedAttempts: number;
  lastError?: string;
  outputArtifact?: string;
  evidencePool: string[];
  computeTimeMs: number;
  tokenCount: number;
}

export type SwarmDispatchMode = 'monte_carlo_consensus' | 'heterogeneous_distributed';

export interface SwarmConfig {
  goal: string;
  mode: SwarmDispatchMode;
  agentCount: number; // 1 to 20
  allowImprovisation: boolean;
  maxImproviseRounds: number;
  temperatureVariance: boolean;
  requireInvariantPass: boolean;
  consensusThresholdPct: number; // 50 to 100
  fileIds?: string[];
}

export interface InterAgentMessage {
  id: string;
  timestamp: string;
  senderId: string;
  senderName: string;
  senderRole: AgentRoleType;
  recipientId: string; // 'all' or agentId
  type: 
    | 'task_broadcast'
    | 'hypothesis'
    | 'evidence_submission'
    | 'adversarial_challenge'
    | 'conflict_detected'
    | 'improvisation_pivot'
    | 'consensus_vote'
    | 'execution_success'
    | 'invariant_warning';
  content: string;
  confidence: number; // 0.0 - 1.0
  evidenceSnippet?: string;
}

export interface StateManifoldTelemetry {
  epoch: number;
  budget_cents: number;
  reserve_floor_cents: number;
  max_burst_cap_cents: number;
  active_nodes: number;
  is_halted: boolean;
  total_tasks_completed: number;
  total_cents_saved: number;
  canary_challenge: number;
  canary_response: number;
  canary_status: 'clean' | 'probing' | 'purged';
  cellular_apoptosis_cycle_s: number;
  last_snapshot_ts: number;
  shannon_entropy: number;
  cpu_latency_ns: number;
}

export interface CausalTraceRecord {
  id: string;
  epoch: number;
  timestamp: string;
  action: string;
  goal: string;
  governorStatus: 'APPROVED' | 'INVARIANT_REJECTED' | 'HALTED';
  gbeDecision: string;
  costCents: number;
  savedCents: number;
  entropy: number;
  activeAgents: number;
  causalState: {
    budget: number;
    reserve: number;
    agentsDispatched: string[];
    reconciledConsensus: string;
  };
}

export interface IngestedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  content: string;
  shannonEntropy: number;
  chunkCount: number;
  estimatedCost: number;
  compressedCost: number;
  savingsDollars: number;
  uploadedAt: string;
}

export interface FiveAxisScore {
  reasoning: number; // 0 - 100: Mathematical rigour & chain-of-thought
  invariants: number; // 0 - 100: $70.00 floor & safety constraint compliance
  velocity: number; // 0 - 100: Time-to-first-token & tokens/second
  factuality: number; // 0 - 100: Grounding & anti-hallucination precision
  contextFidelity: number; // 0 - 100: Shannon entropy & context retention
  compositeScore: number; // 0 - 100
  critique?: string;
}

export interface QuadModelResponse {
  modelId: AiModelProvider;
  name: string;
  roleTag: string;
  color: string;
  badge: string;
  content: string;
  latencyMs: number;
  tokensGenerated: number;
  throughputTps: number;
  scores: FiveAxisScore;
  status: 'streaming' | 'completed' | 'idle' | 'error';
  invariantPassed: boolean;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system' | 'orchestrator' | 'arbiter';
  content: string;
  timestamp: string;
  modelUsed?: string;
  suggestedSwarm?: {
    mode: SwarmDispatchMode;
    agentCount: number;
    taskBreakdown: string[];
  };
  linkedFiles?: string[];
  grading?: {
    accuracyScore: number; // 1-5
    factualityChecked: boolean;
    invariantCompliant: boolean;
    notes?: string;
  };
  sideBySideComparison?: {
    modelA: { name: string; content: string; latencyMs: number; tokens: number };
    modelB: { name: string; content: string; latencyMs: number; tokens: number };
  };
  quadResponses?: QuadModelResponse[];
  epistemicArbiterVerdict?: {
    winnerModelId: AiModelProvider;
    winnerModelName: string;
    consensusSummary: string;
    axisBreakdown: string;
    governorApproved: boolean;
  };
}

export interface SwarmExecutionSummary {
  goal: string;
  mode: SwarmDispatchMode;
  agentCount: number;
  totalDurationMs: number;
  status: 'running' | 'succeeded' | 'partial_failure' | 'halted';
  consensusScore: number;
  improvisationsCount: number;
  reconciledResult: string;
  evidenceItems: string[];
  modelContributions: Record<string, number>;
  totalTokens: number;
  nominalCostDollars: number;
  compressedCostDollars: number;
  dollarsSaved: number;
}

// Layer 4 Autonomic Genesis & Neural Mesh Types
export interface GeneticAgentGenome {
  id: string;
  name: string;
  generation: number;
  fitnessScore: number; // 0 - 100
  traits: {
    skepticism: number; // 0.0 - 1.0
    epistemicCuriosity: number;
    entropyTolerance: number;
    temperatureVariance: number;
    invariantStrictness: number;
  };
  strategySignature: string;
  successRate: number;
  mutationsCount: number;
}

export interface CodeEvolutionArtifact {
  id: string;
  title: string;
  language: 'typescript' | 'python' | 'rust';
  code: string;
  previousVersionCode?: string;
  executionLogs: string[];
  testStatus: 'passing' | 'failing' | 'mutating';
  gasCostTokens: number;
  coveragePct: number;
  invariantStatus: 'VERIFIED_SAFE' | 'VIOLATION_DETECTED';
}

export interface MissionPlaybookStep {
  id: string;
  title: string;
  description: string;
  agentRole: AgentRoleType;
  assignedNode: string;
  status: 'pending' | 'active' | 'completed' | 'bypassed';
  durationMs: number;
  outputPayload?: string;
}
