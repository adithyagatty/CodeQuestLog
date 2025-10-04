import { Code2, Flame, TrendingUp } from "lucide-react";

interface DashboardHeaderProps {
  totalSolved: number;
  currentStreak: number;
}

export default function DashboardHeader({ totalSolved, currentStreak }: DashboardHeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
            <Code2 className="h-6 w-6 text-primary-foreground" />
          </div>
          <h1 className="text-xl font-semibold tracking-tight" data-testid="text-app-title">CodeTrack</h1>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2" data-testid="container-streak">
            <Flame className="h-5 w-5 text-warning" />
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground">Streak</span>
              <span className="font-mono text-lg font-semibold" data-testid="text-streak-count">{currentStreak}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2" data-testid="container-total-solved">
            <TrendingUp className="h-5 w-5 text-success" />
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground">Solved</span>
              <span className="font-mono text-lg font-semibold" data-testid="text-total-solved">{totalSolved}</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
