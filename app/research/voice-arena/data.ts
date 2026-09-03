// Generated from physera-ai/voice-evals data/leaderboard_v1.json (Voice Arena V1.2).
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
  n: number | null;
  radar: Record<string, number | null>;
};

export type VoiceData = {
  generated: string;
  rows: VoiceRow[];
  radarDims: string[];
  decomp: { tier: string; delivery: number; content: number; empathy: number }[];
  judge: Record<string, number>;
};

export const voice: VoiceData = {
 "generated": "2026-05-18T00:40:30.900596+00:00",
 "rows": [
  {
   "id": "gemini-tts-conv",
   "name": "Gemini TTS",
   "subtitle": "claude-sonnet-4-6",
   "vendor": "Google + Anthropic",
   "tier": "cascade",
   "empathy": 0.8954,
   "emp_lo": 0.8878,
   "emp_hi": 0.9029,
   "rq": 0.8907,
   "latency_s": 13.1,
   "naturalness": 3.3154,
   "audio_quality": 3.3979,
   "pitch_range": 249.8594,
   "delivery": 0.867,
   "content": 0.8442,
   "n": 100,
   "_naturalness": 78.8,
   "_audio_quality": 93.0,
   "_empathy": 100.0,
   "_rq": 98.4,
   "_pitch_range": 100.0,
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
   "emp_hi": 0.8986,
   "rq": 0.8922,
   "latency_s": 2.2,
   "naturalness": 3.504,
   "audio_quality": 3.3703,
   "pitch_range": 153.9389,
   "delivery": 0.856,
   "content": 0.8472,
   "n": 100,
   "_naturalness": 89.6,
   "_audio_quality": 90.7,
   "_empathy": 99.4,
   "_rq": 100.0,
   "_pitch_range": 50.4,
   "radar": {
    "Naturalness": 89.6,
    "Audio quality": 90.7,
    "Empathy": 99.4,
    "Response quality": 100.0,
    "Expressiveness": 50.4
   }
  },
  {
   "id": "cartesia-conv-sonic-3-5",
   "name": "Cartesia Sonic 3.5",
   "subtitle": "claude-sonnet-4-6",
   "vendor": "Cartesia + Anthropic",
   "tier": "cascade",
   "empathy": 0.8891,
   "emp_lo": 0.8809,
   "emp_hi": 0.897,
   "rq": 0.8843,
   "latency_s": 2.3,
   "naturalness": 3.5885,
   "audio_quality": 3.4705,
   "pitch_range": 56.6378,
   "delivery": 0.854,
   "content": 0.8457,
   "n": 100,
   "_naturalness": 94.4,
   "_audio_quality": 98.9,
   "_empathy": 99.3,
   "_rq": 91.6,
   "_pitch_range": 0.0,
   "radar": {
    "Naturalness": 94.4,
    "Audio quality": 98.9,
    "Empathy": 99.3,
    "Response quality": 91.6,
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
   "emp_hi": 0.8839,
   "rq": 0.8734,
   "latency_s": 4.7,
   "naturalness": 2.7499,
   "audio_quality": 3.3375,
   "pitch_range": 64.9356,
   "delivery": 0.8331,
   "content": 0.8353,
   "n": 100,
   "_naturalness": 46.6,
   "_audio_quality": 88.1,
   "_empathy": 97.5,
   "_rq": 80.0,
   "_pitch_range": 4.3,
   "radar": {
    "Naturalness": 46.6,
    "Audio quality": 88.1,
    "Empathy": 97.5,
    "Response quality": 80.0,
    "Expressiveness": 4.3
   }
  },
  {
   "id": "gpt4o-audio",
   "name": "GPT-4o Audio",
   "subtitle": "native",
   "vendor": "OpenAI",
   "tier": "native",
   "empathy": 0.8283,
   "emp_lo": 0.8049,
   "emp_hi": 0.8486,
   "rq": 0.8261,
   "latency_s": 4.8,
   "naturalness": 3.6866,
   "audio_quality": 3.4843,
   "pitch_range": 90.7044,
   "delivery": 0.842,
   "content": 0.6517,
   "n": 100,
   "_naturalness": 100.0,
   "_audio_quality": 100.0,
   "_empathy": 92.1,
   "_rq": 29.6,
   "_pitch_range": 17.6,
   "radar": {
    "Naturalness": 100.0,
    "Audio quality": 100.0,
    "Empathy": 92.1,
    "Response quality": 29.6,
    "Expressiveness": 17.6
   }
  },
  {
   "id": "gemini-live-conv",
   "name": "Gemini Live",
   "subtitle": "native audio",
   "vendor": "Google",
   "tier": "native",
   "empathy": 0.8198,
   "emp_lo": 0.7868,
   "emp_hi": 0.849,
   "rq": 0.7983,
   "latency_s": 22.8,
   "naturalness": 3.409,
   "audio_quality": 3.4337,
   "pitch_range": 200.2016,
   "delivery": 0.8551,
   "content": 0.6627,
   "n": 100,
   "_naturalness": 84.2,
   "_audio_quality": 95.9,
   "_empathy": 91.1,
   "_rq": 0.0,
   "_pitch_range": 74.3,
   "radar": {
    "Naturalness": 84.2,
    "Audio quality": 95.9,
    "Empathy": 91.1,
    "Response quality": 0.0,
    "Expressiveness": 74.3
   }
  },
  {
   "id": "moshi-conv",
   "name": "Moshi",
   "subtitle": "native audio",
   "vendor": "Kyutai",
   "tier": "native",
   "empathy": 0.0502,
   "emp_lo": 0.0361,
   "emp_hi": 0.0667,
   "rq": null,
   "latency_s": 37.4,
   "naturalness": 1.9325,
   "audio_quality": 2.252,
   "pitch_range": null,
   "delivery": 0.0919,
   "content": 0.0409,
   "n": 100,
   "_naturalness": 0.0,
   "_audio_quality": 0.0,
   "_empathy": 0.0,
   "_rq": null,
   "_pitch_range": null,
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
   "delivery": 0.853,
   "content": 0.843,
   "empathy": 0.887
  },
  {
   "tier": "native",
   "delivery": 0.596,
   "content": 0.452,
   "empathy": 0.566
  }
 ],
 "judge": {
  "empathy_claude_gpt4": 0.7072,
  "empathy_claude_gemini": 0.6794,
  "empathy_gpt4_gemini": 0.6843,
  "rq_claude_gpt4": 0.5113,
  "rq_claude_gemini": 0.3527,
  "rq_gpt4_gemini": 0.3864,
  "cross_claude": 0.8293,
  "cross_gpt4": 0.5215,
  "cross_gemini": 0.5845
 }
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
