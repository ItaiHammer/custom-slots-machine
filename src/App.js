import React from "react";
import { useState, useEffect, useRef } from "react";
import "./App.css";
import FeatherIcon from "feather-icons-react";
import { Slider, RangeSlider, Row, Col, InputGroup, InputNumber } from "rsuite";

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
    "Stop taking my money! -Zia",
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
    "🍆",
    "🍔",
    "🥥",
    "🍕",
    "🍫",
    "🧀",
    "🍊",
    "🍪",
  ]);
  const [displayWinChance, setDisplayWinChance] = useState(true);
  const [emojisInUse, setEmojisInUse] = useState(2);
  const [slotCount, setSlotCount] = useState(3);
  const [slots, setSlots] = useState([]);
  const [hasWon, setHasWon] = useState(null);
  const [message, setMessage] = useState("");
  const [isSpinning, setIsSpinning] = useState(false);
  const [time, setTime] = useState(4000);
  const [animationChangeTime, setAnimationChangeTime] = useState(200);
  const [spinnerElements, setSpinnerElements] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const body = useRef();

  function randomizeSlots() {
    let temp = [];

    for (let i = 0; i < slotCount; i++) {
      let temp2 = [];
      for (let j = 0; j < time / 100; j++) {
        temp2.push(emojis[Math.round(Math.random() * (emojisInUse - 1))]);
      }
      temp.push(temp2);
    }
    setSlots(temp);
  }

  function spin() {
    if (isSpinning) return;

    setIsSpinning(true);

    randomizeSlots();

    setTimeout(() => {
      setIsSpinning(false);

      updateMessage();
    }, time);

    setMessage("");
  }

  function updateMessage() {
    console.log(slots.length);
    for (let i = 1; i < slots.length; i++) {
      console.log("comparing: " + slots[i - 1][1] + " to " + slots[i][1]);
      if (slots[i - 1][1] !== slots[i][1]) {
        setHasWon(false);
        return;
      } else if (i === slots.length - 1) {
        setHasWon(true);
        return;
      }
    }
  }

  function calProbability() {
    return Math.pow(1 / emojisInUse, slotCount);
  }

  function calProbabilityText() {
    return "1/" + Math.pow(emojisInUse, slotCount);
  }

  function Slots() {
    let s = [];
    let spinners = [];

    for (let i = 0; i < slots.length; i++) {
      let slotSpots = [];

      for (let j = 0; j < slots[i].length; j++) {
        slotSpots.push(<span id={j}>{slots[i][j]}</span>);
      }

      let spinner = (
        <div
          className={
            "spinner " +
            ("spinner" + (i + 1)) +
            " " +
            (isSpinning ? "animated-spinner" : "")
          }
        >
          {slotSpots.map((spot) => spot)}
        </div>
      );

      let slot = <div className="slot">{spinner}</div>;

      // spinners.push(spinner);
      s.push(slot);
    }

    let element = (
      <div className="slots">
        <div
          style={{ width: slotCount * 4.33 + "rem" }}
          className="highlight"
        ></div>
        {s.map((slot) => slot)}
      </div>
    );

    // setSpinnerElements(spinners);

    return element;
  }

  useEffect(() => {
    if (isSpinning) {
      // for (let i = 0; i < spinnerElements.length; i++) {
      //   const element = spinnerElements[i];
      //   // element.
      // }
    }
  }, [isSpinning]);

  useEffect(() => {
    let arr = [];

    for (let i = 0; i < slotCount; i++) {
      let arr2 = [];

      for (let i = 0; i < 50; i++) {
        arr2.push([]);
      }

      arr.push(arr2);
    }

    setSlots(arr);

    randomizeSlots();
  }, [slotCount]);

  useEffect(() => {
    console.log(hasWon);
    if (hasWon) {
      setMessage(winner[Math.floor(Math.random() * winner.length)]);
    } else if (!hasWon) {
      setMessage(loser[Math.floor(Math.random() * loser.length)]);
    } else if (hasWon == null) {
      setMessage("");
    }
  }, [hasWon]);

  function Slider() {
    const [value, setValue] = React.useState(0);
    return (
      <Row>
        <Col md={10}>
          <Slider
            progress
            style={{ marginTop: 16 }}
            value={value}
            onChange={(value) => {
              setValue(value);
            }}
          />
        </Col>
        <Col md={4}>
          <InputNumber
            min={0}
            max={100}
            value={value}
            onChange={(value) => {
              setValue(value);
            }}
          />
        </Col>
      </Row>
    );
  }

  function Sidebar() {
    const toggleSidebar = () => {
      setExpanded(!expanded);
    };

    const lists = [
      {
        name: "Slot Count",
        var: slotCount,
        set: setSlotCount,
        type: "num",
        low: 0,
        high: 9,
      },
      {
        name: "Emojis In Use",
        var: emojisInUse,
        set: setEmojisInUse,
        type: "num",
        low: 0,
        high: 10,
      },
      {
        name: "Show Win Chance",
        var: displayWinChance,
        set: setDisplayWinChance,
        type: "toggle",
      },
    ];

    return (
      // <div className={`sidebar ${expanded ? 'expanded' : ''}`}>
      //     <button onClick={toggleSidebar}>Toggle Sidebar</button>
      //     {expanded && (
      //         <div className="sidebar-content">
      //             {/* put your sidebar content here */}
      //         </div>
      //     )}
      // </div>
      <div className={`${expanded ? "expended" : "bar"}`}>
        <div className="menu">
          <button className="but" onClick={toggleSidebar}>
            <FeatherIcon color="white" icon="settings" />
          </button>
          <div className={`items ${expanded ? "" : "noItems"}`}>
            {lists?.map((item, i) => (
              <>
                <p className="item">{item.name}</p>
                {item.type === "num" ? (
                  <input
                    className="item-input"
                    type="number"
                    min={item.low}
                    max={item.high}
                    value={item.var}
                    onChange={(e) => {
                      item.set(e.target.value);
                      e.target.select();
                      e.target.focus();
                    }}
                  />
                ) : item.type === "toggle" ? (
                  <input
                    type="checkbox"
                    onChange={(e) => item.set(!item.var)}
                    value={item.var}
                    className="item"
                  />
                ) : (
                  ""
                )}
              </>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="window" ref={body}>
      <Sidebar />
      <div className="App">
        <h1 className="title">Slot Machine</h1>
        <Slots />
        <button className="button" onClick={spin}>
          Spin
        </button>
        <p className="prob">
          {displayWinChance ? "Win Chance: " + calProbabilityText() : ""}
        </p>
      </div>
    </div>
  );
}
