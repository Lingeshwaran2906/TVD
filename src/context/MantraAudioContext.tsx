import React, { createContext, useContext, useEffect, useRef, useState } from 'react';

interface MantraAudioContextType {
  isPlaying: boolean;
  isMuted: boolean;
  volume: number;
  togglePlay: () => void;
  toggleMute: () => void;
  handleTopRightAudioTap: () => void;
  setVolume: (v: number) => void;
  chantCount: number;
  incrementChant: () => void;
  resetChant: () => void;
  playTempleBell: (isMajor?: boolean) => void;
}

const MantraAudioContext = createContext<MantraAudioContextType | undefined>(undefined);

export const MantraAudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [volume, setVolumeState] = useState<number>(0.75);
  const [chantCount, setChantCount] = useState<number>(0);

  const audioElementRef = useRef<HTMLAudioElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Play realistic bronze temple bell chime with multi-partial metallic resonance
  const playTempleBell = (isMajor: boolean = false) => {
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx =
        audioCtxRef.current && audioCtxRef.current.state === 'running'
          ? audioCtxRef.current
          : new AudioCtx();
      audioCtxRef.current = ctx;

      const now = ctx.currentTime;
      const bellGain = ctx.createGain();
      bellGain.gain.setValueAtTime(isMuted ? 0 : volume * (isMajor ? 0.35 : 0.22), now);
      bellGain.connect(ctx.destination);

      // Inharmonic partials characteristic of South Indian temple bronze bells (ghanta)
      const baseFreq = isMajor ? 576 : 432;
      const partials = [
        { mult: 1.0, decay: 3.5, gain: 0.8 },
        { mult: 2.76, decay: 2.8, gain: 0.5 },
        { mult: 4.07, decay: 2.2, gain: 0.35 },
        { mult: 5.43, decay: 1.8, gain: 0.2 },
        { mult: 6.89, decay: 1.2, gain: 0.1 },
      ];

      partials.forEach(({ mult, decay, gain: pGain }) => {
        const osc = ctx.createOscillator();
        const pNode = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(baseFreq * mult, now);

        pNode.gain.setValueAtTime(pGain, now);
        pNode.gain.exponentialRampToValueAtTime(0.0001, now + decay);

        osc.connect(pNode);
        pNode.connect(bellGain);

        osc.start(now);
        osc.stop(now + decay);
      });
    } catch {}
  };

  // Toggle Play / Pause for the M4A sacred mantra
  const togglePlay = () => {
    if (!audioElementRef.current) return;

    if (isPlaying) {
      audioElementRef.current.pause();
      setIsPlaying(false);
    } else {
      audioElementRef.current.muted = isMuted;
      audioElementRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {});
    }
  };

  // Toggle Mute / Unmute
  const toggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);

    if (audioElementRef.current) {
      audioElementRef.current.muted = nextMuted;
      if (!nextMuted && audioElementRef.current.paused) {
        audioElementRef.current
          .play()
          .then(() => setIsPlaying(true))
          .catch(() => {});
      }
    }
  };

  // Dedicated handler for the top-right audio icon requested by user:
  // "this mantra auto play on this web by tapping mute inly it to be muted okay"
  const handleTopRightAudioTap = () => {
    if (!audioElementRef.current) return;

    if (!isPlaying) {
      audioElementRef.current.muted = false;
      setIsMuted(false);
      audioElementRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    } else {
      toggleMute();
    }
  };

  const setVolume = (newVol: number) => {
    setVolumeState(newVol);
    if (audioElementRef.current) {
      audioElementRef.current.volume = newVol;
    }
  };

  const incrementChant = () => {
    setChantCount((prev) => {
      const next = prev + 1;
      playTempleBell(next === 108);
      return next > 108 ? 1 : next;
    });
  };

  const resetChant = () => {
    setChantCount(0);
  };

  // Initialize and Autoplay the sacred M4A recording on website mount
  useEffect(() => {
    const audio = new Audio('/assets/aistudio/MANTRA_15796b16.m4a');
    audio.loop = true;
    audio.preload = 'auto';
    audio.volume = volume;
    audio.muted = isMuted;
    audioElementRef.current = audio;

    // Track play/pause state
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);

    // Initial autoplay attempt
    const startPromise = audio.play();
    if (startPromise !== undefined) {
      startPromise
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          // Modern browser autoplay policy requires user gesture.
          // Listen for the very first interaction anywhere on page:
          const onFirstInteraction = () => {
            if (audioElementRef.current && audioElementRef.current.paused) {
              audioElementRef.current
                .play()
                .then(() => setIsPlaying(true))
                .catch(() => {});
            }
            ['click', 'pointerdown', 'touchstart', 'keydown', 'scroll'].forEach((ev) => {
              window.removeEventListener(ev, onFirstInteraction);
            });
          };

          ['click', 'pointerdown', 'touchstart', 'keydown', 'scroll'].forEach((ev) => {
            window.addEventListener(ev, onFirstInteraction, { once: true, passive: true });
          });
        });
    }

    return () => {
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.pause();
      audioElementRef.current = null;
    };
  }, []);

  return (
    <MantraAudioContext.Provider
      value={{
        isPlaying,
        isMuted,
        volume,
        togglePlay,
        toggleMute,
        handleTopRightAudioTap,
        setVolume,
        chantCount,
        incrementChant,
        resetChant,
        playTempleBell,
      }}
    >
      {children}
    </MantraAudioContext.Provider>
  );
};

export function useMantraAudio() {
  const context = useContext(MantraAudioContext);
  if (!context) {
    throw new Error('useMantraAudio must be used within a MantraAudioProvider');
  }
  return context;
}
