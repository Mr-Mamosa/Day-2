"use client";
import { useState, useRef, useEffect } from 'react';

const WPMTest = () => {
  const [text, setText] = useState("The quick brown fox jumps over the lazy dog.");
  const [inputValue, setInputValue] = useState("");
  const [startTime, setStartTime] = useState<number | null>(null);
  const [wpm, setWpm] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (startTime && inputValue.length === text.length) {
      const endTime = new Date().getTime();
      const duration = (endTime - startTime) / 1000 / 60; // in minutes
      const wordCount = text.split(" ").length;
      setWpm(Math.round(wordCount / duration));
    }
  }, [inputValue, startTime, text]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!startTime) {
      setStartTime(new Date().getTime());
    }
    setInputValue(e.target.value);
  };

  const resetTest = () => {
    setInputValue("");
    setStartTime(null);
    setWpm(0);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const renderText = () => {
    return text.split("").map((char, index) => {
      let color = "text-zinc-500";
      if (index < inputValue.length) {
        color = char === inputValue[index] ? "text-green-500" : "text-red-500";
      }
      return <span key={index} className={color}>{char}</span>;
    });
  };

  return (
    <div className="p-4 bg-[#1c1c1c] rounded-lg">
      <h3 className="text-lg font-bold mb-4">WPM Typing Test</h3>
      <div className="text-lg mb-4 p-4 bg-zinc-800 rounded-md">
        {renderText()}
      </div>
      <input
        ref={inputRef}
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        className="w-full p-2 bg-zinc-900 rounded-md text-white"
        disabled={wpm > 0}
      />
      {wpm > 0 && (
        <div className="mt-4 text-center">
          <p className="text-2xl font-bold">Your WPM: {wpm}</p>
          <button
            onClick={resetTest}
            className="mt-2 px-4 py-2 bg-green-600 hover:bg-green-700 rounded-md text-white"
          >
            Try Again
          </button>
        </div>
      )}
    </div>
  );
};

export default WPMTest;