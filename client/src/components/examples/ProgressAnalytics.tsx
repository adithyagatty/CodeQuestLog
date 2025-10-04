import ProgressAnalytics from '../ProgressAnalytics';

export default function ProgressAnalyticsExample() {
  const mockTopicProgress = [
    { topic: "Array" as const, easy: 15, medium: 8, hard: 3 },
    { topic: "String" as const, easy: 12, medium: 5, hard: 2 },
    { topic: "Hash Map" as const, easy: 10, medium: 6, hard: 1 },
  ];

  const mockSolveHistory = [
    { id: "1", topic: "Array" as const, difficulty: "easy" as const, timestamp: Date.now(), date: "2025-10-04" },
    { id: "2", topic: "String" as const, difficulty: "medium" as const, timestamp: Date.now(), date: "2025-10-04" },
  ];

  return (
    <div className="p-6 bg-background">
      <ProgressAnalytics topicProgress={mockTopicProgress} solveHistory={mockSolveHistory} />
    </div>
  );
}
