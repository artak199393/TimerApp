import "./styles.css";
import { useState } from "react";
import Timer from "./components/Timer";

export default function App() {
  const [timers, setTimers] = useState([0]);

  const addTimer = () => {
    const newTimer = timers.length;
    setTimers((prev) => [...timers, newTimer]);
  };

  const removeTimer = () => {
    if (timers.length > 0) {
      const newTimers = [...timers];
      newTimers.pop();
      setTimers(newTimers);
    }
  };

  return (
    <div className="app">
      <div>
        {timers.map((item) => {
          return <Timer key={item} />;
        })}
      </div>
      <div className="buttons">
        <button onClick={addTimer}>Add Timer</button>
        <button onClick={removeTimer}>Remove Timer</button>
      </div>
    </div>
  );
}
