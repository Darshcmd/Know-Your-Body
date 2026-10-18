// Know Your Body - global scoreboard (local persistence)
//
// Scores are stored in localStorage on this device only. There is no backend
// and no sensitive personal health data is collected - only the ids of quiz
// questions that were answered correctly, keyed by learning path.

import { PATHS } from "../data/lessons";

const STORAGE_KEY = "kyb.scoreboard.v1";

// pathId -> array of question node ids answered correctly
type Scoreboard = Record<string, string[]>;

function hasStorage(): boolean {
  return typeof window !== "undefined" && !!window.localStorage;
}

function readScoreboard(): Scoreboard {
  if (!hasStorage()) return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed: unknown = JSON.parse(raw);
    if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
      return parsed as Scoreboard;
    }
  } catch {
    // Corrupted or unavailable storage: start fresh.
  }
  return {};
}

function writeScoreboard(scoreboard: Scoreboard): void {
  if (!hasStorage()) return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(scoreboard));
  } catch {
    // Storage may be unavailable (e.g. private mode); score stays in memory only.
  }
}

export function recordCorrect(pathId: string, questionId: string): void {
  const scoreboard = readScoreboard();
  const list = Array.isArray(scoreboard[pathId]) ? scoreboard[pathId] : [];
  if (!list.includes(questionId)) {
    list.push(questionId);
    scoreboard[pathId] = list;
    writeScoreboard(scoreboard);
  }
}

export function getPathCorrect(pathId: string): number {
  const list = readScoreboard()[pathId];
  return Array.isArray(list) ? list.length : 0;
}

export function getTotalCorrect(): number {
  const scoreboard = readScoreboard();
  return Object.values(scoreboard).reduce<number>(
    (sum, list) => sum + (Array.isArray(list) ? list.length : 0),
    0
  );
}

function countQuestions(pathId: string): number {
  const path = PATHS.find((p) => p.id === pathId);
  return path ? path.nodes.filter((n) => n.kind === "question").length : 0;
}

export function getPathTotalQuestions(pathId: string): number {
  return countQuestions(pathId);
}

export function getTotalQuestions(): number {
  return PATHS.reduce((sum, path) => sum + countQuestions(path.id), 0);
}

export function resetScoreboard(): void {
  if (!hasStorage()) return;
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Ignore storage errors.
  }
}
