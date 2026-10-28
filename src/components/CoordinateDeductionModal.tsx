/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * STAGE 2 — COORDINATE CIPHER DECRYPTION TERMINAL
 * 
 * Validates the decoded camera telemetry coordinates (CG.GHHGD, -LB.DEG I)
 * and the deduced residence House 3893.
 */

import React, { useState } from 'react';
import { Compass, Key, Lock, Terminal, X } from 'lucide-react';
import { tacticalAudio } from '@/src/lib/tacticalAudio';
import { calculateStageScore } from '@/src/lib/stageConfig';
import type { UserProgress } from '@/src/lib/prototypeAuth';

interface CoordinateDeductionModalProps {
  isOpen: boolean;
  onClose: () => void;
  progress: UserProgress;
  onUpdateProgress?: (updater: (prev: UserProgress) => UserProgress) => void;
}

export function CoordinateDeductionModal({
  isOpen,
  onClose,
  progress,
  onUpdateProgress,
}: CoordinateDeductionModalProps) {
  const isSolved = progress.stage2DeductionSolved || progress.stagesCompleted >= 2;
  const [inputVal, setInputVal] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [terminalOutput, setTerminalOutput] = useState<string[]>([
    'TELEMETRY DECRYPTION CONSOLE // PORT 02-COORD',
    'EXIF SOURCE: NEGATIVE NEG-74-17 (FILING BAY 17)',
    'ENCODED TELEMETRY STRING: (CG.GHHGD, -LB.DEG I)',
    'STATUS: SECTOR 02 LOCKED — NUMERIC COORDINATES OR RESIDENCE NUMBER REQUIRED',
    'Enter decoded decimal coordinates or deduced street house number.',
  ]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isProcessing) return;

    const trimmed = inputVal.trim();
    if (!trimmed) return;

    setIsProcessing(true);
    setTerminalOutput((prev) => [
      ...prev,
      `> SUBMIT DECRYPTION: "${trimmed}"`,
      '> EXECUTING ALPHABET-TO-NUMBER CONVERSION MATRIX...',
    ]);

    setTimeout(() => {
      // Normalize input: lowercase, strip extra punctuation and whitespace
      const clean = trimmed.toLowerCase().replace(/[\s\(\)°nw,]/g, '');

      // Accepted solutions:
      // 1. House number: 3893 or house3893
      // 2. Decoded coords: 37.78874 / -122.45709
      const isHouseMatch = clean === '3893' || clean === 'house3893';
      const isCoordMatch =
        clean.includes('37.78874') && clean.includes('122.45709');
      const isPartialCoord =
        clean === '37.78874-122.45709' || clean === '37.78874122.45709';

      const isSuccess = isHouseMatch || isCoordMatch || isPartialCoord;

      if (isSuccess) {
        tacticalAudio.playSuccess();
        const nowIso = new Date().toISOString();
        const scoreBreakdown = calculateStageScore(2, nowIso);

        setTerminalOutput((prev) => [
          ...prev,
          '[DECRYPTION VERIFIED] // COORDINATE PARITY CONFIRMED',
          '> LATITUDE RESOLVED:  37.78874° N (C=3, G=7 . G=7, H=8, H=8, G=7, D=4)',
          '> LONGITUDE RESOLVED: -122.45709° W (L=12, B=2 . D=4, E=5, G=7, I=9)',
          '> CARTOGRAPHIC MATCH: HOUSE 3893 (PRESIDIO HEIGHTS)',
          '-------------------------------------------------------',
          `[STAGE 02 CLEARED] MERIT AWARDED: +${scoreBreakdown.totalScore} PTS`,
          scoreBreakdown.scoringEligible
            ? `(100 Base + ${scoreBreakdown.hourlyBonus} Hourly Speed Bonus)`
            : '(Late solve: 0 competitive points awarded)',
          '> NEW DOSSIER ACCESSIBLE: CAS-017 (Witness Testimony)',
          '> NEW DOSSIER ACCESSIBLE: EV-0301 (Coastal Transmission Mast)',
          '> MAP SECURITY GATE INITIALIZED (STAGE 03 READY)',
        ]);

        if (onUpdateProgress) {
          onUpdateProgress((prev) => {
            const nextCompleted = Math.max(prev.stagesCompleted, 2);
            const nextActive = Math.max(prev.activeStage, 3);
            const nextUnlocked = Array.from(
              new Set([...prev.unlockedEvidenceIds, 'CAS-017', 'EV-0301'])
            );
            const nextScores = {
              ...prev.stageScores,
              2: scoreBreakdown.totalScore,
            };
            const totalScore = Object.values(nextScores).reduce((a, b) => a + b, 0);

            return {
              ...prev,
              stage2DeductionSolved: true,
              stagesCompleted: nextCompleted,
              activeStage: nextActive,
              unlockedEvidenceIds: nextUnlocked,
              stageScores: nextScores,
              stageSolveTimestamps: {
                ...prev.stageSolveTimestamps,
                2: nowIso,
              },
              stageScoringEligible: {
                ...prev.stageScoringEligible,
                2: scoreBreakdown.scoringEligible,
              },
              score: totalScore,
              tasksCompleted: prev.tasksCompleted + 1,
              status: 'IN PROGRESS',
            };
          });
        }
      } else {
        tacticalAudio.playError();
        setTerminalOutput((prev) => [
          ...prev,
          '[VALIDATION FAILED] // 422 UNRESOLVED GEOGRAPHIC TARGET',
          'ERROR: Decrypted string does not match archival camera telemetry.',
          'Review the alphabet-to-number substitution key (A=1, B=2, ... I=9, L=12).',
          'Decoded coordinates correspond to a 4-digit residential address.',
        ]);
      }
      setIsProcessing(false);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#070b08] border-2 border-[#1b3b22] text-[#4af66f] font-mono text-xs max-w-2xl w-full p-6 shadow-[0_0_35px_rgba(20,80,30,0.45)] flex flex-col max-h-[90vh]">
        {/* Terminal Header */}
        <div className="flex items-center justify-between border-b border-[#1b3b22] pb-3 mb-4">
          <div className="flex items-center gap-2">
            <Compass size={16} className="text-emerald-400 animate-spin" style={{ animationDuration: '10s' }} />
            <span className="font-bold tracking-widest text-[#7dfba0]">
              COORDINATE CIPHER TERMINAL // GATE_COORD_DEDUCTION
            </span>
          </div>
          <button
            onClick={() => {
              tacticalAudio.playButtonClick();
              onClose();
            }}
            className="text-[#4af66f]/60 hover:text-[#4af66f] p-1"
            aria-label="Exit terminal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Screen Output */}
        <div className="bg-[#040705] border border-[#142d1a] p-4 h-64 overflow-y-auto space-y-1.5 text-[11px] leading-relaxed shadow-inner">
          {terminalOutput.map((line, idx) => (
            <div
              key={idx}
              className={`${
                line.includes('[DECRYPTION VERIFIED]') || line.includes('[STAGE 02 CLEARED]')
                  ? 'text-[#a2ffb8] font-bold'
                  : line.includes('[VALIDATION FAILED]') || line.includes('ERROR')
                  ? 'text-[#ff6b6b]'
                  : 'text-[#4af66f]/90'
              }`}
            >
              {line}
            </div>
          ))}
          {isProcessing && (
            <div className="text-emerald-400 animate-pulse">&gt; VERIFYING TELEMETRY MATRICES...</div>
          )}
        </div>

        {/* Deduction Submission Form */}
        <form onSubmit={handleSubmit} className="mt-4 space-y-3 pt-3 border-t border-[#1b3b22]">
          <div className="p-2.5 bg-[#0a140d] border border-[#18361f] text-[10px] text-[#7dfba0]/80">
            <strong>Forensic Decryption Clue:</strong> Camera negative metadata EXIF reads:{' '}
            <code className="text-[#a2ffb8] font-bold">(CG.GHHGD, -LB.DEG I)</code>.
            Use substitution rule (A=1, B=2 ... I=9, L=12) to deduce the decimal coordinates or the
            corresponding street address house number.
          </div>

          <div>
            <label className="block text-[10px] uppercase text-[#7dfba0] mb-1 font-semibold">
              SUBMIT DECODED COORDINATES OR HOUSE NUMBER:
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={() => tacticalAudio.playKeypress()}
                placeholder="e.g. 37.78874, -122.45709 or House 3893..."
                className="flex-1 bg-[#030604] border border-[#1e4827] text-[#7dfba0] p-2 text-xs focus:outline-none focus:border-emerald-400 font-mono"
                disabled={isProcessing || isSolved}
                autoFocus
              />
              <button
                type="submit"
                disabled={isProcessing || isSolved || !inputVal.trim()}
                className="button bg-[#1b3b22] hover:bg-[#255230] text-[#e3f7e6] border border-[#3e784c] px-4 text-xs font-mono disabled:opacity-50"
              >
                {isProcessing ? 'Decoding...' : isSolved ? 'Verified ✓' : 'Submit Decryption'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
