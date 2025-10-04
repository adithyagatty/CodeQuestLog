import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { TopicProgress, SolveRecord } from "@shared/schema";
import { TrendingUp, Target, Calendar, Zap } from "lucide-react";

interface ProgressAnalyticsProps {
  topicProgress: TopicProgress[];
  solveHistory: SolveRecord[];
}

export default function ProgressAnalytics({ topicProgress, solveHistory }: ProgressAnalyticsProps) {
  const totalSolved = topicProgress.reduce((acc, topic) => acc + topic.easy + topic.medium + topic.hard, 0);
  
  const getDaysSolved = () => {
    const uniqueDays = new Set(solveHistory.map(record => record.date));
    return uniqueDays.size;
  };

  const avgPerDay = getDaysSolved() > 0 ? (totalSolved / getDaysSolved()).toFixed(1) : "0";

  const getTopTopics = () => {
    return [...topicProgress]
      .sort((a, b) => (b.easy + b.medium + b.hard) - (a.easy + a.medium + a.hard))
      .slice(0, 3);
  };

  const getWeakTopics = () => {
    return [...topicProgress]
      .filter(t => (t.easy + t.medium + t.hard) > 0)
      .sort((a, b) => (a.easy + a.medium + a.hard) - (b.easy + b.medium + b.hard))
      .slice(0, 3);
  };

  const topTopics = getTopTopics();
  const weakTopics = getWeakTopics();

  return (
    <div className="space-y-6" data-testid="container-progress-analytics">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card data-testid="card-metric-total">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Solved</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-mono font-bold" data-testid="text-metric-total">{totalSolved}</div>
            <p className="text-xs text-muted-foreground">All difficulties combined</p>
          </CardContent>
        </Card>

        <Card data-testid="card-metric-days">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Days</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-mono font-bold" data-testid="text-metric-days">{getDaysSolved()}</div>
            <p className="text-xs text-muted-foreground">Days with activity</p>
          </CardContent>
        </Card>

        <Card data-testid="card-metric-avg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg per Day</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-mono font-bold" data-testid="text-metric-avg">{avgPerDay}</div>
            <p className="text-xs text-muted-foreground">Problems solved daily</p>
          </CardContent>
        </Card>

        <Card data-testid="card-metric-recent">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recent Activity</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-mono font-bold" data-testid="text-metric-recent">
              {solveHistory.slice(-7).length}
            </div>
            <p className="text-xs text-muted-foreground">Last 7 solves</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card data-testid="card-top-topics">
          <CardHeader>
            <CardTitle className="text-base">Top Topics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {topTopics.length === 0 ? (
              <p className="text-sm text-muted-foreground">No data yet. Start solving!</p>
            ) : (
              topTopics.map((topic) => {
                const total = topic.easy + topic.medium + topic.hard;
                return (
                  <div key={topic.topic} className="space-y-1" data-testid={`top-topic-${topic.topic}`}>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{topic.topic}</span>
                      <span className="text-sm font-mono text-muted-foreground">{total}</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full bg-primary transition-all"
                        style={{ width: `${Math.min((total / totalSolved) * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                );
              })
            )}
          </CardContent>
        </Card>

        <Card data-testid="card-weak-topics">
          <CardHeader>
            <CardTitle className="text-base">Focus Areas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {weakTopics.length === 0 ? (
              <p className="text-sm text-muted-foreground">Keep practicing to identify focus areas</p>
            ) : (
              weakTopics.map((topic) => {
                const total = topic.easy + topic.medium + topic.hard;
                return (
                  <div key={topic.topic} className="flex items-center justify-between" data-testid={`weak-topic-${topic.topic}`}>
                    <span className="text-sm font-medium">{topic.topic}</span>
                    <span className="text-sm font-mono text-warning">{total} solved</span>
                  </div>
                );
              })
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
