"use client";

import { useEffect, useRef } from "react";

export function SmoothCircleLoop() {
  const containerRef = useRef<HTMLDivElement>(null);
  const circlesRef = useRef<(HTMLDivElement | null)[]>([]);
  const requestRef = useRef<number | null>(null);

  // Configuration
  const circleCount = 9; // Number of circles in the loop (7 visible usually)
  const speed = 0.0012; // Speed of movement (progress per frame, 0 to 1)

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let progress = 0;

    const animate = () => {
      // Advance progress, wrap around at 1
      progress = (progress + speed) % 1;

      const containerWidth = container.offsetWidth;
      
      // Radius of the virtual half-circle path. 
      // 0.45 means it spans 90% of the container width.
      const R = containerWidth * 0.45; 

      // The theoretical distance between circle centers if they were evenly distributed on the arc
      const maxDistance = (R * Math.PI) / circleCount;
      
      // Base diameter of the DOM element
      const baseDiameter = 80; 
      
      // Adjusted from 0.65 to 0.8 to increase circle size relative to spacing
      const targetDiameter = maxDistance * 0.8;
      
      // Cap the maximum scale so they don't get overwhelmingly huge on very wide screens
      const maxScale = Math.min(targetDiameter / baseDiameter, 2.2);

      circlesRef.current.forEach((circle, i) => {
        if (!circle) return;
        
        // 'v' is the circle's position along the path from 0 to 1
        let v = (i / circleCount + progress) % 1;

        // Map 'v' to an angle (theta) from PI/2 (right edge) down to -PI/2 (left edge)
        const theta = Math.PI * (0.5 - v);
        
        // X position is derived from the sine of the angle
        const x = R * Math.sin(theta);
        
        // To make the center circle significantly larger than the adjacent ones,
        // we sharpen the cosine curve by raising it to a power (e.g. 1.8).
        // This makes the size drop off much faster as it moves away from the center.
        let scale = maxScale * Math.pow(Math.cos(theta), 1.8);

        // Keep a tiny scale instead of exactly 0 to avoid layout rendering glitches
        const finalScale = Math.max(scale, 0.001);

        circle.style.transform = `translate(-50%, -50%) translateX(${x}px) scale(${finalScale})`;
      });

      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, []);

  return (
    <div 
      className="w-full max-w-7xl mx-auto h-56 relative overflow-hidden flex items-center justify-center" 
      ref={containerRef}
      style={{
        maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
        WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)'
      }}
    >
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: circleCount }).map((_, i) => (
          <div
            key={i}
            ref={(el) => {
              circlesRef.current[i] = el;
            }}
            // All circles are EXACTLY the same light shade of gray (bg-black/5 or 5% opacity black).
            // No opacity changes happen in JS.
            className="absolute top-1/2 left-1/2 w-20 h-20 rounded-full bg-black/5 border-black/5 border-[0.5px] will-change-transform"
            style={{ 
              transform: `translate(-50%, -50%) scale(0)`, // Initial hidden state
            }}
          />
        ))}
      </div>
    </div>
  );
}
