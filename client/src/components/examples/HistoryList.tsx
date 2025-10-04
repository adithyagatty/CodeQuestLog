import HistoryList from '../HistoryList';

export default function HistoryListExample() {
  const mockHistory = [
    { id: "1", topic: "Array" as const, difficulty: "easy" as const, timestamp: Date.now() - 3600000, date: "2025-10-04" },
    { id: "2", topic: "String" as const, difficulty: "medium" as const, timestamp: Date.now() - 1800000, date: "2025-10-04" },
    { id: "3", topic: "Hash Map" as const, difficulty: "hard" as const, timestamp: Date.now(), date: "2025-10-04" },
  ];

  return (
    <div className="p-6 bg-background">
      <HistoryList solveHistory={mockHistory} />
    </div>
  );
}
