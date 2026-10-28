/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * TACTICAL INTERFACE & AMBIENT AUDIO SYSTEM
 * 
 * Inspired by the dry, restrained, mechanical interface sounds of classic
 * tactical games (such as Project IGI). Pure Web Audio API synthesis:
 * - Zero external media files or 404 network assets
 * - Procedural mechanical relay clicks, microswitch clicks, paper rustle,
 *   crisp evidence selection, teletype keystrokes, authentic confirmation
 *   chimes, and dull error buzzes.
 * - Independent SFX and Ambience channels with separate volume and mute controls.
 * - Defaults BOTH categories to MUTED until explicitly enabled by the user.
 * - Persisted across page reloads and route changes via localStorage.
 * - No hover sounds. Cooldown protection against double-triggering.
 */

export interface TacticalAudioState {
  sfxMuted: boolean;
  sfxVolume: number;
  ambientMuted: boolean;
  ambientVolume: number;
  rainMuted: boolean;
  rainVolume: number;
}

type AudioStateSubscriber = (state: TacticalAudioState) => void;

class TacticalAudioController {
  private ctx: AudioContext | null = null;
  private sfxGain: GainNode | null = null;
  private ambientGain: GainNode | null = null;
  private masterGain: GainNode | null = null;

  private windGain: GainNode | null = null;
  private staticGain: GainNode | null = null;
  private rainGain: GainNode | null = null;
  private rainSource: AudioNode | null = null;

  private sfxMuted = true;
  private sfxVolume = 0.25;
  private ambientMuted = true;
  private ambientVolume = 0.18;
  private rainMuted = true;
  private rainVolume = 0.15;

  private isInitialized = false;
  private lastNavClickTime = 0;
  private lastBtnClickTime = 0;
  private lastKeypressTime = 0;
  private lastGlitchTime = 0;

  private subscribers: Set<AudioStateSubscriber> = new Set();

