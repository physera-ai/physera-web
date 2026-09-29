"use client";

import { useEffect, useRef, useState } from "react";

export default function AutoVideo({ src, label }: { src: string; label: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const manuallyPaused = useRef(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    const syncPlayback = () => {
      if (visible && !document.hidden && !motion.matches && !manuallyPaused.current) {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      syncPlayback();
    }, { threshold: 0.25 });
    observer.observe(video);
    motion.addEventListener("change", syncPlayback);
    document.addEventListener("visibilitychange", syncPlayback);
    return () => {
      observer.disconnect();
      motion.removeEventListener("change", syncPlayback);
      document.removeEventListener("visibilitychange", syncPlayback);
      video.pause();
    };
  }, [src]);

  const toggle = () => {
    const video = ref.current;
    if (!video) return;
    if (video.paused) {
      manuallyPaused.current = false;
      video.play().catch(() => {});
    } else {
      manuallyPaused.current = true;
      video.pause();
    }
  };

  return (
    <div className="ab-video-shell">
      <video ref={ref} aria-label={label} loop muted playsInline preload="metadata" className="ab-video"
        onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)}>
        <source src={src.replace(/\.mp4$/, ".webm")} type="video/webm" />
        <source src={src} type="video/mp4" />
      </video>
      <button type="button" className={`ab-video-control${playing ? "" : " is-paused"}`}
        aria-label={`${playing ? "Pause" : "Play"}: ${label}`} onClick={toggle}>
        {playing ? "Ⅱ Pause" : "▶ Play"}
      </button>
    </div>
  );
}
