import { useState } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import DashboardHeader from "@/components/DashboardHeader";
import TabNavigation from "@/components/TabNavigation";
import DataStructureCard from "@/components/DataStructureCard";
import TimerComponent from "@/components/TimerComponent";
import ProgressAnalytics from "@/components/ProgressAnalytics";
import HistoryList from "@/components/HistoryList";
import type { TopicProgress, SolveRecord, DifficultyLevel, DataStructure } from "@shared/schema";
import { dataStructures } from "@shared/schema";
import { format } from "date-fns";

type Tab = "dashboard" | "timer" | "progress" | "history";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<Tab>("dashboard");
  
  const initialProgress: TopicProgress[] = dataStructures.map(topic => ({
    topic,
    easy: 0,
    medium: 0,
    hard: 0,
  }));

  const [topicProgress, setTopicProgress] = useLocalStorage<TopicProgress[]>("topicProgress", initialProgress);
  const [solveHistory, setSolveHistory] = useLocalStorage<SolveRecord[]>("solveHistory", []);

  const handleIncrement = (topic: DataStructure, difficulty: DifficultyLevel) => {
    setTopicProgress(prev => 
      prev.map(tp => 
        tp.topic === topic 
          ? { ...tp, [difficulty]: tp[difficulty] + 1 }
          : tp
      )
    );

    const newRecord: SolveRecord = {
      id: `${Date.now()}-${Math.random()}`,
      topic,
      difficulty,
      timestamp: Date.now(),
      date: format(new Date(), "yyyy-MM-dd"),
    };

    setSolveHistory(prev => [...prev, newRecord]);
  };

  const handleDecrement = (topic: DataStructure, difficulty: DifficultyLevel) => {
    setTopicProgress(prev => 
      prev.map(tp => 
        tp.topic === topic && tp[difficulty] > 0
          ? { ...tp, [difficulty]: tp[difficulty] - 1 }
          : tp
      )
    );
  };

  const totalSolved = topicProgress.reduce((acc, tp) => acc + tp.easy + tp.medium + tp.hard, 0);
  
  const getStreak = () => {
    if (solveHistory.length === 0) return 0;
    const uniqueDates = Array.from(new Set(solveHistory.map(r => r.date))).sort().reverse();
    let streak = 0;
    const today = format(new Date(), "yyyy-MM-dd");
    
    for (let i = 0; i < uniqueDates.length; i++) {
      const expectedDate = format(new Date(Date.now() - i * 86400000), "yyyy-MM-dd");
      if (uniqueDates[i] === expectedDate || (i === 0 && uniqueDates[i] < today)) {
        streak++;
      } else {
        break;
      }
    }
    return streak;
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader totalSolved={totalSolved} currentStreak={getStreak()} />
      <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
      
      <main className="container mx-auto px-4 py-6 md:px-6">
        {activeTab === "dashboard" && (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {topicProgress.map(tp => (
              <DataStructureCard
                key={tp.topic}
                topic={tp.topic}
                easy={tp.easy}
                medium={tp.medium}
                hard={tp.hard}
                onIncrement={(difficulty) => handleIncrement(tp.topic, difficulty)}
                onDecrement={(difficulty) => handleDecrement(tp.topic, difficulty)}
              />
            ))}
          </div>
        )}

        {activeTab === "timer" && (
          <div className="flex justify-center">
            <div className="w-full max-w-md">
              <TimerComponent onSessionComplete={(duration) => console.log(`Session ${duration}min complete`)} />
            </div>
          </div>
        )}

        {activeTab === "progress" && (
          <ProgressAnalytics topicProgress={topicProgress} solveHistory={solveHistory} />
        )}

        {activeTab === "history" && (
          <HistoryList solveHistory={solveHistory} />
        )}
      </main>
    </div>
  );
}
