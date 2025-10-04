import { Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { DataStructure, DifficultyLevel } from "@shared/schema";

interface DataStructureCardProps {
  topic: DataStructure;
  easy: number;
  medium: number;
  hard: number;
  onIncrement: (difficulty: DifficultyLevel) => void;
  onDecrement: (difficulty: DifficultyLevel) => void;
}

const difficultyColors = {
  easy: "text-success",
  medium: "text-warning",
  hard: "text-destructive",
};

export default function DataStructureCard({
  topic,
  easy,
  medium,
  hard,
  onIncrement,
  onDecrement,
}: DataStructureCardProps) {
  const renderCounter = (difficulty: DifficultyLevel, count: number) => (
    <div className="flex flex-col items-center gap-2" data-testid={`container-${difficulty}-${topic}`}>
      <span className={`text-xs font-medium uppercase tracking-wide ${difficultyColors[difficulty]}`}>
        {difficulty}
      </span>
      <span className="font-mono text-2xl font-semibold" data-testid={`text-count-${difficulty}-${topic}`}>
        {count}
      </span>
      <div className="flex gap-1">
        <Button
          size="icon"
          variant="ghost"
          className="h-8 w-8"
          onClick={() => onDecrement(difficulty)}
          data-testid={`button-decrement-${difficulty}-${topic}`}
        >
          <Minus className="h-4 w-4" />
        </Button>
        <Button
          size="icon"
          variant="ghost"
          className="h-8 w-8"
          onClick={() => onIncrement(difficulty)}
          data-testid={`button-increment-${difficulty}-${topic}`}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );

  return (
    <Card className="hover-elevate transition-all" data-testid={`card-topic-${topic}`}>
      <CardHeader className="pb-4">
        <CardTitle className="text-base font-medium" data-testid={`text-topic-name-${topic}`}>{topic}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4">
          {renderCounter("easy", easy)}
          {renderCounter("medium", medium)}
          {renderCounter("hard", hard)}
        </div>
      </CardContent>
    </Card>
  );
}
