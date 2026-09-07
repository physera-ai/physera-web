// Generated from physera-ai/voice-evals by blog/gen_web_data.py.
// Source of truth: data/scores/per_clip.parquet -> blog/data/voice_v12.json.
// Do not hand-edit.

export type VoiceRow = {
  id: string;
  name: string;
  subtitle: string | null;
  vendor: string;
  tier: "cascade" | "native" | "tts";
  empathy: number;
  emp_lo: number;
  emp_hi: number;
  rq: number | null;
  latency_s: number | null;
  delivery: number;
  content: number;
  emotion_match: number | null;
  naturalness: number;
  audio_quality: number;
  pitch_range: number | null;
  n: number | null;
  radar: Record<string, number | null>;
};

export type VoiceData = {
  generated: string;
  evaluated: string;
  rows: VoiceRow[];
  radarDims: string[];
  decomp: { tier: string; delivery: number; content: number; empathy: number }[];
  judge: Record<string, number>;
  noiseFloor: number;
};

export const voice: VoiceData = {
 "generated": "2026-09-07T09:30:57.494637+00:00",
 "evaluated": "2026-05-18",
 "rows": [
  {
   "id": "gemini-tts-conv",
   "name": "Gemini TTS",
   "subtitle": "claude-sonnet-4-6",
   "vendor": "Google + Anthropic",
   "tier": "cascade",
   "empathy": 0.8954,
   "emp_lo": 0.8876,
   "emp_hi": 0.903,
   "rq": 0.8907,
   "latency_s": 13.1,
   "delivery": 0.867,
   "content": 0.8444,
   "emotion_match": 0.5735,
   "naturalness": 3.3153,
   "audio_quality": 3.398,
   "pitch_range": 249.9,
   "n": 100,
   "radar": {
    "Naturalness": 78.8,
    "Audio quality": 93.0,
    "Empathy": 100.0,
    "Response quality": 98.4,
    "Expressiveness": 100.0
   }
  },
  {
   "id": "elevenlabs-conv",
   "name": "ElevenLabs",
   "subtitle": "claude-sonnet-4-6",
   "vendor": "ElevenLabs + Anthropic",
   "tier": "cascade",
   "empathy": 0.8902,
   "emp_lo": 0.8816,
   "emp_hi": 0.8984,
   "rq": 0.8922,
   "latency_s": 2.2,
   "delivery": 0.856,
   "content": 0.8472,
   "emotion_match": 0.4375,
   "naturalness": 3.504,
   "audio_quality": 3.3703,
   "pitch_range": 153.9,
   "n": 100,
   "radar": {
    "Naturalness": 89.6,
    "Audio quality": 90.8,
    "Empathy": 99.4,
    "Response quality": 100.0,
    "Expressiveness": 50.3
   }
  },
  {
   "id": "cartesia-conv-sonic-3-5",
   "name": "Cartesia Sonic 3.5",
   "subtitle": "claude-sonnet-4-6",
   "vendor": "Cartesia + Anthropic",
   "tier": "cascade",
   "empathy": 0.889,
   "emp_lo": 0.8809,
   "emp_hi": 0.897,
   "rq": 0.8843,
   "latency_s": 2.3,
   "delivery": 0.854,
   "content": 0.8457,
   "emotion_match": 0.5955,
   "naturalness": 3.5881,
   "audio_quality": 3.4706,
   "pitch_range": 56.6,
   "n": 100,
   "radar": {
    "Naturalness": 94.4,
    "Audio quality": 98.9,
    "Empathy": 99.2,
    "Response quality": 91.7,
    "Expressiveness": 0.0
   }
  },
  {
   "id": "cartesia-conv-sonic-3",
   "name": "Cartesia Sonic 3",
   "subtitle": "claude-sonnet-4-6",
   "vendor": "Cartesia + Anthropic",
   "tier": "cascade",
   "empathy": 0.8745,
   "emp_lo": 0.8641,
   "emp_hi": 0.8835,
   "rq": 0.8733,
   "latency_s": 4.7,
   "delivery": 0.833,
   "content": 0.8352,
   "emotion_match": 0.5773,
   "naturalness": 2.7501,
   "audio_quality": 3.3376,
   "pitch_range": 64.6,
   "n": 100,
   "radar": {
    "Naturalness": 46.6,
    "Audio quality": 88.1,
    "Empathy": 97.5,
    "Response quality": 79.9,
    "Expressiveness": 4.1
   }
  },
  {
   "id": "gpt4o-audio",
   "name": "GPT-4o Audio",
   "subtitle": "native audio",
   "vendor": "OpenAI",
   "tier": "native",
   "empathy": 0.8282,
   "emp_lo": 0.8052,
   "emp_hi": 0.8485,
   "rq": 0.826,
   "latency_s": 4.8,
   "delivery": 0.842,
   "content": 0.6515,
   "emotion_match": 0.4391,
   "naturalness": 3.6866,
   "audio_quality": 3.4842,
   "pitch_range": 90.7,
   "n": 100,
   "radar": {
    "Naturalness": 100.0,
    "Audio quality": 100.0,
    "Empathy": 92.0,
    "Response quality": 29.4,
    "Expressiveness": 17.6
   }
  },
  {
   "id": "gemini-live-conv",
   "name": "Gemini Live",
   "subtitle": "native audio",
   "vendor": "Google",
   "tier": "native",
   "empathy": 0.82,
   "emp_lo": 0.7871,
   "emp_hi": 0.8491,
   "rq": 0.7983,
   "latency_s": 22.8,
   "delivery": 0.855,
   "content": 0.6625,
   "emotion_match": 0.126,
   "naturalness": 3.4099,
   "audio_quality": 3.4336,
   "pitch_range": 200.1,
   "n": 100,
   "radar": {
    "Naturalness": 84.2,
    "Audio quality": 95.9,
    "Empathy": 91.1,
    "Response quality": 0.0,
    "Expressiveness": 74.2
   }
  },
  {
   "id": "moshi-conv",
   "name": "Moshi",
   "subtitle": "native audio",
   "vendor": "Kyutai",
   "tier": "native",
   "empathy": 0.0501,
   "emp_lo": 0.0358,
   "emp_hi": 0.0663,
   "rq": null,
   "latency_s": 37.4,
   "delivery": 0.092,
   "content": 0.0409,
   "emotion_match": null,
   "naturalness": 1.9336,
   "audio_quality": 2.2526,
   "pitch_range": null,
   "n": 100,
   "radar": {
    "Naturalness": 0.0,
    "Audio quality": 0.0,
    "Empathy": 0.0,
    "Response quality": null,
    "Expressiveness": null
   }
  }
 ],
 "radarDims": [
  "Naturalness",
  "Audio quality",
  "Empathy",
  "Response quality",
  "Expressiveness"
 ],
 "decomp": [
  {
   "tier": "cascade",
   "delivery": 0.8525,
   "content": 0.8431,
   "empathy": 0.8873
  },
  {
   "tier": "native",
   "delivery": 0.8485,
   "content": 0.657,
   "empathy": 0.8241
  }
 ],
 "judge": {
  "empathy_claude_gpt4": 0.7072,
  "empathy_claude_gemini": 0.6794,
  "empathy_gpt4_gemini": 0.6843,
  "rq_claude_gpt4": 0.5113,
  "rq_claude_gemini": 0.3527,
  "rq_gpt4_gemini": 0.3864
 },
 "noiseFloor": 0.0231
} as unknown as VoiceData;

export const TIER_COLOR: Record<string, string> = {
  cascade: "#0f9d6e",
  native: "#2f6fdb",
  tts: "#8a8a8a",
};

export const TIER_LABEL: Record<string, string> = {
  cascade: "Cascade",
  native: "Native",
  tts: "TTS baseline",
};
