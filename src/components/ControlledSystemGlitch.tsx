/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * CONTROLLED SYSTEM GLITCH COMPONENT (STAGE 6/7)
 * 
 * Multi-phase progressive malfunction simulation:
 * Phase 1: Distortion (chromatic shift, subtle text displacement)
 * Phase 2: Tearing (horizontal line splits, frame jitter)
 * Phase 3: Interference (procedural audio crackle, scanline bursts)
 * Phase 4: Momentary Freeze (simulated interface stall)
 * Phase 5: Corrupted System Message (forensic containment warning)
 * Phase 6: Deliberate Recovery (smooth transition to Director lockdown)
 * 
 * Safety & Accessibility:
 * - Respects prefers-reduced-motion and reducedScareMode (presents static alert)
 * - Safe escape button ("Skip / Recover Interface") to prevent trapped states
 * - Zero intense flashing/strobing or seizure triggers
 */

import React, { useEffect, useState, useCallback, useRef } from 'react';
import { ShieldAlert, AlertTriangle, RefreshCw, XCircle } from 'lucide-react';
import { tacticalAudio } from '../lib/tacticalAudio';

export interface ControlledSystemGlitchProps {
  isActive: boolean;
  reducedScareMode?: boolean;
  onComplete: () => void;
  onDismiss?: () => void;
}

type GlitchPhase =
  | 'idle'
  | 'distortion'
  | 'tearing'
  | 'interference'
  | 'freeze'
  | 'corrupted_message'
  | 'recovery';

