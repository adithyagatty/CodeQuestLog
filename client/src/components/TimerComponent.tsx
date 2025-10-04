import { useState, useEffect, useCallback } from "react";
import { Play, Pause, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TimerComponentProps {
  onSessionComplete?: (duration: number) => void;
}

const TIMER_PRESETS = [20, 30, 45, 60] as const;

export default function TimerComponent({ onSessionComplete }: TimerComponentProps) {
  const [selectedDuration, setSelectedDuration] = useState(45);
  const [timeLeft, setTimeLeft] = useState(45 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [sessionCount, setSessionCount] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      setSessionCount((prev) => prev + 1);
      onSessionComplete?.(selectedDuration);
      setTimeLeft(selectedDuration * 60);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, timeLeft, selectedDuration, onSessionComplete]);

  const handlePresetSelect = useCallback((minutes: number) => {
    setSelectedDuration(minutes);
    setTimeLeft(minutes * 60);
    setIsRunning(false);
  }, []);

  const toggleTimer = useCallback(() => {
    setIsRunning((prev) => !prev);
  }, []);

  const resetTimer = useCallback(() => {
    setIsRunning(false);
    setTimeLeft(selectedDuration * 60);
    setSessionCount(0);
  }, [selectedDuration]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const progress = ((selectedDuration * 60 - timeLeft) / (selectedDuration * 60)) * 100;

  return (
    <Card className={`transition-all ${isRunning ? "border-timer-active animate-pulse-border" : ""}`} data-testid="card-timer">
      <CardHeader>
        <CardTitle className="text-base font-medium">Focus Timer</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-wrap gap-2 justify-center">
          {TIMER_PRESETS.map((minutes) => (
            <Button
              key={minutes}
              variant={selectedDuration === minutes ? "default" : "outline"}
              size="sm"
              onClick={() => handlePresetSelect(minutes)}
              disabled={isRunning}
              data-testid={`button-preset-${minutes}`}
            >
              {minutes}min
            </Button>
          ))}
        </div>

        <div className="relative flex items-center justify-center">
          <svg className="h-48 w-48 -rotate-90 transform">
            <circle
              cx="96"
              cy="96"
              r="88"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              className="text-muted"
            />
            <circle
              cx="96"
              cy="96"
              r="88"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              strokeDasharray={`${2 * Math.PI * 88}`}
              strokeDashoffset={`${2 * Math.PI * 88 * (1 - progress / 100)}`}
              className="text-timer-active transition-all duration-1000"
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute flex flex-col items-center">
            <span className="font-mono text-5xl font-bold" data-testid="text-timer-display">
              {formatTime(timeLeft)}
            </span>
          </div>
        </div>

        <div className="flex justify-center gap-3">
          <Button
            size="icon"
            onClick={toggleTimer}
            data-testid="button-timer-toggle"
          >
            {isRunning ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
          </Button>
          <Button
            size="icon"
            variant="outline"
            onClick={resetTimer}
            data-testid="button-timer-reset"
          >
            <RotateCcw className="h-5 w-5" />
          </Button>
        </div>

        {sessionCount > 0 && (
          <p className="text-center text-sm text-muted-foreground" data-testid="text-session-count">
            Session {sessionCount} of continuous practice
          </p>
        )}
      </CardContent>
    </Card>
  );
}
