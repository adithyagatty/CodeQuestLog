import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { SolveRecord } from "@shared/schema";
import { format } from "date-fns";

interface HistoryListProps {
  solveHistory: SolveRecord[];
}

const difficultyColors = {
  easy: "text-success",
  medium: "text-warning",
  hard: "text-destructive",
};

export default function HistoryList({ solveHistory }: HistoryListProps) {
  const sortedHistory = [...solveHistory].sort((a, b) => b.timestamp - a.timestamp);

  return (
    <Card data-testid="card-history">
      <CardHeader>
        <CardTitle className="text-base">Solve History</CardTitle>
      </CardHeader>
      <CardContent>
        {sortedHistory.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center" data-testid="container-empty-history">
            <p className="text-sm text-muted-foreground">No solves yet</p>
            <p className="text-xs text-muted-foreground">Start solving to track your progress!</p>
          </div>
        ) : (
          <div className="space-y-2">
            {sortedHistory.map((record) => (
              <div
                key={record.id}
                className="flex items-center justify-between rounded-lg border border-border p-3 hover-elevate transition-all"
                data-testid={`history-item-${record.id}`}
              >
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-medium" data-testid={`history-topic-${record.id}`}>{record.topic}</span>
                  <span className="text-xs text-muted-foreground" data-testid={`history-time-${record.id}`}>
                    {format(new Date(record.timestamp), "MMM d, yyyy 'at' h:mm a")}
                  </span>
                </div>
                <span
                  className={`text-sm font-medium uppercase ${difficultyColors[record.difficulty]}`}
                  data-testid={`history-difficulty-${record.id}`}
                >
                  {record.difficulty}
                </span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
