/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * DISTINCT ARCHIVAL DOCUMENT SHEETS FOR EVERY EVIDENCE FILE
 * 
 * Provides authentic, differentiated archival document presentations:
 * - Official police scene reports & chain-of-custody logs
 * - Bureau technical telecommunication teardowns
 * - Verbatim stenographer interrogation transcripts
 * - Engineering microwave relay surveys
 * - Multi-column broadsheet newspapers
 * - Confidential DOJ suspect dossiers
 * - Handwritten forensic researcher journals
 * 
 * Zero repetitive boilerplate. Distinct IDs, dates, issuing departments, and clues.
 */

import React from 'react';
import {
  AlertTriangle,
  Archive,
  Compass,
  FileCheck,
  FileText,
  HelpCircle,
  MapPin,
  Newspaper,
  Radio,
  Shield,
  ShieldAlert,
  Terminal,
} from 'lucide-react';
import type { EvidenceItem } from '@/src/lib/mockData';
import { CASE_ID } from '@/src/lib/mockData';

// ---------------------------------------------------------------------------
// 1. EV-0101: SFPD SCENE INVESTIGATION REPORT (DOC-SFPD-74-091)
// ---------------------------------------------------------------------------
export function SceneOverviewDoc({ item }: { item: EvidenceItem }) {
  return (
    <div className="paper-sheet p-8 md:p-12 relative text-ink font-mono text-xs leading-relaxed">
      {/* Header Stamp */}
      <div className="flex items-start justify-between border-b-2 border-ink pb-4">
        <div>
          <p className="text-[10px] uppercase tracking-[0.24em] text-ink/70 font-bold">
            SAN FRANCISCO POLICE DEPARTMENT — CENTRAL PATROL DIVISION
          </p>
          <h2 className="font-serif text-2xl font-bold text-ink mt-0.5">
            Initial Crime Scene Investigation Log
          </h2>
          <p className="text-[10px] text-ink/60 mt-0.5">
            DOC REF: DOC-SFPD-74-091 // SUB-DISTRICT: PRESIDIO BORDER
          </p>
        </div>
        <div className="text-right">
          <span className="stamp text-crimson border-crimson text-xs">EVIDENCE SECURED</span>
          <p className="text-[10px] text-ink/70 mt-1 uppercase font-bold">CASE: {CASE_ID}</p>
        </div>
      </div>

      {/* Metadata Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 my-5 py-3 border-y border-ink/30 text-[11px] bg-black/5">
        <div>
          <span className="text-[9px] uppercase text-ink/60 block">DATE OF DISCOVERY</span>
          <strong>19 OCT 1974 · 23:14 HRS</strong>
        </div>
        <div>
          <span className="text-[9px] uppercase text-ink/60 block">OFFICERS LOGGING</span>
          <strong>PTL. J. CALDWELL / K. ARMSTRONG</strong>
        </div>
        <div>
          <span className="text-[9px] uppercase text-ink/60 block">SECTOR PRECINCT</span>
          <strong>PRESIDIO REACH · COBBLESTONE REAR ALLEY</strong>
        </div>
        <div>
          <span className="text-[9px] uppercase text-ink/60 block">CHAIN OF CUSTODY</span>
          <strong className="text-emerald-800">VAULT LOCKER 01-A</strong>
        </div>
      </div>

      {/* Narrative */}
      <div className="space-y-4 text-xs font-mono">
        <p className="font-bold text-ink uppercase tracking-wider text-[11px]">
          OFFICER FIELD OBSERVATIONS &amp; PHYSICAL MEASUREMENTS:
        </p>
        <p>
          1. While conducting scheduled motorized perimeter sweeps along the Presidio residential interface, units responded to reported electrical hum and static interference affecting municipal receivers.
        </p>
        <p>
          2. Upon turning into the rear cobblestone service alley between Washington and Jackson, officers observed a portable radio receiver (catalogued as <strong>EV-0102</strong>) lying face-down on rain-slicked stones. Battery indicator lamp was intermittently flickering red.
        </p>
        <p>
          3. Fresh parallel tire impressions (gauge 57 inches) were measured in the soft loam shoulder, consistent with a rapid departure toward the Presidio park boulevard without headlights.
        </p>
        <p>
          4. Yellow barrier cordon was established at a radius of 45 yards. No shell casings or biological stains were detected in the immediate alleyway, indicating the equipment was dropped or deposited intentionally rather than discarded during a physical struggle.
        </p>
      </div>

      {/* Handwritten Investigator Annotation */}
      <div className="mt-6 pt-3 border-t border-ink/30 relative">
        <p className="font-['Caveat'] text-2xl text-[#1e3a8a] rotate-[-1deg]">
          The radio dial was jammed on a frequency not used by local emergency services. Why here?
        </p>
      </div>

      {/* Document Footer */}
      <div className="mt-8 pt-3 border-t border-ink/40 flex justify-between text-[10px] text-ink/60 uppercase">
        <span>SFPD FORM 104-B (REV. 1973)</span>
        <span>EXAMINER SIGNATURE: <em>J. Caldwell #419</em></span>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// 2. EV-0102: TECHNICAL COMMUNICATIONS LAB TEARDOWN (DOC-BCI-74-102)
// ---------------------------------------------------------------------------
export function RadioReceiverDoc({ item }: { item: EvidenceItem }) {
  return (
    <div className="paper-sheet p-8 md:p-12 relative text-ink font-mono text-xs leading-relaxed">
      <div className="flex items-start justify-between border-b-2 border-ink pb-4">
        <div>
          <p className="text-[10px] uppercase tracking-[0.24em] text-ink/70 font-bold">
            CALIFORNIA BUREAU OF CRIMINAL IDENTIFICATION — ELECTRONICS DIVISION
          </p>
          <h2 className="font-serif text-2xl font-bold text-ink mt-0.5">
            Technical Laboratory Teardown &amp; Frequency Analysis
          </h2>
          <p className="text-[10px] text-ink/60 mt-0.5">
            LAB DOSSIER: DOC-BCI-74-102 // SPECIMEN EV-0102
          </p>
        </div>
        <span className="stamp text-crimson border-crimson text-xs">TECHNICAL EXAM</span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 my-5 py-3 border-y border-ink/30 text-[11px] bg-black/5">
        <div>
          <span className="text-[9px] uppercase text-ink/60 block">EXAMINER</span>
          <strong>DR. HORACE VANCE, BCI</strong>
        </div>
        <div>
          <span className="text-[9px] uppercase text-ink/60 block">HARDWARE MODEL</span>
          <strong>ZENITH TRANS-OCEANIC MODIFIED</strong>
        </div>
        <div>
          <span className="text-[9px] uppercase text-ink/60 block">INTERNAL SERIAL</span>
          <strong>BC-8921-A (PARTIAL CHASSIS)</strong>
        </div>
        <div>
          <span className="text-[9px] uppercase text-ink/60 block">TUNING MECHANISM</span>
          <strong className="text-crimson">SOLDER-FIXED / OFF-BAND</strong>
        </div>
      </div>

      <div className="space-y-4 text-xs">
        <p className="font-bold text-ink uppercase tracking-wider text-[11px]">
          INTERNAL MODIFICATION FINDINGS:
        </p>
        <p>
          1. <strong>Chassis Inspection:</strong> External bakelite casing exhibits impact scuffing along the lower right quadrant. The original telescoping antenna was unscrewed and replaced with a soldered copper pigtail lead, engineered to receive directional signals.
        </p>
        <p>
          2. <strong>Frequency Crystal:</strong> The standard civilian IF oscillator crystal was desoldered. In its place, a custom quartz oscillator stamped <em>162.55 MHz</em> was installed. This channel sits squarely within federal meteorological and naval relay bands.
        </p>
        <p>
          3. <strong>Mechanical Locking:</strong> The primary rotary tuning dial was locked with lead solder from behind the front bezel plate, preventing channel adjustment.
        </p>
        <div className="p-3 bg-black/5 border-l-2 border-crimson text-[11px] space-y-1">
          <strong className="text-crimson block uppercase">ANALYST COMMENT:</strong>
          The receiver was tuned specifically to capture transmissions beamed from an elevated line-of-sight location across the Bay, pointing toward the Presidio corridor.
        </div>
      </div>

      <div className="mt-8 pt-3 border-t border-ink/40 flex justify-between text-[10px] text-ink/60 uppercase">
        <span>STATE BCI FORENSIC LABS // SACRAMENTO</span>
        <span>PAGE 01 OF 01 // REPORT CERTIFIED</span>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// 3. EV-0201: FORENSIC OPTICAL NEGATIVE TELEMETRY DOCKET (DOC-NEG-74-17)
// ---------------------------------------------------------------------------
export function RecordsRoomNegativeDoc({
  item,
  onOpenCoordTerminal,
}: {
  item: EvidenceItem;
  onOpenCoordTerminal?: () => void;
}) {
  return (
    <div className="paper-sheet p-8 md:p-12 relative text-ink font-mono text-xs leading-relaxed">
      <div className="flex items-start justify-between border-b-2 border-ink pb-4">
        <div>
          <p className="text-[10px] uppercase tracking-[0.24em] text-ink/70 font-bold">
            FORENSIC IMAGING LABORATORY — ARCHIVAL SERVICES
          </p>
          <h2 className="font-serif text-2xl font-bold text-ink mt-0.5">
            Photographic Negative Telemetry &amp; Metadata Stamp
          </h2>
          <p className="text-[10px] text-ink/60 mt-0.5">
            DOC REF: DOC-NEG-74-17 // LOCATION: COUNTY ARCHIVES SUB-BASEMENT BAY 17
          </p>
        </div>
        <span className="stamp text-crimson border-crimson text-xs">RESTRICTED NEGATIVE</span>
      </div>

      {/* Negative Plate Preview Frame */}
      <div className="my-5 border-2 border-ink/40 p-4 bg-[#141514] text-[#ebe6dc] shadow-inner space-y-3">
        <div className="aspect-[16/9] w-full overflow-hidden bg-black/80 relative flex items-center justify-center border border-[#2a2927]">
          <img
            src={item.image ?? '/images/ev-archive-room.png'}
            alt="County Archives Sub-Basement Negative"
            className="w-full h-full object-cover saturate-[0.2] contrast-[1.3] brightness-[0.7]"
          />
          <div className="absolute inset-x-0 bottom-0 bg-black/85 p-2.5 font-mono text-[11px] text-[#4af66f] border-t border-[#1e3b26] flex flex-wrap justify-between items-center gap-2">
            <span className="tracking-widest">KODAK TRI-X PAN 5063 // EXIF TELEMETRY:</span>
            <code className="text-sm font-bold text-red-400 bg-black px-2 py-0.5 border border-red-900 select-all">
              (CG.GHHGD, -LB.DEG I)
            </code>
          </div>
        </div>
        <div className="text-[11px] text-[#9c978d] flex justify-between font-mono">
          <span>EMULSION BATCH: 74-10-88</span>
          <span>LOCATION: BAY 17 SUB-LEVEL 2</span>
          <span>OPTICAL RESOLUTION: 4000 DPI</span>
        </div>
      </div>

      {/* Forensic Decoding Docket */}
      <div className="space-y-4">
        <p className="font-bold text-ink uppercase tracking-wider text-[11px]">
          ANALYST CIPHER CONVERSION METHODOLOGY:
        </p>
        <p>
          Forensic microscopy of the film margin reveals that the alphanumeric stamp stamped into the camera base was altered with a mechanical substitution cipher. The alphabet-to-number mapping corresponds to:
        </p>

        <div className="p-3 bg-black/5 border border-ink/30 text-[11px] space-y-2">
          <div className="grid grid-cols-5 md:grid-cols-10 gap-1 text-center font-bold">
            <span className="p-1 bg-white border border-ink/20">A = 1</span>
            <span className="p-1 bg-white border border-ink/20">B = 2</span>
            <span className="p-1 bg-white border border-ink/20">C = 3</span>
            <span className="p-1 bg-white border border-ink/20">D = 4</span>
            <span className="p-1 bg-white border border-ink/20">E = 5</span>
            <span className="p-1 bg-white border border-ink/20">F = 6</span>
            <span className="p-1 bg-white border border-ink/20">G = 7</span>
            <span className="p-1 bg-white border border-ink/20">H = 8</span>
            <span className="p-1 bg-white border border-ink/20">I = 9</span>
            <span className="p-1 bg-red-100 text-crimson border border-crimson">L = 12</span>
          </div>
          <p className="text-[10px] text-ink/70 m-0 pt-1">
            Applying this mapping converts the stamped string into decimal geographic coordinates: Latitude 37.78874, Longitude -122.45709. These coordinates pinpoint a residential house in Presidio Heights.
          </p>
        </div>

        {onOpenCoordTerminal && (
          <div className="pt-2">
            <button
              onClick={onOpenCoordTerminal}
              className="button bg-[#1b3b22] hover:bg-[#255230] text-[#e3f7e6] border border-[#3e784c] text-xs font-mono py-2.5 px-4 shadow-sm w-full flex items-center justify-center gap-2"
            >
              <Compass size={14} className="text-emerald-400" />
              <span>Launch Coordinate Decryption &amp; House Number Terminal</span>
            </button>
          </div>
        )}
      </div>

      <div className="mt-8 pt-3 border-t border-ink/40 flex justify-between text-[10px] text-ink/60 uppercase">
        <span>FORENSIC IMAGING BUREAU // DIVISION 4</span>
        <span>EXAMINER: M. STERLING</span>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// 4. CAS-017: SFPD VERBATIM INTERROGATION TRANSCRIPT (DOC-WIT-74-88)
// ---------------------------------------------------------------------------
export function WitnessTranscriptDoc({ item }: { item: EvidenceItem }) {
  return (
    <div className="paper-sheet p-8 md:p-12 relative text-ink font-mono text-xs leading-relaxed">
      <div className="flex items-start justify-between border-b-2 border-ink pb-4">
        <div>
          <p className="text-[10px] uppercase tracking-[0.24em] text-ink/70 font-bold">
            SAN FRANCISCO POLICE DEPARTMENT — HOMICIDE BUREAU ROOM 412
          </p>
          <h2 className="font-serif text-2xl font-bold text-ink mt-0.5">
            Verbatim Stenographic Witness Transcript
          </h2>
          <p className="text-[10px] text-ink/60 mt-0.5">
            FILE REF: CAS-017 // DOC-WIT-74-88 // CASE: {CASE_ID}
          </p>
        </div>
        <span className="stamp text-ink border-ink text-xs">RECORD OF INQUIRY</span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 my-5 py-3 border-y border-ink/30 text-[11px] bg-black/5">
        <div>
          <span className="text-[9px] uppercase text-ink/60 block">WITNESS NAME</span>
          <strong>MRS. ELEANOR GABLE</strong>
        </div>
        <div>
          <span className="text-[9px] uppercase text-ink/60 block">RESIDENCE LOCATION</span>
          <strong className="text-crimson">3893 WASHINGTON STREET</strong>
        </div>
        <div>
          <span className="text-[9px] uppercase text-ink/60 block">INVESTIGATING INSPECTORS</span>
          <strong>INSP. D. TOSCHI / W. ARMSTRONG</strong>
        </div>
        <div>
          <span className="text-[9px] uppercase text-ink/60 block">DATE &amp; TIME</span>
          <strong>21 OCT 1974 · 14:20 HRS</strong>
        </div>
      </div>

      <div className="space-y-3 text-xs leading-relaxed font-mono">
        <p>
          <strong>INSPECTOR TOSCHI:</strong> Mrs. Gable, state your full name and confirm your residential address for the official case record.
        </p>
        <p>
          <strong>MRS. GABLE:</strong> Eleanor Gable. I live at thirty-eight ninety-three Washington Street, right across from the corner near Cherry.
        </p>
        <p>
          <strong>INSPECTOR ARMSTRONG:</strong> Take us back to the evening of Saturday the nineteenth. What drew your attention toward the street?
        </p>
        <p>
          <strong>MRS. GABLE:</strong> It was around eleven o'clock. The children were asleep. I was sitting in the front parlor reading when I heard a vehicle idle outside. Not a normal sound. It was running low, almost sputtering, like an older sedan with an exhaust leak.
        </p>
        <p>
          <strong>INSPECTOR TOSCHI:</strong> Did you look through the front window?
        </p>
        <p>
          <strong>MRS. GABLE:</strong> Yes. I pulled back the drape. The streetlamp on the corner was flickering. I saw the silhouette of a dark car parked on the south side of Washington. A man stepped out from the driver's side. He didn't rush. He walked across to the curb, stopped under the telephone pole, and looked directly up toward the telephone wires for several seconds.
        </p>
        <p>
          <strong>INSPECTOR ARMSTRONG:</strong> Can you describe his clothing or physical stature?
        </p>
        <p>
          <strong>MRS. GABLE:</strong> Heavy-set, broad across the shoulders. Dark windbreaker jacket, maybe navy or dark brown. Glasses with heavy rims. He dropped something onto the cobblestone path by the alleyway. When he got back into the car, he didn't turn on his headlights until he turned right onto the Presidio access road.
        </p>
      </div>

      <div className="mt-6 p-3 bg-black/5 border-l-2 border-crimson text-[11px] space-y-1">
        <strong className="text-crimson block uppercase font-bold">CASE RELEVANCE NOTE:</strong>
        The witness resides at House 3893, directly matching the decrypted Stage 02 negative telemetry coordinates (37.78874, -122.45709). This confirms Washington &amp; Cherry as the geographical anchor point for subsequent signal triangulation.
      </div>

      <div className="mt-8 pt-3 border-t border-ink/40 flex justify-between text-[10px] text-ink/60 uppercase">
        <span>SFPD TRANSCRIPT SYSTEM 4</span>
        <span>COURT STENOGRAPHER: P. LANDAU #18</span>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// 5. EV-0301: TELECOMMUNICATIONS MICROWAVE MAST SURVEY (DOC-SURV-74-33)
// ---------------------------------------------------------------------------
export function TransmissionMastDoc({ item }: { item: EvidenceItem }) {
  return (
    <div className="paper-sheet p-8 md:p-12 relative text-ink font-mono text-xs leading-relaxed">
      <div className="flex items-start justify-between border-b-2 border-ink pb-4">
        <div>
          <p className="text-[10px] uppercase tracking-[0.24em] text-ink/70 font-bold">
            CALIFORNIA DIVISION OF FORESTRY &amp; SIGNAL CORPS
          </p>
          <h2 className="font-serif text-2xl font-bold text-ink mt-0.5">
            Microwave Relay Tower Physical Inspection &amp; Triangulation
          </h2>
          <p className="text-[10px] text-ink/60 mt-0.5">
            SURVEY DOCKET: DOC-SURV-74-33 // STATION: PRESIDIO RIDGE MAST 04
          </p>
        </div>
        <span className="stamp text-ink border-ink text-xs">SITE SURVEY</span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 my-5 py-3 border-y border-ink/30 text-[11px] bg-black/5">
        <div>
          <span className="text-[9px] uppercase text-ink/60 block">SURVEYOR</span>
          <strong>R. HALLOWELL, FIELD TECH</strong>
        </div>
        <div>
          <span className="text-[9px] uppercase text-ink/60 block">ELEVATION</span>
          <strong>440 FT ABOVE MEAN SEA LEVEL</strong>
        </div>
        <div>
          <span className="text-[9px] uppercase text-ink/60 block">AZIMUTH BEARING</span>
          <strong>198° TOWARD PRESIDIO HEIGHTS</strong>
        </div>
        <div>
          <span className="text-[9px] uppercase text-ink/60 block">ANOMALY STATUS</span>
          <strong className="text-crimson">UNAUTHORIZED REPEATER TAP</strong>
        </div>
      </div>

      <div className="space-y-4">
        <p className="font-bold text-ink uppercase tracking-wider text-[11px]">
          RIGGING OBSERVATIONS:
        </p>
        <p>
          1. Physical climb inspection of coastal relay mast 04 revealed an unauthorized auxiliary coaxial line tapped directly into the secondary microwave transponder feed horn.
        </p>
        <p>
          2. The tapping apparatus was housed inside a weatherproof surplus ammo can clamped to the mast ladder at the 60-foot platform level. Inside was a transistorized pulse generator tuned to pulse in synchrony with off-band broadcasts.
        </p>
        <p>
          3. Geometric line-of-sight calculation confirms an unobstructed optical path between this ridgeline mast and the intersection of Washington and Cherry Streets. Signals broadcast from this node would be captured by any receiver with a copper pigtail antenna in that direct corridor.
        </p>
      </div>

      <div className="mt-8 pt-3 border-t border-ink/40 flex justify-between text-[10px] text-ink/60 uppercase">
        <span>DIVISION OF FORESTRY TELECOMMUNICATIONS</span>
        <span>PAGE 01 OF 01 // ARCHIVED OCT 23 1974</span>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// 6. EV-0502: CONFIDENTIAL SUSPECT DOSSIER: ARTHUR LEIGH ALLEN (DOC-DOS-0502)
// ---------------------------------------------------------------------------
export function SuspectDossierAllenDoc({ item }: { item: EvidenceItem }) {
  return (
    <div className="paper-sheet p-8 md:p-12 relative text-ink font-mono text-xs leading-relaxed">
      <div className="flex items-start justify-between border-b-2 border-ink pb-4">
        <div>
          <p className="text-[10px] uppercase tracking-[0.24em] text-ink/70 font-bold">
            CALIFORNIA DEPARTMENT OF JUSTICE — SPECIAL INVESTIGATIONS UNIT
          </p>
          <h2 className="font-serif text-2xl font-bold text-ink mt-0.5">
            Confidential Person of Interest Dossier // S-02
          </h2>
          <p className="text-[10px] text-ink/60 mt-0.5">
            FILE CODE: DOC-DOS-0502 // SUBJECT: ARTHUR LEIGH ALLEN
          </p>
        </div>
        <span className="stamp text-crimson border-crimson text-xs">RESTRICTED DOSSIER</span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 my-5 py-3 border-y border-ink/30 text-[11px] bg-black/5">
        <div>
          <span className="text-[9px] uppercase text-ink/60 block">DATE OF BIRTH</span>
          <strong>18 DEC 1933 · HONOLULU, HI</strong>
        </div>
        <div>
          <span className="text-[9px] uppercase text-ink/60 block">EMPLOYMENT</span>
          <strong>FORMER ELEMENTARY CUSTODIAN</strong>
        </div>
        <div>
          <span className="text-[9px] uppercase text-ink/60 block">RESIDENCE</span>
          <strong>32 FRESNO ST, VALLEJO, CA</strong>
        </div>
        <div>
          <span className="text-[9px] uppercase text-ink/60 block">STATUS</span>
          <strong className="text-amber-800">PRIMARY SUSPECT (HISTORIC)</strong>
        </div>
      </div>

      <div className="space-y-4">
        <p className="font-bold text-ink uppercase tracking-wider text-[11px]">
          INVESTIGATIVE SUMMARY &amp; FORENSIC CORRELATIONS:
        </p>
        <p>
          1. <strong>Physical Characteristics:</strong> Height 6'0", Weight ~240 lbs, heavy build, balding hair, heavy horn-rimmed eyeglasses. Closely aligns with physical descriptions provided by surviving witnesses and neighborhood accounts.
        </p>
        <p>
          2. <strong>Timepiece Inspection:</strong> Subject wore a "Zodiac Sea Wolf" diver's wristwatch gifted to him by his mother in 1967. The watch dial features the exact cross-circle motif used as the killer's monogram signature in historical correspondence.
        </p>
        <p>
          3. <strong>Geographic Proximity:</strong> Subject's residence on Fresno Street in Vallejo is situated less than ten minutes driving time from both the Lake Herman Road turnout and the Blue Rock Springs park entrance.
        </p>
        <p>
          4. <strong>Forensic Discrepancies:</strong> Formal handwriting analysis conducted by state examiner Sherwood Morrill concluded Allen's handwriting samples did not match the stylized lettering of the canonical letters. Fingerprint comparisons from the Presidio taxicab cab door were inconclusive.
        </p>
      </div>

      <div className="mt-8 pt-3 border-t border-ink/40 flex justify-between text-[10px] text-ink/60 uppercase">
        <span>DOJ SPECIAL INQUIRIES // SACRAMENTO</span>
        <span>CLEARANCE: LEVEL 4 ONLY</span>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// 7. EV-0503: CONFIDENTIAL SUSPECT DOSSIER: RICHARD GAIKOWSKI (DOC-DOS-0503)
// ---------------------------------------------------------------------------
export function SuspectDossierGaikowskiDoc({ item }: { item: EvidenceItem }) {
  return (
    <div className="paper-sheet p-8 md:p-12 relative text-ink font-mono text-xs leading-relaxed">
      <div className="flex items-start justify-between border-b-2 border-ink pb-4">
        <div>
          <p className="text-[10px] uppercase tracking-[0.24em] text-ink/70 font-bold">
            BUREAU OF INTELLIGENCE &amp; COUNTER-ANALYSIS
          </p>
          <h2 className="font-serif text-2xl font-bold text-ink mt-0.5">
            Confidential Person of Interest Dossier // S-03
          </h2>
          <p className="text-[10px] text-ink/60 mt-0.5">
            FILE CODE: DOC-DOS-0503 // SUBJECT: RICHARD GAIKOWSKI
          </p>
        </div>
        <span className="stamp text-crimson border-crimson text-xs">RESTRICTED DOSSIER</span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 my-5 py-3 border-y border-ink/30 text-[11px] bg-black/5">
        <div>
          <span className="text-[9px] uppercase text-ink/60 block">DATE OF BIRTH</span>
          <strong>14 MAR 1936 · WATERTOWN, SD</strong>
        </div>
        <div>
          <span className="text-[9px] uppercase text-ink/60 block">OCCUPATION</span>
          <strong>JOURNALIST / MANAGING EDITOR</strong>
        </div>
        <div>
          <span className="text-[9px] uppercase text-ink/60 block">AFFILIATION</span>
          <strong>GOOD TIMES UNDERGROUND PRESS</strong>
        </div>
        <div>
          <span className="text-[9px] uppercase text-ink/60 block">LOCATION BASE</span>
          <strong>SAN FRANCISCO / BERKELEY CORRIDOR</strong>
        </div>
      </div>

      <div className="space-y-4">
        <p className="font-bold text-ink uppercase tracking-wider text-[11px]">
          CORRELATION ANALYSIS &amp; AUDIO COMPARISON:
        </p>
        <p>
          1. <strong>Editorial Background:</strong> As editor of the counter-culture newspaper <em>Good Times</em>, subject maintained extensive access to commercial typesetting machinery, offset lithographic plates, and darkroom chemical developers matching materials identified in anonymous postal mailings.
        </p>
        <p>
          2. <strong>Audio Voice Matching:</strong> Voice recordings recovered from dispatch tapes were submitted for acoustic spectrographic comparison against broadcast interviews of Gaikowski. Police dispatcher Nancy Slover noted strong pitch and cadence similarities to the caller who spoke after the Blue Rock Springs incident.
        </p>
        <p>
          3. <strong>Proximity to Presidio:</strong> Subject maintained printing offices on Haight Street within three miles of the Presidio Heights intersection. Historical publications under his editorship frequently featured cryptograms, anagrams, and satirical commentaries on police inquiries.
        </p>
      </div>

      <div className="mt-8 pt-3 border-t border-ink/40 flex justify-between text-[10px] text-ink/60 uppercase">
        <span>BUREAU OF SPECIAL INQUIRIES</span>
        <span>PAGE 01 OF 01 // ARCHIVAL HOLD</span>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// 8. EV-0601: RESEARCH JOURNAL OF ELLEN VALE (DOC-JRN-74-06)
// ---------------------------------------------------------------------------
export function EllenValeJournalDoc({ item }: { item: EvidenceItem }) {
  return (
    <div className="paper-sheet p-8 md:p-12 relative text-ink font-serif text-sm leading-relaxed">
      <div className="flex items-start justify-between border-b-2 border-ink pb-4 font-mono">
        <div>
          <p className="text-[10px] uppercase tracking-[0.24em] text-ink/70 font-bold">
            ARCHIVAL RECOVERY // BOUND NOTEBOOK REF: DOC-JRN-74-06
          </p>
          <h2 className="font-serif text-2xl font-bold text-ink mt-0.5">
            Research Journal of Ellen Vale — October 1974
          </h2>
          <p className="text-[10px] text-ink/60 mt-0.5">
            SOURCE: PRIVATE PAPERS DEPOSITED IN ARCHIVAL VAULT B
          </p>
        </div>
        <span className="stamp text-crimson border-crimson text-xs font-mono">CONFIDENTIAL NOTES</span>
      </div>

      {/* Journal Entry 1 */}
      <div className="my-6 space-y-4 text-xs font-mono leading-relaxed">
        <div className="flex justify-between items-center border-b border-ink/30 pb-1 text-[11px] text-ink/75 font-bold">
          <span>ENTRY 14 — OCTOBER 14, 1974</span>
          <span>LOCATION: ARCHIVAL DESK 4</span>
        </div>
        <p className="font-serif text-sm text-ink/90 leading-relaxed italic">
          "The records have been altered. It took me three days to spot the discrepancy in the 1969 Presidio negative log. The coordinate telemetry numbers in the margin aren't an artifact of the Kodak optical stamp. Someone used an alphabet-to-number substitution: A=1, B=2, up to L=12. It points to a house on Washington Street."
        </p>
      </div>

      {/* Journal Entry 2 */}
      <div className="my-6 space-y-4 text-xs font-mono leading-relaxed">
        <div className="flex justify-between items-center border-b border-ink/30 pb-1 text-[11px] text-ink/75 font-bold">
          <span>ENTRY 21 — OCTOBER 22, 1974</span>
          <span>LOCATION: TELETYPE TERMINAL CORRIDOR</span>
        </div>
        <p className="font-serif text-sm text-ink/90 leading-relaxed italic">
          "Daniel Mercer warned me this morning. He found seven-character cipher codes penciled into the margins of the 408 worksheet. He thinks whoever placed them is monitoring our review sessions. If they know we are looking at the files, then every step we take has already been anticipated."
        </p>
      </div>

      {/* Journal Entry 3 — Ominous Realization */}
      <div className="my-6 p-4 bg-[#f4ece1] border-l-4 border-crimson text-xs font-mono leading-relaxed space-y-2">
        <div className="flex justify-between items-center text-[11px] font-bold text-crimson">
          <span>ENTRY 27 — OCTOBER 29, 1974 (FINAL WRITTEN PAGE)</span>
          <span>UNFINISHED ENTRY</span>
        </div>
        <p className="font-serif text-sm text-ink/95 leading-relaxed italic font-semibold">
          "I went to review the 16mm archival attachment reel. What I found wasn't police station footage. It was an inventory of expected investigator responses. They knew which files we would open first. They knew which ciphers we would solve.
          <br /><br />
          You have tried very hard to find the killer… But did you ever think about what would happen if he tried to find you?"
        </p>
      </div>

      <div className="mt-8 pt-3 border-t border-ink/40 flex justify-between font-mono text-[10px] text-ink/60 uppercase">
        <span>ARCHIVAL VAULT B // DEPOSIT BOX 17</span>
        <span>ATTACHMENT ENCLOSED: FINAL_REVIEW.MP4</span>
      </div>
    </div>
  );
}
