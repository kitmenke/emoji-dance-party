"use client";

import React from "react";

interface DancingBananaProps {
  bpm: number;
}

export default function DancingBanana({ bpm }: DancingBananaProps) {
  // Calculate animation duration from BPM (half-time = one sway every 2 beats)
  // Default to 2 seconds if bpm is 0 or undefined
  const beatDuration = bpm > 0 ? (60 / bpm) * 2 : 2;

  return (
    <div
      className="relative text-[200px] leading-none select-none"
      style={{
        animation: `dance ${beatDuration}s ease-in-out infinite`,
      }}
    >
      <style jsx>{`
        @keyframes dance {
          0%, 100% {
            transform: rotate(-15deg) scale(1);
          }
          25% {
            transform: rotate(-15deg) scale(1.05);
          }
          50% {
            transform: rotate(15deg) scale(1);
          }
          75% {
            transform: rotate(15deg) scale(1.05);
          }
        }
      `}</style>
      
      {/* Banana emoji with glow effect */}
      <span 
        className="inline-block drop-shadow-[0_0_40px_rgba(250,204,21,0.5)]"
        role="img" 
        aria-label="dancing banana"
      >
        🍌
      </span>
    </div>
  );
}
