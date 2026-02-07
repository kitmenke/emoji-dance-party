"use client";

import React, { useState, useEffect, useCallback } from "react";
import DancingBanana from "@/components/DancingBanana";

export default function VeggieDancePage() {
  const [bpm, setBpm] = useState(0);
  const [taps, setTaps] = useState<number[]>([]);
  const [lastTapTime, setLastTapTime] = useState<number | null>(null);
  const [bananaCount, setBananaCount] = useState(1);
  const [selectedEmoji, setSelectedEmoji] = useState("🍌");

  const emojiOptions = [
    "🍌", "🍎", "🍊", "🍋", "🍇", "🍓", "🍑", "🍒", "🥑", "🥕", "🌽", "🥦", "🍆", "🌶️", "🥒", "🍅"
  ];

  const calculateBpm = useCallback((tapTimestamps: number[]) => {
    if (tapTimestamps.length < 2) return 0;

    // Use last 8 taps for calculation
    const recentTaps = tapTimestamps.slice(-8);
    
    // Calculate intervals between taps
    const intervals: number[] = [];
    for (let i = 1; i < recentTaps.length; i++) {
      intervals.push(recentTaps[i] - recentTaps[i - 1]);
    }

    // Average interval in ms
    const avgInterval = intervals.reduce((a, b) => a + b, 0) / intervals.length;
    
    // Convert to BPM (ms to minutes)
    const calculatedBpm = Math.round(60000 / avgInterval);
    
    // Clamp to reasonable range
    return Math.min(Math.max(calculatedBpm, 30), 300);
  }, []);

  const handleTap = useCallback(() => {
    const now = Date.now();
    
    // Reset if more than 2 seconds since last tap
    if (lastTapTime && now - lastTapTime > 2000) {
      setTaps([now]);
      setLastTapTime(now);
      setBpm(0);
      return;
    }

    const newTaps = [...taps, now];
    setTaps(newTaps);
    setLastTapTime(now);
    setBpm(calculateBpm(newTaps));
  }, [taps, lastTapTime, calculateBpm]);

  const handleReset = useCallback(() => {
    setTaps([]);
    setLastTapTime(null);
    setBpm(0);
  }, []);

  const handleAddBananas = useCallback(() => {
    setBananaCount((prev) => prev + 2);
  }, []);

  const handleRemoveBananas = useCallback(() => {
    setBananaCount((prev) => Math.max(1, prev - 2));
  }, []);

  const handleNextEmoji = useCallback(() => {
    setSelectedEmoji((prev) => {
      const currentIndex = emojiOptions.indexOf(prev);
      const nextIndex = (currentIndex + 1) % emojiOptions.length;
      return emojiOptions[nextIndex];
    });
  }, [emojiOptions]);

  const handlePrevEmoji = useCallback(() => {
    setSelectedEmoji((prev) => {
      const currentIndex = emojiOptions.indexOf(prev);
      const prevIndex = (currentIndex - 1 + emojiOptions.length) % emojiOptions.length;
      return emojiOptions[prevIndex];
    });
  }, [emojiOptions]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space" && !e.repeat) {
        e.preventDefault();
        handleTap();
      }
      if (e.code === "ArrowUp" && !e.repeat) {
        e.preventDefault();
        handleAddBananas();
      }
      if (e.code === "ArrowDown" && !e.repeat) {
        e.preventDefault();
        handleRemoveBananas();
      }
      if (e.code === "ArrowRight" && !e.repeat) {
        e.preventDefault();
        handleNextEmoji();
      }
      if (e.code === "ArrowLeft" && !e.repeat) {
        e.preventDefault();
        handlePrevEmoji();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleTap, handleAddBananas, handleRemoveBananas, handleNextEmoji, handlePrevEmoji]);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-zinc-950 via-purple-950/20 to-zinc-950 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(250,204,21,0.08),transparent_50%)]" />
      
      {/* Header */}
      <header className="absolute top-8 left-8 z-20">
        <a href="/" className="text-xs font-bold text-zinc-600 uppercase tracking-widest hover:text-white transition-colors">
          ← Back
        </a>
        <h1 className="mt-2 text-3xl font-black tracking-tighter text-white">
          Dance Party
        </h1>
        <p className="text-xs text-zinc-500 uppercase tracking-widest mt-1">
          BPM Rhythm Visualizer
        </p>
        
        {/* Emoji Picker */}
        <div className="mt-4 flex flex-wrap gap-2 max-w-xs">
          {emojiOptions.map((emoji) => (
            <button
              key={emoji}
              onClick={() => setSelectedEmoji(emoji)}
              className={`text-2xl p-1 rounded-lg transition-all hover:scale-125 ${
                selectedEmoji === emoji 
                  ? "bg-white/20 ring-2 ring-yellow-400" 
                  : "hover:bg-white/10"
              }`}
            >
              {emoji}
            </button>
          ))}
        </div>
      </header>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center gap-12">
        {/* Dancing Emojis */}
        <div key={`${bananaCount}-${selectedEmoji}`} className="flex flex-wrap items-center justify-center gap-4">
          {Array.from({ length: bananaCount }).map((_, i) => (
            <DancingBanana key={i} bpm={bpm} emoji={selectedEmoji} />
          ))}
        </div>

        {/* BPM Display */}
        <div className="text-center">
          <div className="text-8xl font-black tracking-tighter text-white tabular-nums">
            {bpm || "—"}
          </div>
          <div className="text-xs font-bold text-zinc-500 uppercase tracking-[0.3em] mt-2">
            Beats Per Minute
          </div>
        </div>

        {/* Tap Indicator */}
        <div className="flex flex-col items-center gap-4">
          <button
            onClick={handleTap}
            className="group relative px-12 py-4 rounded-full bg-white/5 border border-white/10 text-white font-bold uppercase tracking-widest text-sm transition-all hover:bg-white/10 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-yellow-400/50"
          >
            <span className="relative z-10">Tap Space</span>
            <div className="absolute inset-0 rounded-full bg-yellow-400/20 opacity-0 group-active:opacity-100 transition-opacity" />
          </button>
          
          <div className="flex items-center gap-4">
            <span className="text-[10px] text-zinc-600 uppercase tracking-wider">
              {taps.length} taps recorded
            </span>
            {taps.length > 0 && (
              <button
                onClick={handleReset}
                className="text-[10px] text-zinc-500 uppercase tracking-wider hover:text-white transition-colors"
              >
                Reset
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center">
        <p className="text-[10px] text-zinc-600 font-medium uppercase tracking-widest">
          <kbd className="px-2 py-1 rounded bg-white/5 border border-white/10 text-zinc-400 mx-1">SPACE</kbd> tap beat
          <span className="mx-2">•</span>
          <kbd className="px-2 py-1 rounded bg-white/5 border border-white/10 text-zinc-400 mx-1">↑↓</kbd> add/remove
          <span className="mx-2">•</span>
          <kbd className="px-2 py-1 rounded bg-white/5 border border-white/10 text-zinc-400 mx-1">←→</kbd> change emoji
        </p>
      </div>
    </div>
  );
}
