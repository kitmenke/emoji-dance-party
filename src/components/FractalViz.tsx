"use client";

import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

export default function FractalViz() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [depth, setDepth] = useState(10);
  const [angle, setAngle] = useState(30);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    const width = window.innerWidth;
    const height = window.innerHeight;

    svg.attr("width", width).attr("height", height);
    svg.selectAll("*").remove();

    const g = svg.append("g")
      .attr("transform", `translate(${width / 2},${height - 100})`);

    const drawBranch = (len: number, angleDeg: number, currentDepth: number) => {
      if (currentDepth === 0) return;

      const angleRad = (angleDeg * Math.PI) / 180;
      const x2 = -len * Math.sin(angleRad);
      const y2 = -len * Math.cos(angleRad);

      const colorScale = d3.interpolateRgb("#3b82f6", "#8b5cf6"); // Blue to Purple
      const strokeWidth = currentDepth * 0.8;
      
      const line = g.append("line")
        .attr("x1", 0)
        .attr("y1", 0)
        .attr("x2", 0)
        .attr("y2", 0)
        .attr("stroke", colorScale(1 - currentDepth / depth))
        .attr("stroke-width", strokeWidth)
        .attr("stroke-linecap", "round")
        .attr("opacity", 0.8);

      line.transition()
        .duration(1000)
        .delay((depth - currentDepth) * 100)
        .attr("x2", x2)
        .attr("y2", y2);

      // Create a sub-group for recursion
      const subG = g.append("g")
        .attr("transform", `translate(${x2},${y2})`);

      // Recursively draw branches
      // We pass the global 'g' or manage transforms locally. 
      // Actually, standard recursion with nested groups is easier.
      
      const nextDraw = (parentG: any, l: number, a: number, d: number) => {
        if (d === 0) return;

        const rad = (a * Math.PI) / 180;
        const nx2 = -l * Math.sin(rad);
        const ny2 = -l * Math.cos(rad);

        parentG.append("line")
          .attr("x1", 0)
          .attr("y1", 0)
          .attr("x2", nx2)
          .attr("y2", ny2)
          .attr("stroke", colorScale(1 - d / depth))
          .attr("stroke-width", d * 0.6)
          .attr("stroke-linecap", "round")
          .attr("opacity", 0.7);

        const leftG = parentG.append("g").attr("transform", `translate(${nx2},${ny2})`);
        const rightG = parentG.append("g").attr("transform", `translate(${nx2},${ny2})`);

        nextDraw(leftG, l * 0.75, a - angle, d - 1);
        nextDraw(rightG, l * 0.75, a + angle, d - 1);
      };
    };

    // Let's do a cleaner recursive implementation
    const renderTree = () => {
      g.selectAll("*").remove();
      
      const step = (parentG: any, l: number, a: number, d: number) => {
        if (d === 0) return;

        const rad = (a * Math.PI) / 180;
        const x2 = -l * Math.sin(rad);
        const y2 = -l * Math.cos(rad);

        const colorScale = d3.interpolateRgb("#60a5fa", "#c084fc");
        
        parentG.append("line")
          .attr("x1", 0)
          .attr("y1", 0)
          .attr("x2", x2)
          .attr("y2", y2)
          .attr("stroke", colorScale(1 - d / depth))
          .attr("stroke-width", Math.max(0.5, d * 0.5))
          .attr("stroke-linecap", "round")
          .attr("opacity", 0.8);

        const nextL = l * (0.7 + Math.random() * 0.1);
        
        const g1 = parentG.append("g").attr("transform", `translate(${x2},${y2})`);
        const g2 = parentG.append("g").attr("transform", `translate(${x2},${y2})`);

        step(g1, nextL, a - angle, d - 1);
        step(g2, nextL, a + angle, d - 1);
      };

      step(g, height / 4, 0, depth);
    };

    renderTree();

    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      svg.attr("width", width).attr("height", height);
      renderTree();
    };

    const handleMouseMove = (e: MouseEvent) => {
      const xPercent = e.clientX / window.innerWidth;
      const newAngle = 10 + xPercent * 60;
      setAngle(newAngle);
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [depth, angle]);

  return (
    <div className="fixed inset-0 h-screen w-screen bg-zinc-950 overflow-hidden">
      <div className="absolute top-10 left-10 z-20 flex flex-col gap-2">
        <h2 className="text-2xl font-bold text-white/80 tracking-tight">Fractal Garden</h2>
        <p className="text-xs text-zinc-500 uppercase tracking-[0.2em]">D3.js Recursive Visualization</p>
        <div className="mt-4 flex items-center gap-4">
          <label className="text-[10px] text-zinc-600 font-bold uppercase">Complexity</label>
          <input 
            type="range" 
            min="1" 
            max="12" 
            value={depth} 
            onChange={(e) => setDepth(parseInt(e.target.value))}
            className="w-32 accent-blue-500"
          />
          <span className="text-xs text-zinc-400 font-mono">{depth}</span>
        </div>
      </div>
      
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(59,130,246,0.15),transparent_50%)]" />
      
      <svg ref={svgRef} className="relative z-10 filter drop-shadow-[0_0_8px_rgba(59,130,246,0.3)]"></svg>

      <div className="absolute bottom-10 right-10 z-20 text-right opacity-30">
        <p className="text-[10px] text-zinc-500 font-medium uppercase tracking-widest">Move mouse to sway the tree</p>
      </div>
    </div>
  );
}
