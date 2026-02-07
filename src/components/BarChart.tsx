"use client";

import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

interface DataPoint {
  label: string;
  value: number;
}

const data: DataPoint[] = [
  { label: "Mon", value: 30 },
  { label: "Tue", value: 80 },
  { label: "Wed", value: 45 },
  { label: "Thu", value: 60 },
  { label: "Fri", value: 20 },
  { label: "Sat", value: 90 },
  { label: "Sun", value: 55 },
];

export default function BarChart() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    // Clear existing content
    d3.select(svgRef.current).selectAll("*").remove();

    const margin = { top: 20, right: 30, bottom: 40, left: 40 };
    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svg = d3
      .select(svgRef.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3
      .scaleBand()
      .domain(data.map((d) => d.label))
      .range([0, width])
      .padding(0.2);

    const y = d3
      .scaleLinear()
      .domain([0, 100])
      .range([height, 0]);

    // X Axis
    svg
      .append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("class", "text-zinc-600 dark:text-zinc-400 font-medium");

    // Y Axis
    svg
      .append("g")
      .call(d3.axisLeft(y).ticks(5))
      .selectAll("text")
      .attr("class", "text-zinc-600 dark:text-zinc-400 font-medium");

    // Bars
    svg
      .selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar fill-blue-500 hover:fill-blue-600 transition-colors duration-200")
      .attr("x", (d) => x(d.label)!)
      .attr("y", height)
      .attr("width", x.bandwidth())
      .attr("height", 0)
      .attr("rx", 4)
      .transition()
      .duration(800)
      .delay((_d, i) => i * 100)
      .attr("y", (d) => y(d.value))
      .attr("height", (d) => height - y(d.value));

    // Styling axes
    svg.selectAll(".domain").attr("stroke", "#e5e7eb").attr("stroke-width", 1);
    svg.selectAll(".tick line").attr("stroke", "#e5e7eb").attr("stroke-width", 1);
    
    // Grid lines
    svg
      .append("g")
      .attr("class", "grid")
      .attr("opacity", 0.1)
      .call(
        d3.axisLeft(y)
          .tickSize(-width)
          .tickFormat(() => "")
      );

  }, []);

  return (
    <div className="rounded-2xl bg-white p-6 shadow-xl dark:bg-zinc-900/50 dark:ring-1 dark:ring-white/10">
      <h3 className="mb-4 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
        Weekly Activity
      </h3>
      <div className="overflow-x-auto">
        <svg ref={svgRef} className="mx-auto"></svg>
      </div>
    </div>
  );
}
