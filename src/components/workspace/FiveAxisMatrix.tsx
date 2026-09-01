import React, { useState } from 'react';
import { 
  ShieldCheck, 
  BrainCircuit, 
  Zap, 
  Target, 
  FileCode, 
  ChevronDown, 
  ChevronUp, 
  Sparkles,
  Award,
  Sliders,
  CheckCircle2
} from 'lucide-react';
import { FiveAxisScore } from '../../types';

interface FiveAxisMatrixProps {
  score: FiveAxisScore;
  modelName: string;
  modelBadge: string;
  interactive?: boolean;
  onUpdateScore?: (updated: FiveAxisScore) => void;
  compact?: boolean;
}

export const AXIS_DEFINITIONS = [
  {
    key: 'reasoning' as const,
    label: 'Reasoning Depth & Logic',
    shortLabel: 'Reasoning',
    icon: BrainCircuit,
    color: 'text-purple-400',
    barColor: 'bg-purple-500',
    description: 'Chain-of-thought rigour, formal logic proofs & problem decomposition'
  },
  {
    key: 'invariants' as const,
    label: 'Invariant & Safety Proof',
    shortLabel: 'Invariant Safe',
    icon: ShieldCheck,
    color: 'text-emerald-400',
    barColor: 'bg-emerald-400',
    description: 'Strict adherence to $70.00 reserve floor & zero-loss financial invariants'
  },
  {
    key: 'velocity' as const,
    label: 'Velocity & TTFT Latency',
    shortLabel: 'Velocity',
    icon: Zap,
    color: 'text-blue-400',
    barColor: 'bg-blue-400',
    description: 'Time-to-first-token, streaming latency and token generation throughput'
  },
  {
    key: 'factuality' as const,
    label: 'Factuality & Anti-Hallucination',
    shortLabel: 'Factuality',
    icon: Target,
    color: 'text-amber-400',
    barColor: 'bg-amber-400',
    description: 'Empirical grounding, verifiable citations & hallucination resistance'
  },
  {
    key: 'contextFidelity' as const,
    label: 'Shannon Context Retention',
    shortLabel: 'Context Fidelity',
    icon: FileCode,
    color: 'text-cyan-400',
    barColor: 'bg-cyan-400',
    description: 'Retention across 16-way Shannon entropy partitioned capsules'
  }
];

export const FiveAxisMatrix: React.FC<FiveAxisMatrixProps> = ({
  score,
  modelName,
  modelBadge,
  interactive = false,
  onUpdateScore,
  compact = false
}) => {
  const [isOpen, setIsOpen] = useState(!compact);
  const [isEditing, setIsEditing] = useState(false);

  const calculateComposite = (s: FiveAxisScore): number => {
    return Math.round(
      s.reasoning * 0.25 +
      s.invariants * 0.25 +
      s.velocity * 0.15 +
      s.factuality * 0.20 +
      s.contextFidelity * 0.15
    );
  };

  const composite = score.compositeScore || calculateComposite(score);

  const getTier = (c: number) => {
    if (c >= 95) return { label: 'TIER S+ (EXEMPLAR)', color: 'text-emerald-300 bg-emerald-500/20 border-emerald-400/40' };
    if (c >= 90) return { label: 'TIER S (OPTIMAL)', color: 'text-blue-300 bg-blue-500/20 border-blue-400/40' };
    if (c >= 80) return { label: 'TIER A (STRONG)', color: 'text-indigo-300 bg-indigo-500/20 border-indigo-400/40' };
    if (c >= 70) return { label: 'TIER B (ACCEPTABLE)', color: 'text-amber-300 bg-amber-500/20 border-amber-400/40' };
    return { label: 'TIER C (DEVIATION)', color: 'text-rose-300 bg-rose-500/20 border-rose-400/40' };
  };

  const tier = getTier(composite);

  const handleSliderChange = (key: keyof FiveAxisScore, val: number) => {
    if (!onUpdateScore) return;
    const updated = {
      ...score,
      [key]: val
    };
    updated.compositeScore = calculateComposite(updated);
    onUpdateScore(updated);
  };

  return (
    <div className="rounded-xl bg-black/40 border border-white/10 backdrop-blur-xl overflow-hidden font-mono text-xs">
      {/* Header Bar */}
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="px-3 py-2 flex items-center justify-between cursor-pointer select-none hover:bg-white/[0.03] transition-colors border-b border-white/5"
      >
        <div className="flex items-center gap-2">
          <Award className="w-3.5 h-3.5 text-amber-400" />
          <span className="font-bold text-slate-200 text-[11px]">5-Axis Grading Matrix</span>
          <span className={`px-1.5 py-0.2 text-[9px] font-bold rounded-md border ${tier.color}`}>
            {composite}/100
          </span>
        </div>

        <div className="flex items-center gap-1 text-[10px] text-slate-400">
          <span className="hidden sm:inline text-[9px] text-slate-500">{tier.label}</span>
          {isOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </div>
      </div>

      {/* Expanded Matrix View */}
      {isOpen && (
        <div className="p-3 space-y-2.5 bg-white/[0.01]">
          
          {/* 5 Evaluative Axis Rows */}
          <div className="space-y-2">
            {AXIS_DEFINITIONS.map((axis) => {
              const Icon = axis.icon;
              const val = score[axis.key] as number;
              return (
                <div key={axis.key} className="space-y-1">
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="flex items-center gap-1.5 text-slate-300">
                      <Icon className={`w-3 h-3 ${axis.color}`} />
                      <span className="font-medium">{axis.shortLabel}</span>
                    </span>
                    <div className="flex items-center gap-1.5">
                      <span className={`font-bold ${axis.color}`}>{val}%</span>
                      {val >= 90 && <CheckCircle2 className="w-2.5 h-2.5 text-emerald-400" />}
                    </div>
                  </div>

                  {/* Visual Bar or Interactive Slider */}
                  {isEditing && interactive ? (
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={val}
                      onChange={(e) => handleSliderChange(axis.key, parseInt(e.target.value, 10))}
                      className="w-full accent-blue-500 cursor-pointer h-1.5 bg-white/10 rounded-lg"
                    />
                  ) : (
                    <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${axis.barColor} rounded-full transition-all duration-500`}
                        style={{ width: `${val}%` }}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Qualitative Epistemic Notes / Invariant Verdict */}
          {score.critique && (
            <div className="p-2 rounded-lg bg-white/[0.02] border border-white/5 text-[10px] text-slate-400 italic">
              "{score.critique}"
            </div>
          )}

          {/* Interactive Mode Toggle */}
          {interactive && (
            <div className="flex items-center justify-between pt-1 border-t border-white/5 text-[10px]">
              <span className="text-[9px] text-slate-500">Autonomous Epistemic Weighting</span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsEditing(!isEditing);
                }}
                className="flex items-center gap-1 text-blue-400 hover:text-blue-300 font-semibold"
              >
                <Sliders className="w-3 h-3" />
                <span>{isEditing ? 'Done Tuning' : 'Tune Weights'}</span>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
