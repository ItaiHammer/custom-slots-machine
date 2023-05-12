import React from 'react';
import { useState, useEffect, useRef } from 'react';
import './App.css';
import { HiMenuAlt3 } from 'react-icons/hi';

export default function App() {
    const loser = [
        'Not quite',
        'Stop gambling',
        'Hey, you lost!',
        'Ouch! I felt that',
        "Don't beat yourself up",
        'There goes the college fund',
        "You're awesome at losing",
        "Don't hate the game hate the player",
        'The only thing you won is a participation trophy.',
        "I think it's time to switch to Minesweeper.",
        "You lost, but don't worry, I'm sure you'll get a participation ribbon.",
        "Looks like you're going to need a bigger boat... or just better luck.",
        "I'm pretty sure the game is rigged against you. You should sue.",
        "Don't worry, even Michael Jordan lost some games.",
        'Better luck next time, champ.',
        'The good news is, you can always blame lag.',
        "Don't worry, losing is just the universe's way of keeping you humble.",
        '99% of gamblers quit right before they win big!',
    ];

    const winner = [
        'Congratulations, you won!',
        'Wow, now try to get a streak...',
        'Jackpot! You hit it big!',
        "You're a winner, keep it up!",
        "You're a natural-born winner!",
        "Way to go, you're killing it!",
        "You're a pro at this!",
        'Stop taking my money! -Zia',
        'Winner, winner, chicken dinner!',
        "You're so good, I'm pretty sure you just hacked the game.",
        'You must have been born with a horseshoe in your pocket!',
        "You're a winner, and you didn't even have to bribe me!",
        "You won! I'm giving you a virtual high-five right now.",
    ];

    const [emojis, setEmojis] = useState([
        '🍒',
        '🍉',
        '🍋',
        '🍇',
        '🍓',
        '🍔',
        '🍕',
        '🧀',
        '🍪',
        '🍫',
    ]);
    const [emojisInUse, setEmojisInUse] = useState(10);
    const [slotCount, setSlotCount] = useState(3);
    const [slots, setSlots] = useState([]);
    const [message, setMessage] = useState('');
    const [isSpinning, setIsSpinning] = useState(false);
    const [time, setTime] = useState(4000);
    const [animationChangeTime, setAnimationChangeTime] = useState(200);

    function randomizeSlots() {
        let temp = [];

        for (let i = 0; i < slotCount; i++) {
            let temp2 = [];
            for (let j = 0; j < time / 100; j++) {
                temp2.push(
                    emojis[Math.round(Math.random() * (emojisInUse - 1))]
                );
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

            for (let i = 1; i < slots.length; i++) {
                if (slots[i][1] !== slots[i - 1][1]) {
                    setMessage(loser[Math.floor(Math.random() * loser.length)]);
                    break;
                } else if (i === slots.length - 1) {
                    setMessage(
                        winner[Math.floor(Math.random() * winner.length)]
                    );
                }
            }

            console.log(message);
        }, time);
    }

    function calProbability() {
        return Math.pow(1 / emojisInUse, slotCount);
    }

    function calProbabilityText() {
        return '1/' + Math.pow(emojisInUse, slotCount);
    }

    function Slots() {
        let s = [];

        for (let i = 0; i < slots.length; i++) {
            let slotSpots = [];

            for (let j = 0; j < slots[i].length; j++) {
                slotSpots.push(<span id={j}>{slots[i][j]}</span>);
            }

            let slot = (
                <div className="slot">
                    <div className="spinner animated-spinner">
                        {slotSpots.map((spot) => spot)}
                    </div>
                </div>
            );

            s.push(slot);
        }

        console.log(s);

        let element = (
            <div className="slots">
                <div className="highlight"></div>
                {s.map((slot) => slot)}
            </div>
        );

        return element;
    }

    useEffect(() => {
        if (isSpinning) {
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

    return (
        <div className="window">
            <Sidebar />
            <div className="App">
                <h1 className="title">Slot Machine</h1>
                <Slots />
                <button className="button" onClick={spin}>
                    Spin
                </button>
                <p className="message">{message}</p>
                <p className="prob">{'Win Chance: ' + calProbabilityText()}</p>
            </div>
        </div>
    );
}

function Sidebar() {
    const [expanded, setExpanded] = useState(false);

    const toggleSidebar = () => {
        setExpanded(!expanded);
    };

    const lists = [
        { name: 'check1' },
        { name: 'check2' },
        { name: 'check3' },
        { name: 'check4' },
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
        <div className={`${expanded ? 'expanded' : 'bar'}`}>
            <div className="menu">
                <div className="but">
                    <button onClick={toggleSidebar}>
                        <HiMenuAlt3 size={26} className="icon"></HiMenuAlt3>
                    </button>
                </div>
                <div className={`items ${expanded ? '' : 'noItems'}`}>
                    {lists?.map((item, i) => (
                        <p className="item">{item.name}</p>
                    ))}
                </div>
            </div>
        </div>
    );
}
