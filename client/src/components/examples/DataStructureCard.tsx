import DataStructureCard from '../DataStructureCard';

export default function DataStructureCardExample() {
  return (
    <div className="p-6 bg-background">
      <DataStructureCard
        topic="Array"
        easy={15}
        medium={8}
        hard={3}
        onIncrement={(difficulty) => console.log(`Increment ${difficulty}`)}
        onDecrement={(difficulty) => console.log(`Decrement ${difficulty}`)}
      />
    </div>
  );
}
