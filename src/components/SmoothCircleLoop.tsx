"use client";

import { useEffect, useRef } from "react";

export function SmoothCircleLoop() {
  const containerRef = useRef<HTMLDivElement>(null);
  const circlesRef = useRef<(HTMLDivElement | null)[]>([]);
  const requestRef = useRef<number | null>(null);

  // Configuration
  const circleCount = 9; // Number of circles in the loop (7 visible usually)
  const speed = 0.00025; // Speed of movement (progress per frame, 0 to 1)

  // The generated images that were saved to your assets folder
  const imagePatterns = [
    `url('/loop-img-1.png')`,
    `url('/loop-img-2.png')`,
    `url('/loop-img-3.png')`,
    `url('/loop-img-4.png')`,
    `url('/loop-img-5.png')`,
  ];

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
      const R = containerWidth * 0.24; 

      // The theoretical distance between circle centers if they were evenly distributed on the arc
      const maxDistance = (R * Math.PI) / circleCount;
      
      // Base diameter of the DOM element
      const baseDiameter = 80; 
      
      // Adjusted to increase circle size relative to spacing, reducing the gap
      const targetDiameter = maxDistance * 0.92;
      
      // Cap the maximum scale so they don't get overwhelmingly huge on very wide screens
      const maxScale = Math.min(targetDiameter / baseDiameter, 2.2);

      circlesRef.current.forEach((circle, i) => {
        if (!circle) return;
        
        // 'v' is the circle's position along the path from 0 to 1
        const v = (i / circleCount + progress) % 1;

        // Map 'v' to an angle (theta) from PI/2 (right edge) down to -PI/2 (left edge)
        const theta = Math.PI * (0.5 - v);
        
        // X position is derived from the sine of the angle
        const x = R * Math.sin(theta);
        
        // To make the center circle significantly larger than the adjacent ones,
        // we sharpen the cosine curve by raising it to a power (e.g. 1.8).
        // This makes the size drop off much faster as it moves away from the center.
        const scale = maxScale * Math.pow(Math.cos(theta), 1.8);

        // Keep a tiny scale instead of exactly 0 to avoid layout rendering glitches
        const finalScale = Math.max(scale, 0.001);

        // Apply transparency at the edges (before 10% and after 90% of the path)
        let circleOpacity = 1;
        if (v < 0.1) {
          circleOpacity = v / 0.1; // fade in from right edge
        } else if (v > 0.9) {
          circleOpacity = (1 - v) / 0.1; // fade out to left edge
        }
        
        // Smooth the opacity transition curve
        circleOpacity = Math.pow(circleOpacity, 1.2);

        // Link the image opacity directly to the circle opacity so it fades out exactly when the circle does,
        // but only at the very edges (the first and last 10%)
        const imageOpacity = circleOpacity;

        circle.style.transform = `translate(-50%, -50%) translateX(${x}px) scale(${finalScale})`;
        circle.style.opacity = circleOpacity.toString();
        
        // Apply the image opacity to the inner div
        const innerImage = circle.children[0] as HTMLDivElement;
        if (innerImage) {
          innerImage.style.opacity = imageOpacity.toString();
        }
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
            className="absolute top-1/2 left-1/2 w-20 h-20 rounded-full bg-white/5 will-change-transform overflow-hidden"
            style={{ 
              transform: `translate(-50%, -50%) scale(0)`, // Initial hidden state
            }}
          >
            <div 
              className="absolute inset-0 bg-cover bg-center grayscale mix-blend-screen invert opacity-70 transition-opacity duration-75"
              style={{
                backgroundImage: imagePatterns[i % imagePatterns.length],
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
