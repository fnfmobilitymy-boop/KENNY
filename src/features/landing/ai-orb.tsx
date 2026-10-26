"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
export function AiOrb() {
  const [paused, setPaused] = useState(false);
  return (
    <div className="orb-scene" data-paused={paused}>
      <div className="orb-coordinate orb-coordinate-top" aria-hidden="true">
        K / INTELLIGENCE CORE
      </div>
      <div className="orb-art" aria-hidden="true">
        <div className="orb-halo" />
        <div className="orb-ring ring-one" />
        <div className="orb-ring ring-two" />
        <div className="orb-ring ring-three" />
        <div className="orb-sphere">
          <span className="orb-latitude" />
          <span className="orb-longitude" />
          <span className="brand-mark orb-k">K</span>
        </div>
        <span className="orb-node node-one" />
        <span className="orb-node node-two" />
        <div className="orb-platform" />
      </div>
      <div className="orb-caption">
        <span>
          <span className="tiny-dot" />
          One core. Endless possibilities.
        </span>
        <Button
          variant="ghost"
          className="motion-toggle"
          aria-pressed={paused}
          onClick={() => setPaused(!paused)}
        >
          {paused ? "Play" : "Pause"} motion
        </Button>
      </div>
    </div>
  );
}
