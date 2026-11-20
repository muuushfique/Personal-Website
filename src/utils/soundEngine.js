export const AMBIENT_TRACKS = [
  {
    id: 'mayabi',
    label: 'মায়াবী ঘর',
    mood: 'Warm Acoustic Guitar Arpeggio · 76 BPM',
    spotifyUrl: 'https://open.spotify.com/playlist/5Xk9mTY2zyylR0VbZgAIEY',
    bpm: 76,
    style: 'acoustic',
    // Fmaj7 -> Em7 -> Dm7 -> Cmaj7
    chords: [
      [174.61, 220.0, 261.63, 329.63],
      [164.81, 196.0, 246.94, 293.66],
      [146.83, 220.0, 261.63, 349.23],
      [130.81, 196.0, 246.94, 329.63],
    ],
    melody: [523.25, 659.25, 587.33, 523.25, 440.0, 523.25, 392.0, 440.0],
  },
  {
    id: 'carew',
    label: 'Half Glass Carew',
    mood: 'Midnight Indie Groove · 104 BPM',
    spotifyUrl: 'https://open.spotify.com/track/44MnDlUL9YOXdBgjwV6M2E',
    bpm: 104,
    style: 'groove',
    // Am9 -> G6 -> Fmaj7 -> E7
    chords: [
      [110.0, 220.0, 261.63, 329.63],
      [98.0, 196.0, 246.94, 329.63],
      [87.31, 174.61, 220.0, 329.63],
      [82.41, 164.81, 207.65, 293.66],
    ],
    melody: [440.0, 0, 523.25, 493.88, 392.0, 0, 329.63, 392.0],
  },
  {
    id: 'pakhi',
    label: 'Manush Pakhir Gaan',
    mood: 'Folk Flute & Bell Harmonics · 64 BPM',
    spotifyUrl: 'https://open.spotify.com/track/3wUDWYwwx1vAKGCIEcV14C',
    bpm: 64,
    style: 'folk',
    // D5 -> Bm7 -> Gmaj7 -> A5
    chords: [
      [146.83, 220.0, 293.66, 369.99],
      [123.47, 185.0, 246.94, 293.66],
      [196.0, 246.94, 293.66, 369.99],
      [220.0, 277.18, 329.63, 440.0],
    ],
    melody: [587.33, 739.99, 659.25, 587.33, 493.88, 587.33, 659.25, 440.0],
  },
  {
    id: 'shohor',
    label: 'Shohorer Duita Gaan',
    mood: 'Dhaka Lo-Fi Synth & Rain · 86 BPM',
    spotifyUrl: 'https://open.spotify.com/track/78ra1uZD52q7GBwsLVMTpK',
    bpm: 86,
    style: 'lofi',
    // Cm9 -> Abmaj7 -> Fm9 -> G7
    chords: [
      [130.81, 155.56, 196.0, 293.66],
      [103.83, 155.56, 196.0, 246.94],
      [174.61, 207.65, 261.63, 349.23],
      [196.0, 246.94, 293.66, 349.23],
    ],
    melody: [392.0, 466.16, 523.25, 0, 349.23, 392.0, 311.13, 293.66],
  },
];

