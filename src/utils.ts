/**
 * Card flip sound generator using the Web Audio API
 */
let audioCtx: AudioContext | null = null;

export function ensureAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  
  try {
    const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioCtxClass) return null;
    
    if (!audioCtx) {
      audioCtx = new AudioCtxClass();
    }
    
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    
    return audioCtx;
  } catch (err) {
    console.warn('Failed to initialize Web Audio Context', err);
    return null;
  }
}

export function playCardFlipSound() {
  const ctx = ensureAudioContext();
  if (!ctx) return;
  
  try {
    const now = ctx.currentTime;

    // 1. Whoosh/Swish sound using white noise burst
    const bufLen = ctx.sampleRate * 0.18;
    const buf = ctx.createBuffer(1, bufLen, ctx.sampleRate);
    const data = buf.getChannelData(0);
    
    for (let i = 0; i < bufLen; i++) {
      data[i] = (Math.random() * 2 - 1) * (1 - i / bufLen);
    }
    
    const noise = ctx.createBufferSource();
    noise.buffer = buf;

    // Band-pass filter to shape the noise into a "papery" swish
    const bp = ctx.createBiquadFilter();
    bp.type = 'bandpass';
    bp.frequency.setValueAtTime(2800, now);
    bp.Q.setValueAtTime(0.9, now);

    // Envelope for the whoosh
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.45, now + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

    noise.connect(bp);
    bp.connect(gain);
    gain.connect(ctx.destination);
    noise.start(now);
    noise.stop(now + 0.2);

    // 2. Click sound for the card landing/tapping the table
    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(420, now);
    osc.frequency.exponentialRampToValueAtTime(120, now + 0.09);
    
    const og = ctx.createGain();
    og.gain.setValueAtTime(0.18, now);
    og.gain.exponentialRampToValueAtTime(0.001, now + 0.09);
    
    osc.connect(og);
    og.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.1);
  } catch (err) {
    console.error('Error playing card flip sound:', err);
  }
}
