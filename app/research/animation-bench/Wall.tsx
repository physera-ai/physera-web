"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import wallData from "./wall.json";
import ModelLogo from "./ModelLogo";

type ModelKey = "astra" | "fable" | "opus" | "sol";
type ModelScores = { overall: number; visual_similarity: number; motion_consistency: number; layout_correctness: number };
type TaskEntry = {
  label: string;
  site: string;
  trigger: string;
  n: number;
  w: number;
  h: number;
  times_ms: number[];
  scores: Record<ModelKey, ModelScores>;
};

const WALL = wallData as Record<string, TaskEntry>;
const TASK_IDS = Object.keys(WALL);
const DEFAULT_TASK_ID = "wisprflow-dictation-notetaker-toggle";

const MODEL_ROWS: { key: ModelKey; name: string; color: string }[] = [
  { key: "astra", name: "GPT-6 Astra", color: "#0f9d6e" },
  { key: "fable", name: "Claude Fable 5.1", color: "#5170c9" },
  { key: "opus", name: "Claude Opus 5.5", color: "#ad7545" },
  { key: "sol", name: "GPT-6 Sol", color: "#9b71a3" },
];

const ROW_KEYS = ["ref", "astra", "fable", "opus", "sol"] as const;
type RowKey = (typeof ROW_KEYS)[number];

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
const urlFor = (taskId: string, row: RowKey) => `/animation-bench/wall/${taskId}/${row}.webp`;

function subscribeReducedMotion(callback: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}
function getReducedMotionSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function getReducedMotionServerSnapshot() {
  return false;
}

type LoopRefs = {
  playingRef: React.MutableRefObject<boolean>;
  visibleRef: React.MutableRefObject<boolean>;
  runningRef: React.MutableRefObject<boolean>;
  timerRef: React.MutableRefObject<number | null>;
};

function scheduleAdvance(idx: number, taskId: string, refs: LoopRefs, setFrameIndex: (n: number) => void) {
  const t = WALL[taskId];
  const isLast = idx === t.n - 1;
  const dwell = isLast ? 1100 : clamp((t.times_ms[idx + 1] - t.times_ms[idx]) * 0.6, 140, 700);
  refs.timerRef.current = window.setTimeout(() => {
    if (!refs.playingRef.current || !refs.visibleRef.current || document.hidden) {
      refs.runningRef.current = false;
      return;
    }
    const next = isLast ? 0 : idx + 1;
    setFrameIndex(next);
    scheduleAdvance(next, taskId, refs, setFrameIndex);
  }, dwell);
}

function Tile({
  gridArea,
  name,
  url,
  loaded,
  n,
  frameIndex,
  color,
  scores,
  meta,
  overlayUrl,
  showOverlay,
  interactive,
  onHoverStart,
  onHoverEnd,
}: {
  gridArea: RowKey;
  name: string;
  url: string;
  loaded: boolean;
  n: number;
  frameIndex: number;
  color?: string;
  scores?: ModelScores;
  meta?: string;
  overlayUrl?: string;
  showOverlay?: boolean;
  interactive?: boolean;
  onHoverStart?: () => void;
  onHoverEnd?: () => void;
}) {
  const bgSize = `${n * 100}% 100%`;
  const bgPos = `${(frameIndex / (n - 1)) * 100}% 0`;

  return (
    <div
      className="ab-wall-tile"
      style={color ? { borderTopColor: color } : undefined}
      tabIndex={interactive ? 0 : undefined}
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
      onFocus={onHoverStart}
      onBlur={onHoverEnd}
      data-row={gridArea}
    >
      <div
        className="ab-wall-frame"
        style={{
          backgroundImage: loaded ? `url(${url})` : undefined,
          backgroundSize: bgSize,
          backgroundPosition: bgPos,
        }}
      >
        {showOverlay && overlayUrl && (
          <>
            <div
              className="ab-wall-overlay"
              style={{ backgroundImage: `url(${overlayUrl})`, backgroundSize: bgSize, backgroundPosition: bgPos }}
            />
            <span className="ab-wall-overlay-tag">REFERENCE OVERLAY</span>
          </>
        )}
      </div>
      <div className="ab-wall-label">
        <span className="ab-wall-label-name">{gridArea !== "ref" && <ModelLogo model={name} />}{name}</span>
        {scores && (
          <span className="ab-wall-label-scores">
            <span className="ab-wall-chipscore">overall {scores.overall.toFixed(3)}</span>
            <span className="ab-wall-chipscore">motion {scores.motion_consistency.toFixed(2)}</span>
          </span>
        )}
        {!scores && meta && (
          <span className="ab-wall-label-scores">
            <span className="ab-wall-chipscore">{meta}</span>
          </span>
        )}
      </div>
    </div>
  );
}