export const ControlledSystemGlitch: React.FC<ControlledSystemGlitchProps> = ({
  isActive,
  reducedScareMode = false,
  onComplete,
  onDismiss,
}) => {
  const [phase, setPhase] = useState<GlitchPhase>('idle');
  const [glitchText, setGlitchText] = useState('SYSTEM INTEGRITY OK');
  const [counter, setCounter] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Check prefers-reduced-motion
  const prefersReducedMotion = typeof window !== 'undefined'
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const handleSkipOrRecover = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setPhase('recovery');
    setTimeout(() => {
      setPhase('idle');
      onComplete();
    }, 400);
  }, [onComplete]);

  useEffect(() => {
    if (!isActive) {
      setPhase('idle');
      if (timerRef.current) clearTimeout(timerRef.current);
      return;
    }

    // If reduced scare mode or reduced motion is active, show static message briefly and resolve
    if (reducedScareMode || prefersReducedMotion) {
      setPhase('corrupted_message');
      setGlitchText('TRANSMISSION CORRUPTED: INTERCEPT TERMINAL LOCKED');
      timerRef.current = setTimeout(() => {
        handleSkipOrRecover();
      }, 3500);
      return;
    }

    // Phase 1: Distortion (0ms -> 1200ms)
    setPhase('distortion');
    setGlitchText('PARSING ARCHIVAL STREAM 0x7F21...');
    tacticalAudio.playGlitchHum();

    // Phase 2: Tearing (1200ms -> 2400ms)
    timerRef.current = setTimeout(() => {
      setPhase('tearing');
      setGlitchText('BUFFER OVERFLOW: UNRECOGNIZED PROTOCOL IN DISPATCH');
      tacticalAudio.playGlitchInterference();

      // Phase 3: Interference (2400ms -> 3800ms)
      timerRef.current = setTimeout(() => {
        setPhase('interference');
        setGlitchText('0x17-CR-VALE :: CARRIER FREQUENCY MISMATCH DETECTED');
        tacticalAudio.playGlitchInterference();

        // Phase 4: Momentary Freeze (3800ms -> 5000ms)
        timerRef.current = setTimeout(() => {
          setPhase('freeze');
          setGlitchText('TERMINAL INPUT SUSPENDED: KERNEL EXCEPTION');

          // Phase 5: Corrupted System Message (5000ms -> 7200ms)
          timerRef.current = setTimeout(() => {
            setPhase('corrupted_message');
            setGlitchText('TLS-0017 REPOSITORY COMPROMISED // DIRECTOR OVERRIDE ACTIVE');
            tacticalAudio.playGlitchHum();

            // Phase 6: Recovery (7200ms+)
            timerRef.current = setTimeout(() => {
              setPhase('recovery');
              timerRef.current = setTimeout(() => {
                setPhase('idle');
                onComplete();
              }, 800);
            }, 2400);
          }, 1200);
        }, 1400);
      }, 1400);
    }, 1200);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isActive, reducedScareMode, prefersReducedMotion, handleSkipOrRecover, onComplete]);

  // Subtle cyclic text corruption in phase 2-3
  useEffect(() => {
    if (phase !== 'tearing' && phase !== 'interference') return;
    const interval = setInterval(() => {
      setCounter((c) => c + 1);
    }, 120);
    return () => clearInterval(interval);
  }, [phase]);

  // Keyboard Escape to instantly recover
  useEffect(() => {
    if (!isActive) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleSkipOrRecover();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isActive, handleSkipOrRecover]);

  if (!isActive && phase === 'idle') return null;

  return (
    <div
      role="alert"
      aria-live="assertive"
      className={`fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/90 backdrop-blur-md transition-opacity duration-300 ${
        phase === 'recovery' ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Glitch Scanlines and Screen Tearing Overlays */}
      <div className="absolute inset-0 glitch-scanlines pointer-events-none opacity-40" />
      {phase === 'tearing' && (
        <div className="absolute inset-0 glitch-tear pointer-events-none bg-red-950/10 mix-blend-screen" />
      )}
      {phase === 'interference' && (
        <div className="absolute inset-0 bg-red-950/15 pointer-events-none border-y-2 border-red-500/20" />
      )}

      {/* Main Glitch Terminal Container */}
      <div className="relative max-w-xl w-full bg-[#121110] border border-red-900/60 p-6 shadow-2xl text-center">
        {/* Header telemetry */}
        <div className="flex items-center justify-between border-b border-red-900/40 pb-3 mb-5 font-mono text-[11px] tracking-widest text-red-400/80 uppercase">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
            <span>DISPATCH INTERRUPT // SEQ {counter % 99}</span>
          </div>
          <span>SEC-LVL 4</span>
        </div>

        {/* Status Icon */}
        <div className="flex justify-center mb-4">
          {phase === 'corrupted_message' ? (
            <ShieldAlert className="w-12 h-12 text-red-500 animate-pulse" />
          ) : (
            <AlertTriangle className="w-12 h-12 text-red-400" />
          )}
        </div>

        {/* Phase Header */}
        <h3 className="font-serif text-xl sm:text-2xl text-[#f4efe6] mb-2 tracking-wide">
          {phase === 'corrupted_message'
            ? 'ARCHIVAL TRANSMISSION COMPROMISED'
            : phase === 'freeze'
            ? 'TERMINAL INPUT INTERRUPTED'
            : 'SIGNAL ANOMALY DETECTED'}
        </h3>

        {/* Corrupted Message / Status */}
        <p className="font-mono text-xs sm:text-sm text-red-300/90 tracking-wider mb-6 leading-relaxed glitch-corrupted-text">
          {glitchText}
        </p>

        {/* Diagnostic Data Strip */}
        <div className="bg-[#0c0c0b] border border-stone-800 p-3 mb-6 text-left font-mono text-[10px] text-stone-400 space-y-1">
          <div className="flex justify-between">
            <span>ORIGIN: 0x VALE ARCHIVE REPOSITORY</span>
            <span>STATUS: {phase.toUpperCase()}</span>
          </div>
          <div className="flex justify-between">
            <span>CHECKSUM: 17-C45E-D15P47CH</span>
            <span>CONTAINMENT: ENFORCED</span>
          </div>
        </div>

        {/* Safe Skip / Recovery Controls */}
        <div className="flex items-center justify-center gap-4 pt-2">
          <button
            type="button"
            onClick={handleSkipOrRecover}
            className="flex items-center gap-2 px-4 py-2 bg-stone-900 hover:bg-stone-800 border border-stone-700 hover:border-stone-500 text-stone-300 hover:text-white font-mono text-xs tracking-wider transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>RECOVER INTERFACE (ESC)</span>
          </button>

          {onDismiss && (
            <button
              type="button"
              onClick={onDismiss}
              className="flex items-center gap-2 px-3 py-2 text-stone-500 hover:text-stone-300 font-mono text-xs tracking-wider transition-colors"
            >
              <XCircle className="w-3.5 h-3.5" />
              <span>DISMISS</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
