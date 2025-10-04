import TimerComponent from '../TimerComponent';

export default function TimerComponentExample() {
  return (
    <div className="p-6 bg-background flex justify-center">
      <div className="w-full max-w-md">
        <TimerComponent onSessionComplete={(duration) => console.log(`Session completed: ${duration}min`)} />
      </div>
    </div>
  );
}