  constructor() {
    this.loadPreferences();

    // Auto-suspend when document is hidden to conserve resources
    if (typeof document !== 'undefined') {
      document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
          this.suspendContext();
        } else if (!this.ambientMuted) {
          this.resumeContext();
        }
      });
    }
  }

  private loadPreferences() {
    try {
      const storedSfxMute = localStorage.getItem('tls_sfx_muted_v1');
      if (storedSfxMute !== null) {
        this.sfxMuted = storedSfxMute === 'true';
      } else {
        this.sfxMuted = true; // Default muted
      }

      const storedSfxVol = localStorage.getItem('tls_sfx_volume_v1');
      if (storedSfxVol !== null) {
        const v = parseFloat(storedSfxVol);
        if (!isNaN(v) && v >= 0 && v <= 1) this.sfxVolume = v;
      }

      const storedAmbMute = localStorage.getItem('tls_ambient_muted_v1') ?? localStorage.getItem('tls_audio_muted_v1');
      if (storedAmbMute !== null) {
        this.ambientMuted = storedAmbMute === 'true';
      } else {
        this.ambientMuted = true; // Default muted
      }

      const storedAmbVol = localStorage.getItem('tls_ambient_volume_v1') ?? localStorage.getItem('tls_audio_volume_v1');
      if (storedAmbVol !== null) {
        const v = parseFloat(storedAmbVol);
        if (!isNaN(v) && v >= 0 && v <= 1) this.ambientVolume = v;
      }

      const storedRainMute = localStorage.getItem('tls_rain_muted_v1');
      if (storedRainMute !== null) {
        this.rainMuted = storedRainMute === 'true';
      } else {
        this.rainMuted = true; // Default muted
      }

      const storedRainVol = localStorage.getItem('tls_rain_volume_v1');
      if (storedRainVol !== null) {
        const v = parseFloat(storedRainVol);
        if (!isNaN(v) && v >= 0 && v <= 1) this.rainVolume = v;
      }
    } catch {
      // localStorage unavailable fallback
    }
  }

  private initAudio() {
    if (this.isInitialized || typeof window === 'undefined') return;

    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();

      // Master Node
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(1.0, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);

      // SFX Channel Gain
      this.sfxGain = this.ctx.createGain();
      this.sfxGain.gain.setValueAtTime(this.sfxMuted ? 0 : this.sfxVolume, this.ctx.currentTime);
      this.sfxGain.connect(this.masterGain);

      // Ambient Channel Gain
      this.ambientGain = this.ctx.createGain();
      this.ambientGain.gain.setValueAtTime(this.ambientMuted ? 0 : this.ambientVolume, this.ctx.currentTime);
      this.ambientGain.connect(this.masterGain);

      // --- Wind Synthesizer (Resonant Low-Pass Filtered Pink Noise + LFO) ---
      const bufferSize = this.ctx.sampleRate * 2;
      const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);

      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.11;
        b6 = white * 0.115926;
      }

      const windSource = this.ctx.createBufferSource();
      windSource.buffer = noiseBuffer;
      windSource.loop = true;

      const windFilter = this.ctx.createBiquadFilter();
      windFilter.type = 'lowpass';
      windFilter.frequency.setValueAtTime(220, this.ctx.currentTime);
      windFilter.Q.setValueAtTime(2.2, this.ctx.currentTime);

      const lfo = this.ctx.createOscillator();
      lfo.frequency.setValueAtTime(0.12, this.ctx.currentTime); // ~8 sec gust
      const lfoGain = this.ctx.createGain();
      lfoGain.gain.setValueAtTime(80, this.ctx.currentTime);
      lfo.connect(lfoGain);
      lfoGain.connect(windFilter.frequency);
      lfo.start();

      this.windGain = this.ctx.createGain();
      this.windGain.gain.setValueAtTime(0.7, this.ctx.currentTime);

      windSource.connect(windFilter);
      windFilter.connect(this.windGain);
      this.windGain.connect(this.ambientGain);
      windSource.start();

      // --- Static Crackle Synthesizer (Band-pass noise) ---
      const staticBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const staticData = staticBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        staticData[i] = (Math.random() * 2 - 1) * 0.04;
      }

      const staticSource = this.ctx.createBufferSource();
      staticSource.buffer = staticBuffer;
      staticSource.loop = true;

      const staticFilter = this.ctx.createBiquadFilter();
      staticFilter.type = 'bandpass';
      staticFilter.frequency.setValueAtTime(2400, this.ctx.currentTime);
      staticFilter.Q.setValueAtTime(4.0, this.ctx.currentTime);

      this.staticGain = this.ctx.createGain();
      this.staticGain.gain.setValueAtTime(0.18, this.ctx.currentTime);

      staticSource.connect(staticFilter);
      staticFilter.connect(this.staticGain);
      this.staticGain.connect(this.ambientGain);
      staticSource.start();

      // --- Procedural Rain Synthesizer (Atmospheric low-end rainfall + soft droplet wash) ---
      const rainBuffer = this.ctx.createBuffer(1, bufferSize * 2, this.ctx.sampleRate);
      const rainData = rainBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize * 2; i++) {
        // Soft pink noise base with occasional droplet density
        const n = Math.random() * 2 - 1;
        rainData[i] = n * 0.08;
      }

      const rainSource = this.ctx.createBufferSource();
      rainSource.buffer = rainBuffer;
      rainSource.loop = true;

      const rainFilter = this.ctx.createBiquadFilter();
      rainFilter.type = 'lowpass';
      rainFilter.frequency.setValueAtTime(1150, this.ctx.currentTime);
      rainFilter.Q.setValueAtTime(0.7, this.ctx.currentTime);

      this.rainGain = this.ctx.createGain();
      this.rainGain.gain.setValueAtTime(this.rainMuted ? 0 : this.rainVolume, this.ctx.currentTime);

      rainSource.connect(rainFilter);
      rainFilter.connect(this.rainGain);
      this.rainGain.connect(this.ambientGain);
      rainSource.start();
      this.rainSource = rainSource;

      this.isInitialized = true;
    } catch (e) {
      console.warn('Tactical Audio failed initialization:', e);
    }
  }

  private async resumeContext() {
    if (!this.isInitialized) {
      this.initAudio();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      try {
        await this.ctx.resume();
      } catch {
        // Handled
      }
    }
  }

  private suspendContext() {
    if (this.ctx && this.ctx.state === 'running') {
      try {
        this.ctx.suspend();
      } catch {
        // Handled
      }
    }
  }

  /* =========================================================================
     TACTICAL SOUND SYNTHESIS METHODS (DRY, MECHANICAL, NON-HARSH)
     ========================================================================= */

  /**
   * Short, crisp mechanical relay click when navigating between major pages.
   */
  public playNavClick(): void {
    if (this.sfxMuted) return;
    const now = performance.now();
    if (now - this.lastNavClickTime < 80) return; // Deduplicate
    this.lastNavClickTime = now;

    this.resumeContext();
    if (!this.ctx || !this.sfxGain) return;

    try {
      const t = this.ctx.currentTime;
      // Damped impulse: short high click followed by microswitch snap
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1400, t);
      filter.Q.setValueAtTime(3.5, t);

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(1200, t);
      osc.frequency.exponentialRampToValueAtTime(180, t + 0.022);

      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(0.5, t + 0.003);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.025);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.sfxGain);

      osc.start(t);
      osc.stop(t + 0.03);
    } catch {
      // Audio node failure fallback
    }
  }

  /**
   * Mechanical microswitch click for selecting tabs, opening menus, activating buttons.
   */
  public playButtonClick(): void {
    if (this.sfxMuted) return;
    const now = performance.now();
    if (now - this.lastBtnClickTime < 60) return;
    this.lastBtnClickTime = now;

    this.resumeContext();
    if (!this.ctx || !this.sfxGain) return;

    try {
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(950, t);
      osc.frequency.exponentialRampToValueAtTime(320, t + 0.018);

      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(0.4, t + 0.002);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.02);

      osc.connect(gain);
      gain.connect(this.sfxGain);

      osc.start(t);
      osc.stop(t + 0.025);
    } catch {
      // Audio node fallback
    }
  }

  /**
   * Subtle paper / archival dossier opening rustle.
   */
  public playDocOpen(): void {
    if (this.sfxMuted) return;
    this.resumeContext();
    if (!this.ctx || !this.sfxGain) return;

    try {
      const t = this.ctx.currentTime;
      const duration = 0.09;
      const buffer = this.ctx.createBuffer(1, Math.floor(this.ctx.sampleRate * duration), this.ctx.sampleRate);
      const data = buffer.getChannelData(0);

      // Band-passed friction noise
      for (let i = 0; i < data.length; i++) {
        data[i] = (Math.random() * 2 - 1) * 0.3;
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(800, t);
      filter.frequency.linearRampToValueAtTime(1400, t + duration);
      filter.Q.setValueAtTime(2.0, t);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(0.35, t + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.001, t + duration);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.sfxGain);

      noise.start(t);
      noise.stop(t + duration);
    } catch {
      // Fallback
    }
  }

  /**
   * Quiet crisp selection sound when selecting a map location or evidence item.
   */
  public playSelect(): void {
    if (this.sfxMuted) return;
    this.resumeContext();
    if (!this.ctx || !this.sfxGain) return;

    try {
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(1480, t);
      osc.frequency.exponentialRampToValueAtTime(880, t + 0.015);

      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(0.3, t + 0.002);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.018);

      osc.connect(gain);
      gain.connect(this.sfxGain);

      osc.start(t);
      osc.stop(t + 0.022);
    } catch {
      // Fallback
    }
  }

  /**
   * Quiet teletype / mechanical keyboard keystroke sound.
   */
  public playKeypress(): void {
    if (this.sfxMuted) return;
    const now = performance.now();
    if (now - this.lastKeypressTime < 40) return; // Prevent key clatter spam
    this.lastKeypressTime = now;

    this.resumeContext();
    if (!this.ctx || !this.sfxGain) return;

    try {
      const t = this.ctx.currentTime;
      // Slight pitch variance for organic typewriter feel
      const baseFreq = 1100 + Math.random() * 250;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'square';
      osc.frequency.setValueAtTime(baseFreq, t);
      osc.frequency.exponentialRampToValueAtTime(240, t + 0.012);

      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(0.12, t + 0.002);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.014);

      osc.connect(gain);
      gain.connect(this.sfxGain);

      osc.start(t);
      osc.stop(t + 0.018);
    } catch {
      // Fallback
    }
  }

  /**
   * Restrained, dignified tactical confirmation chime.
   * Plays ONLY upon genuine successful solve validation.
   */
  public playSuccess(): void {
    if (this.sfxMuted) return;
    this.resumeContext();
    if (!this.ctx || !this.sfxGain) return;

    try {
      const t = this.ctx.currentTime;
      
      // Dual resonant sine chime (523Hz C5 -> 784Hz G5)
      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const gain1 = this.ctx.createGain();
      const gain2 = this.ctx.createGain();

      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(523.25, t);
      gain1.gain.setValueAtTime(0.001, t);
      gain1.gain.linearRampToValueAtTime(0.35, t + 0.01);
      gain1.gain.exponentialRampToValueAtTime(0.001, t + 0.28);

      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(783.99, t + 0.08);
      gain2.gain.setValueAtTime(0.001, t + 0.08);
      gain2.gain.linearRampToValueAtTime(0.4, t + 0.09);
      gain2.gain.exponentialRampToValueAtTime(0.001, t + 0.38);

      osc1.connect(gain1);
      gain1.connect(this.sfxGain);
      osc2.connect(gain2);
      gain2.connect(this.sfxGain);

      osc1.start(t);
      osc1.stop(t + 0.3);
      osc2.start(t + 0.08);
      osc2.stop(t + 0.4);
    } catch {
      // Fallback
    }
  }

  /**
   * Subtle dull reject buzz on actual incorrect credential submission.
   */
  public playError(): void {
    if (this.sfxMuted) return;
    this.resumeContext();
    if (!this.ctx || !this.sfxGain) return;

    try {
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(280, t);

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(110, t);
      osc.frequency.linearRampToValueAtTime(95, t + 0.14);

      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(0.25, t + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.15);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.sfxGain);

      osc.start(t);
      osc.stop(t + 0.16);
    } catch {
      // Fallback
    }
  }

  /**
   * Controlled electronic glitch interference burst (180ms filtered crackle).
   * Restrained, non-startling, calibrated for investigative terminal interference.
   */
  public playGlitchInterference(): void {
    if (this.sfxMuted) return;
    const now = performance.now();
    if (now - this.lastGlitchTime < 120) return;
    this.lastGlitchTime = now;

    this.resumeContext();
    if (!this.ctx || !this.sfxGain) return;

    try {
      const t = this.ctx.currentTime;
      const bufferSize = Math.floor(this.ctx.sampleRate * 0.18);
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);

      for (let i = 0; i < bufferSize; i++) {
        // High frequency erratic impulses
        data[i] = (Math.random() > 0.85 ? (Math.random() * 2 - 1) : 0) * 0.22;
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(3200, t);
      filter.Q.setValueAtTime(2.0, t);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(0.18, t + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.18);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.sfxGain);

      noise.start(t);
      noise.stop(t + 0.18);
    } catch {
      // Fallback
    }
  }

  /**
   * Low-frequency carrier hum pulse (60Hz/120Hz transformer surge).
   */
  public playGlitchHum(): void {
    if (this.sfxMuted) return;
    this.resumeContext();
    if (!this.ctx || !this.sfxGain) return;

    try {
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(60, t);
      osc.frequency.linearRampToValueAtTime(58, t + 0.35);

      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(0.12, t + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.35);

      osc.connect(gain);
      gain.connect(this.sfxGain);

      osc.start(t);
      osc.stop(t + 0.36);
    } catch {
      // Fallback
    }
  }

  /* =========================================================================
     MUTE & VOLUME CONTROLS (INDEPENDENT CHANNELS)
     ========================================================================= */

  public isSfxMuted(): boolean {
    return this.sfxMuted;
  }

  public getSfxVolume(): number {
    return this.sfxVolume;
  }

  public async toggleSfxMute(): Promise<boolean> {
    this.sfxMuted = !this.sfxMuted;
    if (!this.sfxMuted) {
      await this.resumeContext();
    }
    if (this.sfxGain && this.ctx) {
      this.sfxGain.gain.setValueAtTime(this.sfxMuted ? 0 : this.sfxVolume, this.ctx.currentTime);
    }
    try {
      localStorage.setItem('tls_sfx_muted_v1', String(this.sfxMuted));
    } catch {
      // Ignored
    }
    if (!this.sfxMuted) {
      // Play a reassuring feedback click upon unmuting SFX
      this.playButtonClick();
    }
    this.notify();
    return this.sfxMuted;
  }

  public setSfxVolume(vol: number): void {
    this.sfxVolume = Math.max(0, Math.min(1, vol));
    if (!this.sfxMuted && this.sfxGain && this.ctx) {
      this.sfxGain.gain.setValueAtTime(this.sfxVolume, this.ctx.currentTime);
    }
    try {
      localStorage.setItem('tls_sfx_volume_v1', String(this.sfxVolume));
    } catch {
      // Ignored
    }
    this.notify();
  }

  public isAmbientMuted(): boolean {
    return this.ambientMuted;
  }

  public getAmbientVolume(): number {
    return this.ambientVolume;
  }

  public async toggleAmbientMute(): Promise<boolean> {
    this.ambientMuted = !this.ambientMuted;
    if (!this.ambientMuted) {
      await this.resumeContext();
    }
    if (this.ambientGain && this.ctx) {
      const now = this.ctx.currentTime;
      this.ambientGain.gain.cancelScheduledValues(now);
      this.ambientGain.gain.linearRampToValueAtTime(this.ambientMuted ? 0 : this.ambientVolume, now + 0.15);
    }
    try {
      localStorage.setItem('tls_ambient_muted_v1', String(this.ambientMuted));
      localStorage.setItem('tls_audio_muted_v1', String(this.ambientMuted));
    } catch {
      // Ignored
    }
    this.notify();
    return this.ambientMuted;
  }

  public setAmbientVolume(vol: number): void {
    this.ambientVolume = Math.max(0, Math.min(1, vol));
    if (!this.ambientMuted && this.ambientGain && this.ctx) {
      const now = this.ctx.currentTime;
      this.ambientGain.gain.cancelScheduledValues(now);
      this.ambientGain.gain.linearRampToValueAtTime(this.ambientVolume, now + 0.1);
    }
    try {
      localStorage.setItem('tls_ambient_volume_v1', String(this.ambientVolume));
      localStorage.setItem('tls_audio_volume_v1', String(this.ambientVolume));
    } catch {
      // Ignored
    }
    this.notify();
  }

  public isRainMuted(): boolean {
    return this.rainMuted;
  }

  public getRainVolume(): number {
    return this.rainVolume;
  }

  public async toggleRainMute(): Promise<boolean> {
    this.rainMuted = !this.rainMuted;
    if (!this.rainMuted) {
      await this.resumeContext();
    }
    if (this.rainGain && this.ctx) {
      const now = this.ctx.currentTime;
      this.rainGain.gain.cancelScheduledValues(now);
      this.rainGain.gain.linearRampToValueAtTime(this.rainMuted ? 0 : this.rainVolume, now + 0.15);
    }
    try {
      localStorage.setItem('tls_rain_muted_v1', String(this.rainMuted));
    } catch {
      // Ignored
    }
    this.notify();
    return this.rainMuted;
  }

  public setRainVolume(vol: number): void {
    this.rainVolume = Math.max(0, Math.min(1, vol));
    if (!this.rainMuted && this.rainGain && this.ctx) {
      const now = this.ctx.currentTime;
      this.rainGain.gain.cancelScheduledValues(now);
      this.rainGain.gain.linearRampToValueAtTime(this.rainVolume, now + 0.1);
    }
    try {
      localStorage.setItem('tls_rain_volume_v1', String(this.rainVolume));
    } catch {
      // Ignored
    }
    this.notify();
  }

  public subscribe(fn: AudioStateSubscriber): () => void {
    this.subscribers.add(fn);
    fn(this.getState());
    return () => this.subscribers.delete(fn);
  }

  public getState(): TacticalAudioState {
    return {
      sfxMuted: this.sfxMuted,
      sfxVolume: this.sfxVolume,
      ambientMuted: this.ambientMuted,
      ambientVolume: this.ambientVolume,
      rainMuted: this.rainMuted,
      rainVolume: this.rainVolume,
    };
  }

  private notify(): void {
    const st = this.getState();
    this.subscribers.forEach((fn) => fn(st));
  }
}

export const tacticalAudio = new TacticalAudioController();