export default function Wall() {
  const prefersReducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot,
  );

  const [currentTaskId, setCurrentTaskId] = useState(DEFAULT_TASK_ID);
  const [frameIndex, setFrameIndex] = useState(0);
  const [playing, setPlaying] = useState(!prefersReducedMotion);
  const [loadedRows, setLoadedRows] = useState<Set<RowKey>>(new Set());
  const [hoveredModel, setHoveredModel] = useState<ModelKey | null>(null);

  const task = WALL[currentTaskId];

  const taskIdRef = useRef(currentTaskId);
  const frameIndexRef = useRef(frameIndex);
  const playingRef = useRef(playing);
  const visibleRef = useRef(true);
  const runningRef = useRef(false);
  const timerRef = useRef<number | null>(null);
  const loadTokenRef = useRef(0);
  const wallRef = useRef<HTMLDivElement | null>(null);
  const stripRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    stripRef.current?.querySelector<HTMLElement>('.ab-wall-thumb.is-active')?.scrollIntoView({ inline: "nearest", block: "nearest" });
  }, [currentTaskId]);

  useEffect(() => {
    taskIdRef.current = currentTaskId;
    frameIndexRef.current = frameIndex;
    playingRef.current = playing;
  });

  const stopLoop = useCallback(() => {
    runningRef.current = false;
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const startLoop = useCallback(
    (taskId: string, fromIdx: number) => {
      if (runningRef.current || !playingRef.current || !visibleRef.current || document.hidden) return;
      runningRef.current = true;
      scheduleAdvance(fromIdx, taskId, { playingRef, visibleRef, runningRef, timerRef }, setFrameIndex);
    },
    [],
  );

  const preloadTask = useCallback((taskId: string) => {
    const token = loadTokenRef.current;
    ROW_KEYS.forEach((row) => {
      const img = new Image();
      img.src = urlFor(taskId, row);
      img.onload = () => {
        if (loadTokenRef.current !== token) return;
        setLoadedRows((prev) => (prev.has(row) ? prev : new Set(prev).add(row)));
      };
    });
  }, []);

  useEffect(() => {
    const node = wallRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.isIntersecting;
        if (entry.isIntersecting) startLoop(taskIdRef.current, frameIndexRef.current);
        else stopLoop();
      },
      { threshold: 0.1 },
    );
    observer.observe(node);

    const onVisibility = () => {
      if (document.hidden) stopLoop();
      else if (visibleRef.current) startLoop(taskIdRef.current, frameIndexRef.current);
    };
    document.addEventListener("visibilitychange", onVisibility);

    if (!prefersReducedMotion) startLoop(taskIdRef.current, frameIndexRef.current);
    preloadTask(taskIdRef.current);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      stopLoop();
    };
  }, [prefersReducedMotion, startLoop, stopLoop, preloadTask]);

  const selectTask = (id: string) => {
    if (id === currentTaskId) return;
    stopLoop();
    loadTokenRef.current += 1;
    setLoadedRows(new Set());
    setCurrentTaskId(id);
    setFrameIndex(0);
    setHoveredModel(null);
    preloadTask(id);
    if (!prefersReducedMotion) {
      playingRef.current = true;
      setPlaying(true);
      startLoop(id, 0);
    } else {
      playingRef.current = false;
      setPlaying(false);
    }
  };

  const togglePlay = () => {
    if (playingRef.current) {
      playingRef.current = false;
      setPlaying(false);
      stopLoop();
    } else {
      playingRef.current = true;
      setPlaying(true);
      startLoop(taskIdRef.current, frameIndexRef.current);
    }
  };

  const onScrub = (e: React.ChangeEvent<HTMLInputElement>) => {
    stopLoop();
    playingRef.current = false;
    setPlaying(false);
    setFrameIndex(Number(e.target.value));
  };

  const refUrl = urlFor(currentTaskId, "ref");
  const lastT = task.times_ms[task.n - 1];

  return (
    <section className="ab-wall" aria-label="Reconstruction wall">
      <div className="ab-wall-panel">
        <div className="ab-wall-head">
          <div>
            <h2 className="ab-wall-title">Every model gets the look. Watch the timing.</h2>
            <p className="bench-mono-label ab-wall-subtitle">
              Reference recording beside four frontier reconstructions, frame-locked to the same moments. Hover a
              model to overlay the reference.
            </p>
          </div>
          <div className="ab-wall-step" role="group" aria-label="Switch task">
            <button type="button" onClick={() => selectTask(TASK_IDS[(TASK_IDS.indexOf(currentTaskId) - 1 + TASK_IDS.length) % TASK_IDS.length])} aria-label="Previous task">←</button>
            <span className="bench-mono-label">{TASK_IDS.indexOf(currentTaskId) + 1} / {TASK_IDS.length}</span>
            <button type="button" onClick={() => selectTask(TASK_IDS[(TASK_IDS.indexOf(currentTaskId) + 1) % TASK_IDS.length])} aria-label="Next task">→</button>
          </div>
        </div>

        <div className="ab-wall-strip" role="listbox" aria-label="Task" ref={stripRef}>
          {TASK_IDS.map((id) => (
            <button
              key={id}
              type="button"
              role="option"
              aria-selected={id === currentTaskId}
              className={"ab-wall-thumb" + (id === currentTaskId ? " is-active" : "")}
              onClick={() => selectTask(id)}
              title={`${WALL[id].label} · ${WALL[id].site}`}
            >
              <span className="ab-wall-thumb-frame" style={{ backgroundImage: `url(${urlFor(id, "ref")})`, backgroundSize: `${WALL[id].n * 100}% 100%` }} />
              <span className="ab-wall-thumb-label">{WALL[id].label}</span>
            </button>
          ))}
        </div>

        <div className="ab-wall-grid" ref={wallRef}>
          <Tile
            gridArea="ref"
            name="Reference"
            url={refUrl}
            loaded={loadedRows.has("ref")}
            n={task.n}
            frameIndex={frameIndex}
            meta={`${task.site} · ${task.trigger}`}
          />
          {MODEL_ROWS.map((m) => (
            <Tile
              key={m.key}
              gridArea={m.key}
              name={m.name}
              url={urlFor(currentTaskId, m.key)}
              loaded={loadedRows.has(m.key)}
              n={task.n}
              frameIndex={frameIndex}
              color={m.color}
              scores={task.scores[m.key]}
              overlayUrl={refUrl}
              showOverlay={hoveredModel === m.key}
              interactive
              onHoverStart={() => setHoveredModel(m.key)}
              onHoverEnd={() => setHoveredModel(null)}
            />
          ))}
          <div className="ab-wall-ctl" data-row="ctl">
            <div className="ab-wall-ctl-meta">
              <span className="ab-wall-ctl-task">{task.label}</span>
              <span className="bench-mono-label">{task.site} · {task.trigger} · {task.n} frames · {(lastT / 1000).toFixed(1)} s</span>
            </div>
            <div className="ab-wall-transport">
              <button type="button" className="ab-wall-play" onClick={togglePlay} aria-label={playing ? "Pause" : "Play"}>
                {playing ? "❚❚ Pause" : "▶ Play"}
              </button>
              <input
                type="range"
                className="ab-wall-scrub"
                min={0}
                max={task.n - 1}
                step={1}
                value={frameIndex}
                onChange={onScrub}
                aria-label="Frame scrubber"
              />
            </div>
            <div className="ab-wall-ticks" aria-hidden="true">
              {task.times_ms.map((t, i) => (
                <span
                  key={i}
                  className={"ab-wall-tick" + (i === frameIndex ? " is-current" : "")}
                  style={{ left: `${(t / lastT) * 100}%` }}
                />
              ))}
            </div>
            <div className="ab-wall-readout bench-mono-label">
              frame {frameIndex + 1}/{task.n} · t = {(task.times_ms[frameIndex] / 1000).toFixed(1)} s
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
