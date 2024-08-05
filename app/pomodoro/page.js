'use client';

import { useState, useEffect } from 'react';
import Layout from '../layout';
import Link from 'next/link';
import '../globals.css';

const PomodoroPage = () => {
  const [timeLeft, setTimeLeft] = useState(1500);
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [buttonLabel, setButtonLabel] = useState('Break');

  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 0) {
            clearInterval(timer);
            if (isBreak) {
              setIsBreak(false);
              setTimeLeft(1500);
              setButtonLabel('Break');
            } else {
              // End of work period
              setIsBreak(true);
              setTimeLeft(300);
              setButtonLabel('Reset');
            }
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isRunning, isBreak]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const handleStartPause = () => {
    setIsRunning(!isRunning);
  };

  const handleButtonClick = () => {
    if (buttonLabel === 'Break') {
      setIsRunning(true);
      setButtonLabel('Reset');
      setTimeLeft(300);
      setIsBreak(true);
    } else if (buttonLabel === 'Reset') {
      setIsRunning(false);
      setTimeLeft(1500);
      setButtonLabel('Break');
      setIsBreak(false);
    }
  };
  
  return (
    <Layout>
      <main className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
        <div className="flex flex-col items-center">
          <div className="relative bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
            <div className="text-6xl font-bold mb-4">{formatTime(timeLeft)}</div>
            <div className="text-xl mb-4">
              {isBreak ? 'Take a break!' : 'Focus Time!'}
            </div>
            <button
              onClick={handleStartPause}
              className={`py-2 px-6 rounded-full text-white font-semibold ${
                isRunning ? 'bg-red-600 hover:bg-red-500' : 'bg-green-600 hover:bg-green-500'
              } transition-colors duration-300`}
            >
              {isRunning ? 'Pause' : 'Start'}
            </button>
            <button
              onClick={handleButtonClick}
              className="mt-4 py-2 px-6 rounded-full bg-gray-600 hover:bg-gray-500 text-white font-semibold transition-colors duration-300"
            >
              {buttonLabel}
            </button>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default PomodoroPage;
