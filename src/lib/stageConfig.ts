/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * CANONICAL STAGE CONFIGURATION & SCORING ENGINE (IST / Asia/Kolkata)
 * 
 * Defines official stage windows, scoring deadlines, base points,
 * hourly bonus calculations, and target selection rules for Case TLS-0017.
 */

export interface StageScheduleConfig {
  number: number;
  title: string;
  subtitle: string;
  // Official window in IST (Asia/Kolkata)
  openDateIST: string;
  deadlineIST: string;
  // ISO-8601 strings with +05:30 offset for deterministic UTC parsing
  openIso: string;
  deadlineIso: string;
  basePoints: number;
  maxHourlyBonus: number; // 24 points max (1 pt/hr)
  maxTotalScore: number; // 124 points
  targetBonus?: number; // e.g. Site 04 bonus
}

/**
 * Official Case 17 Timetable (IST / UTC+05:30)
 * Note: Launch dates are scheduled for the official competition window.
 * Prototype investigators can solve ahead or test deadlines.
 */
export const STAGE_SCHEDULE: StageScheduleConfig[] = [
  {
    number: 1,
    title: 'The Archive',
    subtitle: "The archivist's letter & docket registry",
    openDateIST: '2026-11-01 00:00 IST',
    deadlineIST: '2026-11-03 23:59 IST',
    openIso: '2026-11-01T00:00:00+05:30',
    deadlineIso: '2026-11-03T23:59:59+05:30',
    basePoints: 100,
    maxHourlyBonus: 24,
    maxTotalScore: 124,
  },
  {
    number: 2,
    title: 'The Lower Vault',
    subtitle: 'County records bay & negative telemetry',
    openDateIST: '2026-11-03 00:00 IST',
    deadlineIST: '2026-11-05 23:59 IST',
    openIso: '2026-11-03T00:00:00+05:30',
    deadlineIso: '2026-11-05T23:59:59+05:30',
    basePoints: 100,
    maxHourlyBonus: 24,
    maxTotalScore: 124,
  },
  {
    number: 3,
    title: 'The Presidio Witness',
    subtitle: 'Case testimony & regional survey',
    openDateIST: '2026-11-05 00:00 IST',
    deadlineIST: '2026-11-07 23:59 IST',
    openIso: '2026-11-05T00:00:00+05:30',
    deadlineIso: '2026-11-07T23:59:59+05:30',
    basePoints: 100,
    maxHourlyBonus: 24,
    maxTotalScore: 124,
  },
  {
    number: 4,
    title: 'The 47-Second Tape',
    subtitle: 'Dispatch recording & signal candidate',
    openDateIST: '2026-11-07 00:00 IST',
    deadlineIST: '2026-11-09 23:59 IST',
    openIso: '2026-11-07T00:00:00+05:30',
    deadlineIso: '2026-11-09T23:59:59+05:30',
    basePoints: 100,
    maxHourlyBonus: 24,
    maxTotalScore: 124,
    targetBonus: 20, // +20 bonus points for correctly designating Site 04
  },
  {
    number: 5,
    title: 'The Mercer Inquest',
    subtitle: 'Chronicle report & confidential dossiers',
    openDateIST: '2026-11-09 00:00 IST',
    deadlineIST: '2026-11-11 23:59 IST',
    openIso: '2026-11-09T00:00:00+05:30',
    deadlineIso: '2026-11-11T23:59:59+05:30',
    basePoints: 100,
    maxHourlyBonus: 24,
    maxTotalScore: 124,
  },
  {
    number: 6,
    title: 'The Vale Notebook',
    subtitle: 'Research journal & 16mm reel',
    openDateIST: '2026-11-11 00:00 IST',
    deadlineIST: '2026-11-13 23:59 IST',
    openIso: '2026-11-11T00:00:00+05:30',
    deadlineIso: '2026-11-13T23:59:59+05:30',
    basePoints: 100,
    maxHourlyBonus: 24,
    maxTotalScore: 124,
  },
  {
    number: 7,
    title: 'The Final Dispatch',
    subtitle: 'Station incident & case closure',
    openDateIST: '2026-11-13 00:00 IST',
    deadlineIST: '2026-11-15 23:59 IST',
    openIso: '2026-11-13T00:00:00+05:30',
    deadlineIso: '2026-11-15T23:59:59+05:30',
    basePoints: 100,
    maxHourlyBonus: 24,
    maxTotalScore: 124,
  },
];

/**
 * Format a Date object or ISO string in Indian Standard Time (IST)
 */
export function formatToIST(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  if (isNaN(d.getTime())) return 'Invalid Date';

  const formatter = new Intl.DateTimeFormat('en-IN', {
    timeZone: 'Asia/Kolkata',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });

  return `${formatter.format(d)} IST`;
}

