import { AgentSpec } from '../types';

export const AGENT_REGISTRY: AgentSpec[] = [
  {
    id: 'agent-1',
    name: 'Argus-Prime (Lead Architect)',
    role: 'LEAD_ARCHITECT',
    description: 'Decomposes complex human intent into auditable DAGs, coordinates multi-intelligence pipeline.',
    preferredModel: 'gemini-3.7-flash',
    temperature: 0.2,
    color: '#06b6d4', // cyan-500
    badge: 'ARCH-01',
    specialization: 'System Decomposition & DAG Generation'
  },
  {
    id: 'agent-2',
    name: 'Skeptic-Red (Adversarial Challenger)',
    role: 'RED_TEAM_SKEPTIC',
    description: 'Actively refutes and probes assumptions made by worker models before reconciliation.',
    preferredModel: 'claude-3.7-sonnet',
    temperature: 0.7,
    color: '#f43f5e', // rose-500
    badge: 'RED-02',
    specialization: 'Adversarial Cross-Examination & Edge Cases'
  },
  {
    id: 'agent-3',
    name: 'Logos-Math (Symbolic Validator)',
    role: 'SYMBOLIC_VALIDATOR',
    description: 'Enforces deterministic proof of correctness, mathematical parity, and bit-level integrity.',
    preferredModel: 'gemini-3.1-pro-preview',
    temperature: 0.0,
    color: '#8b5cf6', // violet-500
    badge: 'SYM-03',
    specialization: 'Formal Verification & Invariant Proofs'
  },
  {
    id: 'agent-4',
    name: 'Kinetics-Opt (Deterministic Optimizer)',
    role: 'DETERMINISTIC_OPTIMIZER',
    description: 'Prunes redundant compute paths, pre-computes semantic caches, and optimizes execution stride.',
    preferredModel: 'deepseek-r1-v3',
    temperature: 0.1,
    color: '#10b981', // emerald-500
    badge: 'OPT-04',
    specialization: 'Graph Pruning & Low-Latency Execution'
  },
  {
    id: 'agent-5',
    name: 'Shannon-Core (Entropy Slicer)',
    role: 'SHANNON_ENTROPY_COMPRESSOR',
    description: 'Measures data entropy (<3.5), divides heavy workloads into 16 parallel micro-capsules.',
    preferredModel: 'gemini-3.7-flash',
    temperature: 0.2,
    color: '#3b82f6', // blue-500
    badge: 'ENT-05',
    specialization: 'Information Theory & Capsule Slicing'
  },
  {
    id: 'agent-6',
    name: 'POSIX-Runtime (Bare-Metal Executor)',
    role: 'POSIX_EXECUTOR',
    description: 'Interfaces with zero-transport shared memory, robust mutexes, and multi-threaded C-ABI tasks.',
    preferredModel: 'gpt-4o',
    temperature: 0.1,
    color: '#f59e0b', // amber-500
    badge: 'EXEC-06',
    specialization: 'System Calls, IPC Rings & Atomics'
  },
  {
    id: 'agent-7',
    name: 'Immune-Sentinel (Apoptosis Overseer)',
    role: 'SECURITY_IMMUNE_SENTINEL',
    description: 'Monitors memory corruption, manages 90-second cellular apoptosis, and purges stale nodes.',
    preferredModel: 'claude-3.7-sonnet',
    temperature: 0.3,
    color: '#ec4899', // pink-500
    badge: 'IMM-07',
    specialization: 'Autonomous Self-Healing & Anomaly Defense'
  },
  {
    id: 'agent-8',
    name: 'Chronos-DAG (Causal Reconstructor)',
    role: 'CAUSAL_TIME_RECONSTRUCTOR',
    description: 'Tracks state transitions (S_t+1 = S_t ⊔ ΔS), enabling instant zero-copy time-travel playback.',
    preferredModel: 'gemini-3.1-pro-preview',
    temperature: 0.2,
    color: '#6366f1', // indigo-500
    badge: 'CHRON-08',
    specialization: 'Causal History & What-If Replay'
  },
  {
    id: 'agent-9',
    name: 'Veritas-Audit (Forensic Verifier)',
    role: 'EVIDENCE_FORENSIC_AUDITOR',
    description: 'Inspects citations, validates external knowledge inputs, strips prompt-injection markers.',
    preferredModel: 'gpt-4o',
    temperature: 0.2,
    color: '#14b8a6', // teal-500
    badge: 'AUD-09',
    specialization: 'Data Sanitization & Regulatory Audit'
  },
  {
    id: 'agent-10',
    name: 'Decomp-Master (Task Slicer)',
    role: 'TASK_DECOMPOSITION_ENGINE',
    description: 'Breaks large prompts and uploaded document assets into modular sub-tasks with strict I/O bounds.',
    preferredModel: 'deepseek-r1-v3',
    temperature: 0.3,
    color: '#eab308', // yellow-500
    badge: 'DEC-10',
    specialization: 'Hierarchical Task Partitioning'
  },
  {
    id: 'agent-11',
    name: 'Synthetica (Data Integrator)',
    role: 'DATA_SYNTHESIZER',
    description: 'Extracts tabular, textual, and programmatic insights into unified structured payloads.',
    preferredModel: 'gemini-3.7-flash',
    temperature: 0.4,
    color: '#a855f7', // purple-500
    badge: 'SYN-11',
    specialization: 'Multimodal Synthesis & Formatting'
  },
  {
    id: 'agent-12',
    name: 'Governor-Gate (Invariant Enforcer)',
    role: 'GOVERNANCE_INVARIANT_GATE',
    description: 'Guarantees StopLossFloor ($70.00) and MaxBurstCap ($5.00) at the atomic memory layer.',
    preferredModel: 'gemini-3.1-pro-preview',
    temperature: 0.0,
    color: '#ef4444', // red-500
    badge: 'GBE-12',
    specialization: 'Financial Invariants & Zero-Loss Bounds'
  },
  {
    id: 'agent-13',
    name: 'Canary-Probe (Trapdoor Verifier)',
    role: 'STOCHASTIC_CANARY_PROBER',
    description: 'Silently injects mathematical trapdoor tasks into the pipeline to detect stealth manipulation.',
    preferredModel: 'claude-3.7-sonnet',
    temperature: 0.2,
    color: '#84cc16', // lime-500
    badge: 'CAN-13',
    specialization: 'Stochastic Attestation & Silent Probes'
  },
  {
    id: 'agent-14',
    name: 'Phoenix-Reboot (Node Regenerator)',
    role: 'CELLULAR_APOPTOSIS_REBOOTER',
    description: 'Rebirths worker processes from immutable signed genesis ROM images upon integrity triggers.',
    preferredModel: 'gpt-4o',
    temperature: 0.1,
    color: '#f97316', // orange-500
    badge: 'PHX-14',
    specialization: 'Zero-Downtime Process Rebirth'
  },
  {
    id: 'agent-15',
    name: 'Sheaf-Glue (Output Reassembler)',
    role: 'SHEAF_GLUING_OPERATOR',
    description: 'Stitches 16 concurrent chunk worker outputs into unified bit-perfect responses.',
    preferredModel: 'gemini-3.7-flash',
    temperature: 0.1,
    color: '#0284c7', // lightBlue-600
    badge: 'SHF-15',
    specialization: 'Sheaf Theory & Concatenation'
  },
  {
    id: 'agent-16',
    name: 'Harmonia (Epistemic Reconciler)',
    role: 'EPISTEMIC_RECONCILER',
    description: 'Reconciles conflicting multi-model claims, identifies factual vs interpretive discrepancies.',
    preferredModel: 'claude-3.7-sonnet',
    temperature: 0.3,
    color: '#d946ef', // fuchsia-500
    badge: 'REC-16',
    specialization: 'Multi-Model Consensus & Compromise'
  },
  {
    id: 'agent-17',
    name: 'Atlas-Index (Experience Registry)',
    role: 'EXPERIENCE_REGISTRY_INDEXER',
    description: 'Persists lessons learned, task outcomes, and failure root causes to long-term memory.',
    preferredModel: 'deepseek-r1-v3',
    temperature: 0.2,
    color: '#059669', // emerald-600
    badge: 'ATL-17',
    specialization: 'Cognitive Memory & Experience LEO'
  },
  {
    id: 'agent-18',
    name: 'Axiom-Witness (Zero-Knowledge Verifier)',
    role: 'ZERO_KNOWLEDGE_WITNESS',
    description: 'Generates and verifies cryptographic zk-SNARK compute proofs across untrusted nodes.',
    preferredModel: 'gemini-3.1-pro-preview',
    temperature: 0.0,
    color: '#4f46e5', // indigo-600
    badge: 'ZKW-18',
    specialization: 'ZK-Proof-of-Compute & Attestation'
  },
  {
    id: 'agent-19',
    name: 'Thermo-Pacer (Hardware Balancer)',
    role: 'THERMODYNAMIC_PACER',
    description: 'Throttles or accelerates chunking rates based on hardware temperature and carbon intensity.',
    preferredModel: 'gpt-4o',
    temperature: 0.1,
    color: '#0d9488', // teal-600
    badge: 'THM-19',
    specialization: 'Thermal Invariants & Green Compute'
  },
  {
    id: 'agent-20',
    name: 'Functor-Lens (Immortal Schema Adapter)',
    role: 'IMMORTAL_FUNCTOR_LENS',
    description: 'Applies category-theoretic lenses to guarantee backwards/forwards API schema compatibility.',
    preferredModel: 'claude-3.7-sonnet',
    temperature: 0.1,
    color: '#7c3aed', // violet-600
    badge: 'FNC-20',
    specialization: 'Categorical Functors & Schema Longevity'
  }
];
