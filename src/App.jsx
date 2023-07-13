import React from "react";
import Die from "./Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

export default function App() {
  const { width, height } = useWindowSize();
  function generateNewDie() {
    return {
      id: nanoid(),
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
    };
  }

  function allNewDice() {
    const array = [];
    for (let i = 0; i < 10; i++) {
      array.push(generateNewDie());
    }
    return array;
  }

  function holdDice(id) {
    setDice((prevDice) => {
      return prevDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      });
    });
  }

  const [dice, setDice] = React.useState(allNewDice());
  const [tenzies, setTenzies] = React.useState(false);

  React.useEffect(() => {
    const isAllHeld = dice.every((die) => die.isHeld);
    const firstValue = dice[0].value;
    const isAllSameValue = dice.every((die) => die.value === firstValue);
    if (isAllHeld && isAllSameValue) {
      setTenzies(true);
    }
  }, [dice]);

  const diceElements = dice.map((die) => {
    return (
      <Die
        key={die.id}
        value={die.value}
        isHeld={die.isHeld}
        holdDice={() => holdDice(die.id)}
      />
    );
  });
  function rollDiceOrNewGame() {
    if (tenzies) {
      setTenzies(false);
      setDice(allNewDice());
    } else {
      rollDice();
    }
  }

  function rollDice() {
    setDice((prevDice) => {
      return prevDice.map((die) => {
        return die.isHeld ? die : generateNewDie();
      });
    });
  }

  return (
    <>
      <main>
        {tenzies && <Confetti width={window.innerWidth} />}
        <h1 className="title">Tenzies</h1>
        <p className="instructions">
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>
        <div className="dice-container">{diceElements}</div>
        <button className="roll-dice" onClick={rollDiceOrNewGame}>
          {tenzies ? "New Game" : "Roll Dice"}
        </button>
      </main>
      <footer>
        Made during the tutorial session of Scrimba (
        <a href="https://scrimba.com">scrimba.com</a>)
      </footer>
    </>
  );
}

// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import "./App.css";

// function App() {
//   const [count, setCount] = useState(0);

//   return (
//     <div className="App">
//       <div>
//         <a href="https://vitejs.dev" target="_blank">
//           <img src="/vite.svg" className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://reactjs.org" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </div>
//   );
// }

// export default App;