/**
 * Get current time in Indian Standard Time (formatted string)
 */
export function getCurrentTimeIST(): string {
  return formatToIST(new Date());
}

/**
 * Get remaining time until a deadline in milliseconds
 */
export function getRemainingTime(deadlineIso: string, referenceTime = new Date()): number {
  const deadline = new Date(deadlineIso).getTime();
  const current = referenceTime.getTime();
  return Math.max(0, deadline - current);
}

/**
 * Format remaining milliseconds into human-readable countdown: "DDd HHh MMm SSs"
 */
export function formatCountdown(msRemaining: number): string {
  if (msRemaining <= 0) return 'DEADLINE EXPIRED';

  const totalSeconds = Math.floor(msRemaining / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (days > 0) {
    return `${days}d ${String(hours).padStart(2, '0')}h ${String(minutes).padStart(2, '0')}m ${String(seconds).padStart(2, '0')}s`;
  }
  return `${String(hours).padStart(2, '0')}h ${String(minutes).padStart(2, '0')}m ${String(seconds).padStart(2, '0')}s`;
}

/**
 * Check whether a given solve timestamp occurred before the stage deadline.
 */
export function isSolveBeforeDeadline(solveTimestampIso: string, stageNumber: number): boolean {
  const stage = STAGE_SCHEDULE.find((s) => s.number === stageNumber);
  if (!stage) return true;

  const solveTime = new Date(solveTimestampIso).getTime();
  const deadlineTime = new Date(stage.deadlineIso).getTime();
  return solveTime <= deadlineTime;
}

export interface StageScoreBreakdown {
  stageNumber: number;
  basePoints: number;
  elapsedHours: number;
  hourlyBonus: number;
  targetBonus: number;
  totalScore: number;
  scoringEligible: boolean;
  solveTimestampIST: string;
  deadlineIST: string;
}

/**
 * Calculate stage score according to official specification:
 * - Base points: 100 pts per solve
 * - Hourly bonus: +1 pt per elapsed hour from stage opening (or speed bonus), capped at 24 pts
 *   Formula: min(floor(elapsed_hours), 24)
 * - Maximum points per stage: 124 pts (plus optional target bonus)
 * - Solves submitted after deadline award 0 competitive points (story progression only, scoringEligible = false)
 */
export function calculateStageScore(
  stageNumber: number,
  solveTimestampIso: string,
  options?: { isCorrectTarget?: boolean }
): StageScoreBreakdown {
  const stage = STAGE_SCHEDULE.find((s) => s.number === stageNumber);
  if (!stage) {
    return {
      stageNumber,
      basePoints: 100,
      elapsedHours: 0,
      hourlyBonus: 0,
      targetBonus: 0,
      totalScore: 100,
      scoringEligible: true,
      solveTimestampIST: formatToIST(solveTimestampIso),
      deadlineIST: 'N/A',
    };
  }

  const solveTime = new Date(solveTimestampIso).getTime();
  const deadlineTime = new Date(stage.deadlineIso).getTime();
  const openTime = new Date(stage.openIso).getTime();

  const isEligible = solveTime <= deadlineTime;

  if (!isEligible) {
    // Solved after deadline: 0 competitive points, story progress only
    return {
      stageNumber,
      basePoints: 0,
      elapsedHours: 0,
      hourlyBonus: 0,
      targetBonus: 0,
      totalScore: 0,
      scoringEligible: false,
      solveTimestampIST: formatToIST(solveTimestampIso),
      deadlineIST: stage.deadlineIST,
    };
  }

  // Calculate elapsed hours between solve and opening (or remaining time speed bonus)
  // Elapsed time active on stage: min(floor(elapsed_hours), 24)
  const elapsedMs = Math.max(0, solveTime - openTime);
  const elapsedHours = Math.floor(elapsedMs / (1000 * 60 * 60));
  const hourlyBonus = Math.min(stage.maxHourlyBonus, Math.max(0, elapsedHours));

  // Optional target bonus for Stage 4 (Site 04)
  let targetBonus = 0;
  if (stageNumber === 4 && options?.isCorrectTarget && stage.targetBonus) {
    targetBonus = stage.targetBonus;
  }

  const totalScore = stage.basePoints + hourlyBonus + targetBonus;

  return {
    stageNumber,
    basePoints: stage.basePoints,
    elapsedHours,
    hourlyBonus,
    targetBonus,
    totalScore,
    scoringEligible: true,
    solveTimestampIST: formatToIST(solveTimestampIso),
    deadlineIST: stage.deadlineIST,
  };
}
