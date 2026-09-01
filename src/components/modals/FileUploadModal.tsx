import React, { useState, useRef } from 'react';
import { X, Upload, FileText, Binary, CheckCircle2, Sparkles, FileCode, Layers } from 'lucide-react';
import { IngestedFile } from '../../types';

interface FileUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddFile: (file: IngestedFile) => void;
}

export const FileUploadModal: React.FC<FileUploadModalProps> = ({
  isOpen,
  onClose,
  onAddFile,
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState('');
  const [rawText, setRawText] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const calculateEntropy = (str: string): number => {
    if (!str) return 0;
    const freq: Record<string, number> = {};
    for (let i = 0; i < str.length; i++) {
      freq[str[i]] = (freq[str[i]] || 0) + 1;
    }
    let entropy = 0;
    const len = str.length;
    for (const ch in freq) {
      const p = freq[ch] / len;
      entropy -= p * Math.log2(p);
    }
    return Number(entropy.toFixed(3));
  };

  const processContent = (fileName: string, content: string) => {
    const entropy = calculateEntropy(content);
    const nominal = Number(((content.length / 100) * 0.08).toFixed(2));
    const compressed = entropy < 3.8 ? Number(Math.min(nominal * 0.06, 4.80).toFixed(2)) : Number(Math.min(nominal * 0.35, 12.00).toFixed(2));
    const savings = Math.max(0, nominal - compressed);

    const newFile: IngestedFile = {
      id: `file-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      name: fileName,
      size: content.length,
      type: fileName.endsWith('.csv') ? 'text/csv' : fileName.endsWith('.json') ? 'application/json' : 'text/plain',
      content,
      shannonEntropy: entropy,
      chunkCount: 16,
      estimatedCost: nominal,
      compressedCost: compressed,
      savingsDollars: Number(savings.toFixed(2)),
      uploadedAt: new Date().toISOString(),
    };

    onAddFile(newFile);
    onClose();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      processContent(file.name, content || '');
    };
    reader.readAsText(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      processContent(file.name, content || '');
    };
    reader.readAsText(file);
  };

  const sampleDatasets = [
    {
      name: 'ArgOS_Constitutional_Architecture.md',
      content: `# ArgOS Apex Constitution & Invariant Baseline\n\n1. StopLossFloor: Balance(t) >= $70.00 guaranteed at atomic memory layer.\n2. SingleBurstCap: Max $5.00 per individual execution cycle.\n3. 16-way Parallel Sheaf Gluing: All input buffers partitioned into 16 slices.\n4. Stochastic Canary Trapdoor: Random mathematical probes verify zero memory contamination.\n5. Cellular Apoptosis: Rolling 90s node rebirth from signed immutable ROM.`,
    },
    {
      name: 'Monte_Carlo_Market_Arbitrage.csv',
      content: `timestamp,symbol,bid_price,ask_price,order_flow_imbalance,entropy_score\n1725148800000,BTC-USD,96420.50,96421.00,0.84,2.941\n1725148801000,ETH-USD,2745.20,2745.50,-0.42,3.120\n1725148802000,SOL-USD,188.10,188.25,0.91,2.810\n1725148803000,NVDA-US,128.40,128.45,0.73,1.920`,
    },
    {
      name: 'POSIX_Memory_Stratum.c',
      content: `#include <sys/mman.h>\n#include <fcntl.h>\n#include <stdatomic.h>\n\nstruct StateManifold {\n  _Atomic uint64_t epoch;\n  _Atomic uint64_t budget_cents;\n  _Atomic uint64_t reserve_floor_cents;\n  _Atomic uint32_t active_nodes;\n};\n\nint init_manifold() {\n  int fd = shm_open("/argos_manifold_v1", O_CREAT | O_RDWR, 0660);\n  ftruncate(fd, 4096);\n  return fd;\n}`,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in">
      <div className="bg-slate-900/80 border border-white/15 rounded-3xl max-w-xl w-full p-6 space-y-6 shadow-2xl font-mono text-xs text-slate-100 backdrop-blur-2xl">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <Upload className="w-4 h-4 text-blue-400" />
            <h3 className="text-base font-bold font-sans text-slate-100">Ingest Workload Asset</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-100 rounded-xl hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drag & Drop Box */}
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragActive(true);
          }}
          onDragLeave={() => setDragActive(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`p-8 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center text-center space-y-3 cursor-pointer transition-all ${
            dragActive
              ? 'border-blue-400 bg-blue-500/10'
              : 'border-white/15 hover:border-blue-400/50 bg-white/[0.03] hover:bg-white/[0.06]'
          }`}
        >
          <div className="w-12 h-12 rounded-2xl bg-white/[0.06] border border-white/10 flex items-center justify-center text-blue-400 shadow-md">
            <FileText className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <div className="font-bold text-sm text-slate-200">
              Drag & Drop file here, or click to browse
            </div>
            <p className="text-[11px] text-slate-400">
              Supports .ts, .py, .c, .json, .csv, .md, and raw data files.
            </p>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            onChange={handleFileChange}
            className="hidden"
            accept=".txt,.md,.json,.csv,.ts,.tsx,.js,.py,.c,.h"
          />
        </div>

        {/* Sample Datasets */}
        <div className="space-y-2.5">
          <span className="text-slate-400 font-bold uppercase tracking-wider text-[11px] flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            Or Ingest Pre-Structured ArgOS Samples:
          </span>

          <div className="grid grid-cols-1 gap-2">
            {sampleDatasets.map((sample, idx) => (
              <button
                key={idx}
                onClick={() => processContent(sample.name, sample.content)}
                className="flex items-center justify-between p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-blue-400/40 hover:bg-white/[0.08] text-left transition-all group backdrop-blur-md"
              >
                <div className="flex items-center gap-2.5 truncate">
                  <FileCode className="w-4 h-4 text-blue-400 flex-shrink-0" />
                  <span className="text-xs font-semibold text-slate-200 group-hover:text-blue-300 truncate">
                    {sample.name}
                  </span>
                </div>
                <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-white/[0.08] text-slate-300 font-mono flex-shrink-0 border border-white/10">
                  Slice 16 Chunks
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end pt-3 border-t border-white/10">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-white/10 hover:bg-white/15 text-slate-300 rounded-xl text-xs font-mono transition-all border border-white/10"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
