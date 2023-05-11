import { useState, useEffect, useRef } from "react";
import "./App.css";

export default function App() {
  const loser = [
    "Not quite",
    "Stop gambling",
    "Hey, you lost!",
    "Ouch! I felt that",
    "Don't beat yourself up",
    "There goes the college fund",
    "You're awesome at losing",
    "Don't hate the game hate the player",
    "The only thing you won is a participation trophy.",
    "I think it's time to switch to Minesweeper.",
    "You lost, but don't worry, I'm sure you'll get a participation ribbon.",
    "Looks like you're going to need a bigger boat... or just better luck.",
    "I'm pretty sure the game is rigged against you. You should sue.",
    "Don't worry, even Michael Jordan lost some games.",
    "Better luck next time, champ.",
    "The good news is, you can always blame lag.",
    "Don't worry, losing is just the universe's way of keeping you humble.",
    "99% of gamblers quit right before they win big!",
  ];

  const winner = [
    "Congratulations, you won!",
    "Wow, now try to get a streak...",
    "Jackpot! You hit it big!",
    "You're a winner, keep it up!",
    "You're a natural-born winner!",
    "Way to go, you're killing it!",
    "You're a pro at this!",
    "Winner, winner, chicken dinner!",
    "You're so good, I'm pretty sure you just hacked the game.",
    "You must have been born with a horseshoe in your pocket!",
    "You're a winner, and you didn't even have to bribe me!",
    "You won! I'm giving you a virtual high-five right now.",
  ];

  const [emojis, setEmojis] = useState([
    "🍒",
    "🍉",
    "🍋",
    "🍇",
    "🍓",
    "🍔",
    "🍕",
    "🧀",
    "🍪",
    "🍫",
  ]);
  const [emojisInUse, setEmojisInUse] = useState(3);
  const [slotCount, setSlotCount] = useState(3);
  const [slots, setSlots] = useState([]);
  const [message, setMessage] = useState("");
  const [isSpinning, setIsSpinning] = useState(false);
  const [time, setTime] = useState(500);
  const [animationChangeTime, setAnimationChangeTime] = useState(200);

  function randomizeSlots() {
    let temp = [];

    for (let i = 0; i < slotCount; i++) {
      temp.push(emojis[Math.round(Math.random() * emojisInUse)]);
    }
    setSlots(temp);
  }

  function spin() {
    if (isSpinning) return;

    setIsSpinning(true);

    setTimeout(() => {
      setIsSpinning(false);

      randomizeSlots();

      for (let i = 1; i < slots.length; i++) {
        if (slots[i] !== slots[i - 1]) {
          setMessage(loser[Math.floor(Math.random() * loser.length)]);
          break;
        } else if (i === slots.length - 1) {
          setMessage(winner[Math.floor(Math.random() * winner.length)]);
        }
      }

      console.log(message);
    }, time);
  }

  function calProbability() {
    return Math.pow(1 / emojisInUse, slotCount);
  }

  function calProbabilityText() {
    return "1/" + Math.pow(emojisInUse, slotCount);
  }

  function Slots() {
    let s = [];

    for (let i = 0; i < slots.length; i++) {
      s.push(
        <div className="slot">
          <span>{slots[i]}</span>
        </div>
      );
    }

    console.log(s);

    let element = <div className="slots">{s.map((slot) => slot)}</div>;

    return element;
  }

  function spinningAnimation() {
    setTimeout(() => {
      if (!isSpinning) {
        return;
      } else {
        randomizeSlots();
        spinningAnimation();
      }
    }, animationChangeTime);
  }

  useEffect(() => {
    if (isSpinning) {
      // spinningAnimation();
    }
  }, [isSpinning]);

  useEffect(() => {
    let arr = [];

    for (let i = 0; i < slotCount; i++) {
      arr.push("");
    }

    setSlots(arr);

    randomizeSlots();
  }, [slotCount]);

  return (
    <div className="App">
      <h1>Slot Machine</h1>
      <Slots />
      <button onClick={spin}>Spin</button>
      <p className="message">{message}</p>
      <p className="prob">{"Win Chance: " + calProbabilityText()}</p>
    </div>
  );
}