class SoundEngine {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.trackId = 'mayabi';
    this.masterGain = null;
    this.delayNode = null;
    this.timerId = null;
    this.activeVoices = new Set();
    this.step = 0;
  }

  ensureContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return null;
      this.ctx = new AudioCtx();

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.value = 0.09;

      this.delayNode = this.ctx.createDelay(1.0);
      this.delayNode.delayTime.value = 0.34;
      const feedback = this.ctx.createGain();
      feedback.gain.value = 0.25;
      const wetFilter = this.ctx.createBiquadFilter();
      wetFilter.type = 'lowpass';
      wetFilter.frequency.value = 1200;

      this.delayNode.connect(wetFilter);
      wetFilter.connect(feedback);
      feedback.connect(this.delayNode);
      wetFilter.connect(this.masterGain);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  playTone({ freq, duration, peak, wave = 'sine', cutoff = 900, attack = 0.03, sendDelay = true }) {
    if (!this.ctx || !freq) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const filter = this.ctx.createBiquadFilter();
    const gain = this.ctx.createGain();

    osc.type = wave;
    osc.frequency.setValueAtTime(freq, now);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(cutoff, now);
    filter.frequency.exponentialRampToValueAtTime(Math.max(220, cutoff * 0.4), now + duration);

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.linearRampToValueAtTime(peak, now + attack);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);
    if (sendDelay) gain.connect(this.delayNode);

    const voice = { osc, gain };
    this.activeVoices.add(voice);
    osc.onended = () => this.activeVoices.delete(voice);

    osc.start(now);
    osc.stop(now + duration + 0.04);
  }

  playSoftPulse() {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(115, now);
    osc.frequency.exponentialRampToValueAtTime(42, now + 0.14);
    gain.gain.setValueAtTime(0.14, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.16);
    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start(now);
    osc.stop(now + 0.17);
  }

  start(trackId = this.trackId) {
    this.stop();
    this.trackId = trackId;
    const ctx = this.ensureContext();
    if (!ctx) return;

    const track = AMBIENT_TRACKS.find((t) => t.id === trackId) || AMBIENT_TRACKS[0];
    this.isPlaying = true;
    this.step = 0;

    // Eighth-note subdivision so each track has a clearly distinct rhythmic groove
    const stepMs = (60 / track.bpm / 2) * 1000;

    const tick = () => {
      if (!this.isPlaying) return;
      const chordIdx = Math.floor(this.step / 8) % track.chords.length;
      const chord = track.chords[chordIdx];
      const pos = this.step % 8;

      if (track.style === 'acoustic') {
        // Warm acoustic guitar fingerpicking pattern
        const pickNote = chord[pos % chord.length];
        this.playTone({ freq: pickNote * (pos >= 4 ? 2 : 1), duration: 0.75, peak: 0.08, wave: 'triangle', cutoff: 1200, attack: 0.012 });
        if (pos === 0) {
          this.playTone({ freq: chord[0] * 0.5, duration: 2.6, peak: 0.09, wave: 'sine', cutoff: 420, attack: 0.08 });
        }
      } else if (track.style === 'groove') {
        // Midnight Indie Groove: punchy sub-pulse + syncopated Rhodes stabs + upbeat melody
        if (pos === 0 || pos === 4) this.playSoftPulse();
        if (pos === 0 || pos === 3 || pos === 6) {
          chord.slice(1).forEach((f) =>
            this.playTone({ freq: f, duration: 0.42, peak: 0.055, wave: 'triangle', cutoff: 980, attack: 0.015 })
          );
        }
        const m = track.melody[pos];
        if (m) this.playTone({ freq: m, duration: 0.38, peak: 0.065, wave: 'sawtooth', cutoff: 760, attack: 0.015 });
      } else if (track.style === 'folk') {
        // Airy Folk Harmonics: wide floating fifths + crystal bell melody
        if (pos === 0) {
          chord.forEach((f) =>
            this.playTone({ freq: f, duration: 3.4, peak: 0.055, wave: 'sine', cutoff: 1400, attack: 0.35 })
          );
        }
        if (pos === 1 || pos === 4 || pos === 6) {
          const m = track.melody[pos];
          if (m) this.playTone({ freq: m, duration: 1.6, peak: 0.065, wave: 'sine', cutoff: 2000, attack: 0.04 });
        }
      } else {
        // Dhaka Lo-Fi Synth: moody warm minor chords + lo-fi kick on 0 & 5 + wistful lead
        if (pos === 0 || pos === 5) this.playSoftPulse();
        if (pos === 0) {
          chord.forEach((f, idx) =>
            this.playTone({ freq: f, duration: 2.3, peak: 0.06, wave: idx === 0 ? 'sine' : 'sawtooth', cutoff: 640, attack: 0.14 })
          );
        }
        const m = track.melody[pos];
        if (m && (pos === 2 || pos === 5 || pos === 7)) {
          this.playTone({ freq: m, duration: 0.85, peak: 0.06, wave: 'triangle', cutoff: 920, attack: 0.04 });
        }
      }

      this.step += 1;
    };

    tick();
    this.timerId = window.setInterval(tick, stepMs);
  }

  stop() {
    this.isPlaying = false;
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
    if (this.ctx) {
      const now = this.ctx.currentTime;
      this.activeVoices.forEach(({ osc, gain }) => {
        try {
          gain.gain.cancelScheduledValues(now);
          gain.gain.setTargetAtTime(0.0001, now, 0.03);
          osc.stop(now + 0.08);
        } catch {
          // ignore already stopped voices
        }
      });
      this.activeVoices.clear();
    }
  }

  toggle(requestedTrackId) {
    if (requestedTrackId && requestedTrackId !== this.trackId) {
      this.start(requestedTrackId);
      return true;
    }
    if (this.isPlaying) {
      this.stop();
      return false;
    }
    this.start(this.trackId);
    return true;
  }

  nextTrack() {
    const idx = AMBIENT_TRACKS.findIndex((t) => t.id === this.trackId);
    const next = AMBIENT_TRACKS[(idx + 1) % AMBIENT_TRACKS.length];
    this.start(next.id);
    return next.id;
  }

  click() {
    if (!this.isPlaying) return;
    this.playTone({ freq: 520, duration: 0.07, peak: 0.03, wave: 'sine', cutoff: 900, sendDelay: false });
  }
}

export const soundEngine = new SoundEngine();
