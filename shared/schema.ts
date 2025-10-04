import { z } from "zod";

export const difficultyLevels = ["easy", "medium", "hard"] as const;
export type DifficultyLevel = typeof difficultyLevels[number];

export const dataStructures = [
  "Array",
  "String",
  "Two Pointers",
  "Sliding Window",
  "Hash Map",
  "Recursion",
  "Graph",
  "Tree",
  "Dynamic Programming",
  "Backtracking",
  "Binary Search",
  "Heap",
  "Greedy Algorithms",
] as const;

export type DataStructure = typeof dataStructures[number];

export const solveRecordSchema = z.object({
  id: z.string(),
  topic: z.enum(dataStructures),
  difficulty: z.enum(difficultyLevels),
  timestamp: z.number(),
  date: z.string(),
});

export const topicProgressSchema = z.object({
  topic: z.enum(dataStructures),
  easy: z.number().default(0),
  medium: z.number().default(0),
  hard: z.number().default(0),
});

export const timerSessionSchema = z.object({
  duration: z.number(),
  startTime: z.number(),
  sessionCount: z.number(),
});

export type SolveRecord = z.infer<typeof solveRecordSchema>;
export type TopicProgress = z.infer<typeof topicProgressSchema>;
export type TimerSession = z.infer<typeof timerSessionSchema>;
