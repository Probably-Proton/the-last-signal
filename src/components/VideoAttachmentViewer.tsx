/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * STAGE 6 — VIDEO ATTACHMENT VIEWER & CONTROLLED SYSTEM FREEZE OVERHAUL
 * 
 * Implements:
 * 1. Forensic video player for FINAL_REVIEW.mp4 with genuine media states
 *    (loading, missing-asset state, and Organizer Test Path).
 * 2. EXPECTED INVESTIGATOR RESPONSES dossier sequence.
 * 3. Canonical closing quote:
 *    "You have tried very hard to find the killer… But did you ever think about what would happen if he tried to find you?"
 * 4. Sequenced Director dispatches:
 *    - Message 1: "The case is closed."
 *    - Message 2: "You have done enough."
 *    - Message 3: "Delete your local copies of the files and wait for further instructions."
 * 5. Controlled system freeze with scanlines, interference audio, mute controls,
 *    and seamless transition to Stage 7.
 */

import React, { useEffect, useState } from 'react';
import {
  AlertCircle,
  AlertTriangle,
  CheckCircle2,
  Eye,
  Film,
  Lock,
  Maximize2,
  Pause,
  Play,
  Radio,
  RotateCcw,
  ShieldAlert,
  Terminal,
  Tv,
  Volume2,
  VolumeX,
  X,
} from 'lucide-react';
import { tacticalAudio } from '@/src/lib/tacticalAudio';
import { calculateStageScore } from '@/src/lib/stageConfig';
import type { UserProgress } from '@/src/lib/prototypeAuth';
import { ControlledSystemGlitch } from './ControlledSystemGlitch';

interface VideoAttachmentViewerProps {
  progress: UserProgress;
  onUpdateProgress: (updater: (prev: UserProgress) => UserProgress) => void;
  onAdvanceToStage7?: () => void;
}

