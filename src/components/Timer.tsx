import React, { useState, useRef, useEffect } from "react";

const Timer = () => {
  const interval = useRef<NodeJS.Timeout | null>(null);
  const initialTime = useRef(0);
  const [time, setTime] = useState(0);
  const [isInProcess, setIsInProcess] = useState(false);
  const [pauseTime, setPauseTime] = useState(0);

  useEffect(() => {
    return () => {
      if (interval.current) {
        clearInterval(interval.current);
      }
    };
  }, []);

  const startPauseTimer = () => {
    if (isInProcess) {
      clearInterval(interval.current!);
      setIsInProcess(false);
      setPauseTime(Date.now());
    } else {
      if (pauseTime !== 0) {
        const elapsedTime = Date.now() - pauseTime;
        initialTime.current += elapsedTime;
        setPauseTime(0);
      } else {
        initialTime.current = Date.now();
      }
      setIsInProcess(true);
      interval.current = setInterval(() => {
        setTime(Date.now() - initialTime.current);
      }, 100);
    }
  };

  const reset = () => {
    clearInterval(interval.current!);
    setTime(0);
    setIsInProcess(false);
    initialTime.current = 0;
    setPauseTime(0);
  };

  const hours = `${Math.floor(time / 3600000).toString().padStart(2, "0")}`;
  const minutes = `${Math.floor((time / 60000) % 60).toString().padStart(2, "0")}`;
  const seconds = `${Math.floor((time / 1000) % 60).toString().padStart(2, "0")}`;

  return (
    <div className="timer">
      <div>
        {`${hours}:${minutes}:${seconds}`}
      </div>
      <div className="buttons">
        <button onClick={startPauseTimer}>
          {isInProcess ? "Pause" : "Start"}
        </button>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
};

export default Timer;
