"use client";

import React from "react";

interface DancingBananaProps {
  bpm: number;
  emoji?: string;
  size?: number;
}

export default function DancingBanana({ bpm, emoji = "🍌", size = 200 }: DancingBananaProps) {
  // Calculate animation duration from BPM (quarter-time = one sway every 4 beats)
  // Default to 4 seconds if bpm is 0 or undefined
  const beatDuration = bpm > 0 ? (60 / bpm) * 4 : 4;

  return (
    <div
      className="relative leading-none select-none"
      style={{
        fontSize: `${size}px`,
        animation: `dance ${beatDuration}s ease-in-out infinite`,
      }}
    >
      <style jsx>{`
        @keyframes dance {
          /* Beat 1 lands - left side */
          0% {
            transform: rotate(-15deg) translateY(0);
          }
          /* Rise for beat 2 */
          18% {
            transform: rotate(-15deg) translateY(-20px);
          }
          /* Beat 2 lands - left side */
          25% {
            transform: rotate(-15deg) translateY(0);
          }
          /* Rise for beat 3 */
          43% {
            transform: rotate(-15deg) translateY(-15px);
          }
          /* Beat 3 lands - transition to right */
          50% {
            transform: rotate(15deg) translateY(0);
          }
          /* Rise for beat 4 */
          68% {
            transform: rotate(15deg) translateY(-20px);
          }
          /* Beat 4 lands - right side */
          75% {
            transform: rotate(15deg) translateY(0);
          }
          /* Rise for beat 1 */
          93% {
            transform: rotate(15deg) translateY(-15px);
          }
          /* Beat 1 lands - back to left */
          100% {
            transform: rotate(-15deg) translateY(0);
          }
        }
      `}</style>
      
      {/* Emoji with glow effect */}
      <span 
        className="inline-block drop-shadow-[0_0_40px_rgba(250,204,21,0.5)]"
        role="img" 
        aria-label="dancing emoji"
      >
        {emoji}
      </span>
    </div>
  );
}

