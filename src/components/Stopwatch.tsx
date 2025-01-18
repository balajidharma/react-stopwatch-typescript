
import {useState, useRef, useEffect} from 'react'

export default function Stopwatch()
{
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(0);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10); 
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  const handleStart = () => {
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
  };

  const formatTime = (time: number) => {
    const milliseconds = Math.floor((time % 1000) / 10).toString().padStart(2, '0');
    const seconds = Math.floor((time / 1000) % 60).toString().padStart(2, '0');
    const minutes = Math.floor((time / (1000 * 60)) % 60).toString().padStart(2, '0');
    const hours = Math.floor((time / (1000 * 60 * 60)) % 24).toString().padStart(2, '0');

    return {hours,minutes,seconds,milliseconds};
  };
  const {hours,minutes,seconds,milliseconds} = formatTime(time);

  return (
    <div className="App">
      <h1>Stopwatch</h1>
      <div className="stopwatch">
        <div className="timer-container">
          <div className="timer-box">
            <h1 title="Hours">{hours}</h1>
          </div>
          <span className="colon">:</span>
          <div className="timer-box">
            <h1 title="Minutes">{minutes}</h1>
          </div>
          <span className="colon">:</span>
          <div className="timer-box">
            <h1 title="Seconds">{seconds}</h1>
          </div>
          <span className="colon">:</span>
          <div className="timer-box">
            <h1 title="Milliseconds">{milliseconds}</h1>
          </div>
        </div>
      </div>
      <div className="buttons">
        {!isRunning ? 
        <button onClick={handleStart}>
          Start
        </button>
        :
        <button onClick={handlePause}>
          Pause
        </button>
        }
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
}