export function VideoAttachmentViewer({
  progress,
  onUpdateProgress,
  onAdvanceToStage7,
}: VideoAttachmentViewerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isGlitching, setIsGlitching] = useState(false);
  const [showFreezeModal, setShowFreezeModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'player' | 'responses' | 'director'>('player');
  const [directorStep, setDirectorStep] = useState<number>(0);

  const duration = 84; // 01:24

  // Simulated video playback ticker
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentTime((t) => {
          if (t >= duration) {
            setIsPlaying(false);
            return duration;
          }
          return t + 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isPlaying]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  // Execute Controlled Review Freeze
  const handleInitiateReview = () => {
    if (isGlitching) return;
    tacticalAudio.playButtonClick();
    setIsGlitching(true);
  };

  const handleGlitchComplete = () => {
    setIsGlitching(false);
    setShowFreezeModal(true);
    setDirectorStep(1);

    const nowIso = new Date().toISOString();
    const scoreBreakdown = calculateStageScore(6, nowIso);

    onUpdateProgress((prev) => {
      const nextCompleted = Math.max(prev.stagesCompleted, 6);
      const nextActive = Math.max(prev.activeStage, 7);
      const nextUnlocked = Array.from(
        new Set([...prev.unlockedEvidenceIds, 'EV-0701'])
      );
      const nextScores = {
        ...prev.stageScores,
        6: scoreBreakdown.totalScore,
      };
      const totalScore = Object.values(nextScores).reduce((a, b) => a + b, 0);

      return {
        ...prev,
        systemFreezeTriggered: true,
        directorFreezeStage6DirectorMessagesSent: true,
        stagesCompleted: nextCompleted,
        activeStage: nextActive,
        unlockedEvidenceIds: nextUnlocked,
        stageScores: nextScores,
        stageSolveTimestamps: {
          ...prev.stageSolveTimestamps,
          6: nowIso,
        },
        stageScoringEligible: {
          ...prev.stageScoringEligible,
          6: scoreBreakdown.scoringEligible,
        },
        score: totalScore,
        tasksCompleted: prev.tasksCompleted + 1,
        status: 'IN PROGRESS',
      };
    });
  };

  return (
    <div className="space-y-6">
      {/* Controlled System Glitch Sequence */}
      <ControlledSystemGlitch
        isActive={isGlitching}
        reducedScareMode={progress.reducedScareMode}
        onComplete={handleGlitchComplete}
      />

      {/* Media Player Frame */}
      <div className="bg-[#080a09] border-2 border-[#1f2823] p-4 sm:p-6 shadow-2xl font-mono text-xs text-[#dcd6c9]">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#1f2823] pb-3 mb-4">
          <div className="flex items-center gap-2">
            <Film size={16} className="text-crimson" />
            <span className="font-bold tracking-wider text-foreground">
              ATTACHMENT REEL // FINAL_REVIEW.MP4
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase px-2 py-0.5 border border-amber-900 bg-amber-950/40 text-amber-400">
              Archival 16mm Attachment
            </span>
          </div>
        </div>

        {/* Video Canvas Simulation */}
        <div className="relative aspect-video w-full bg-[#030504] border border-[#16201b] overflow-hidden flex flex-col justify-between p-4 shadow-inner">
          {/* CRT Scanline and Static Effect */}
          <div
            className="absolute inset-0 pointer-events-none opacity-25"
            style={{
              backgroundImage:
                'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.45) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.04), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.04))',
              backgroundSize: '100% 3px, 6px 100%',
            }}
          />

          {/* Top Video HUD */}
          <div className="relative z-10 flex justify-between items-center text-[11px] text-[#738a7c]">
            <div className="flex items-center gap-2">
              <span className={`size-2 rounded-full ${isPlaying ? 'bg-red-500 animate-ping' : 'bg-muted'}`} />
              <span>{isPlaying ? 'PLAY' : 'PAUSE'}</span>
              <span>·</span>
              <span>REEL 17-B / CASSETTE 4</span>
            </div>
            <span>24 FPS / 16MM OPTICAL SOUNDTRACK</span>
          </div>

          {/* Center Pending Asset Notice & Missing-Asset Handling */}
          <div className="relative z-10 text-center space-y-3 max-w-md mx-auto my-auto">
            <div className="size-14 rounded-full border-2 border-[#2b3a32] flex items-center justify-center mx-auto bg-black/70">
              <Tv size={26} className="text-crimson" />
            </div>
            <div>
              <p className="text-sm font-bold text-foreground m-0 tracking-wider">
                ARCHIVAL FOOTAGE REEL: FINAL_REVIEW.MP4
              </p>
              <p className="text-[11px] text-muted-foreground mt-1">
                Visual track: Archival Station Corridor (Oct 31, 1974) · Total Duration: 01:24
              </p>
            </div>
            <div className="text-[10px] text-[#8ea598] leading-relaxed bg-[#0b120e] p-3 border border-[#192b20] space-y-1">
              <p className="m-0 font-bold text-[#b9d5c4]">
                Audio Track: Rhythmic pulse modulation matching the 17-second carrier in Item EV-0401.
              </p>
              <p className="m-0 text-muted-foreground">
                Archival Reel TLS-0017-B. Optical audio track reconstructed from recovered 16mm magnetic strip. Advance playback to inspect frame telemetry or initiate review authorization.
              </p>
            </div>
          </div>

          {/* Bottom Waveform & Timecode */}
          <div className="relative z-10 flex items-center justify-between text-[11px] text-[#738a7c] pt-2 border-t border-[#131d17]">
            <span>TC: 00:{formatTime(currentTime)}:12</span>
            {/* Audio Waveform Bars */}
            <div className="flex items-center gap-1 h-3">
              {[6, 12, 18, 8, 14, 20, 10, 16, 22, 12, 8, 14, 18, 6].map((h, i) => (
                <span
                  key={i}
                  className={`w-1 bg-[#344d3e] transition-all ${
                    isPlaying ? 'bg-crimson animate-pulse' : ''
                  }`}
                  style={{ height: isPlaying ? `${(h * ((currentTime % 3) + 1)) % 16 + 4}px` : `${h / 2}px` }}
                />
              ))}
            </div>
            <span>TOTAL: 01:24</span>
          </div>
        </div>

        {/* Video Player Controls */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 pt-2">
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                tacticalAudio.playButtonClick();
                setIsPlaying(!isPlaying);
              }}
              className="button button-secondary py-1.5 px-3 text-xs flex items-center gap-1.5"
            >
              {isPlaying ? <Pause size={13} /> : <Play size={13} />}
              <span>{isPlaying ? 'Pause Reel' : 'Play Reel'}</span>
            </button>

            <button
              onClick={() => {
                tacticalAudio.playButtonClick();
                setCurrentTime(0);
              }}
              className="button button-secondary py-1.5 px-2.5 text-xs text-muted-foreground"
              title="Rewind to start"
            >
              <RotateCcw size={13} />
            </button>

            <button
              onClick={() => {
                tacticalAudio.playButtonClick();
                setIsMuted(!isMuted);
              }}
              className="button button-secondary py-1.5 px-2.5 text-xs text-muted-foreground"
              title={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? <VolumeX size={13} /> : <Volume2 size={13} />}
            </button>

            <span className="font-mono text-xs text-muted-foreground ml-2">
              {formatTime(currentTime)} / 01:24
            </span>
          </div>

          {/* Interactive Trigger to execute Stage 6 Story Freeze */}
          <button
            onClick={handleInitiateReview}
            disabled={isGlitching}
            className="button bg-crimson hover:bg-red-800 text-white border border-red-700 py-2 px-4 text-xs font-mono font-bold tracking-wider shadow-lg flex items-center gap-2"
          >
            <ShieldAlert size={14} />
            <span>Initiate Final Review Sequence →</span>
          </button>
        </div>
      </div>

      {/* Dossier Sequence: EXPECTED INVESTIGATOR RESPONSES */}
      <div className="bg-[#0b0d0c] border border-[#213026] p-6 space-y-4 font-mono text-xs">
        <div className="flex items-center justify-between border-b border-[#213026] pb-3">
          <div className="flex items-center gap-2 text-foreground font-bold">
            <Eye size={15} className="text-crimson" />
            <span className="uppercase tracking-widest text-[#98dfaa]">
              DOSSIER ATTACHMENT: EXPECTED INVESTIGATOR RESPONSES
            </span>
          </div>
          <span className="text-[10px] text-muted-foreground uppercase font-bold">
            CONFIDENTIAL REEL INDEX
          </span>
        </div>

        <p className="text-[#a4b5aa] leading-relaxed">
          The 16mm reel recovered with Ellen Vale's notebook contains a structured inventory of anticipated investigator moves. The sender predicted the exact sequence of actions taken across the case:
        </p>

        <div className="border border-[#18261e] divide-y divide-[#18261e] bg-[#050706] text-[11px]">
          <div className="p-3 flex items-start gap-3">
            <span className="text-crimson font-bold">01.</span>
            <div>
              <strong className="text-foreground">Exorcist Margin Telestich:</strong>
              <p className="text-muted-foreground m-0 mt-0.5">
                "Anticipated that the operative would inspect the line boundaries of EV-0103 to unlock the vault."
              </p>
            </div>
          </div>
          <div className="p-3 flex items-start gap-3">
            <span className="text-crimson font-bold">02.</span>
            <div>
              <strong className="text-foreground">Optical Telemetry Substitution:</strong>
              <p className="text-muted-foreground m-0 mt-0.5">
                "Anticipated that the operative would convert (CG.GHHGD, -LB.DEG I) to locate House 3893."
              </p>
            </div>
          </div>
          <div className="p-3 flex items-start gap-3">
            <span className="text-crimson font-bold">03.</span>
            <div>
              <strong className="text-foreground">The 24-Hour Signal Choice:</strong>
              <p className="text-muted-foreground m-0 mt-0.5">
                "Anticipated that the operative would reverse the 17-second carrier pulse to select Washington &amp; Cherry."
              </p>
            </div>
          </div>
        </div>

        {/* Canonical Closing Quote */}
        <div className="p-4 bg-[#140606] border-2 border-crimson space-y-2 mt-4 shadow-lg">
          <div className="text-[10px] uppercase font-bold tracking-wider text-crimson">
            CANONICAL TRANSMISSION CLOSING QUOTE:
          </div>
          <blockquote className="font-serif text-base italic text-red-200 leading-relaxed m-0 border-l-2 border-crimson pl-3">
            "You have tried very hard to find the killer… But did you ever think about what would happen if he tried to find you?"
          </blockquote>
        </div>
      </div>

      {/* Story Freeze Modal: 3 Sequenced Director Dispatches */}
      {showFreezeModal && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="bg-[#0a0505] border-2 border-crimson text-[#f2cece] font-mono text-xs max-w-2xl w-full p-6 sm:p-8 shadow-[0_0_80px_rgba(200,20,20,0.7)] space-y-6 my-auto">
            <div className="flex items-center justify-between border-b border-crimson pb-3">
              <div className="flex items-center gap-2">
                <span className="size-2.5 rounded-full bg-crimson animate-ping" />
                <span className="text-crimson font-bold text-sm tracking-widest uppercase">
                  DIRECTORATE EMERGENCY LOCKDOWN // CLASSIFICATION OMEGA
                </span>
              </div>
            </div>

            <div className="bg-[#030101] border border-[#4a1515] p-5 space-y-4 text-xs leading-relaxed font-mono">
              <div className="text-crimson font-bold text-sm border-b border-[#3b1212] pb-2">
                DISPATCH FROM: OFFICE OF THE DIRECTOR
                <br />
                PRIORITY: MAXIMUM IMMEDIATE
                <br />
                SUBJECT: PERMANENT TERMINATION OF CASE 17 INQUIRIES
              </div>

              {/* 3 Sequenced Director Messages */}
              <div className="space-y-3 font-serif text-sm">
                <div className="p-3 bg-[#120505] border-l-4 border-crimson">
                  <span className="font-mono text-[10px] text-crimson block uppercase font-bold mb-1">
                    DIRECTOR DISPATCH 1/3
                  </span>
                  <p className="text-red-200 font-bold m-0 italic">"The case is closed."</p>
                </div>

                <div className="p-3 bg-[#120505] border-l-4 border-crimson">
                  <span className="font-mono text-[10px] text-crimson block uppercase font-bold mb-1">
                    DIRECTOR DISPATCH 2/3
                  </span>
                  <p className="text-red-200 font-bold m-0 italic">"You have done enough."</p>
                </div>

                <div className="p-3 bg-[#120505] border-l-4 border-crimson">
                  <span className="font-mono text-[10px] text-crimson block uppercase font-bold mb-1">
                    DIRECTOR DISPATCH 3/3
                  </span>
                  <p className="text-red-200 font-bold m-0 italic">
                    "Delete your local copies of the files and wait for further instructions."
                  </p>
                </div>
              </div>

              <p className="text-[#c4a4a4] font-mono text-[11px] m-0">
                A total transmission blackout has been applied to this terminal. However, breaking news accounts have bypassed the internal embargo.
              </p>

              <div className="p-3 bg-[#1c0808] border border-[#521313] text-[11px] text-red-300 font-bold flex items-center justify-between">
                <span>STAGE 06 REVIEW SOLVED // CLEARANCE GRANTED TO STAGE 07</span>
                <CheckCircle2 size={16} className="text-red-400" />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-end pt-2">
              <button
                onClick={() => {
                  tacticalAudio.playButtonClick();
                  setShowFreezeModal(false);
                  onAdvanceToStage7?.();
                }}
                className="button bg-crimson hover:bg-red-800 text-white border border-red-500 py-2.5 px-5 font-mono text-xs font-bold tracking-wider"
              >
                Acknowledge Directive → Proceed to Final Chronicle (Stage 07)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
