import { useState } from 'react';
import TabNavigation from '../TabNavigation';

export default function TabNavigationExample() {
  const [activeTab, setActiveTab] = useState<"dashboard" | "timer" | "progress" | "history">("dashboard");
  
  return (
    <div className="bg-background">
      <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}
