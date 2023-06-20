// if user had already done the transaction(verified), user is able to roll the dice
// if the current square doesn't have the connected square, console.log("There is no square connected to this square")
// if the current square has the prular connected square, romdomly choose one of them
// if the number is over the number of the connected square, move the user to the end of the connected square
// finally, display the information of the square that user's moved to

import React, { useState } from 'react';

const DiceRoll = ( {_currentAccount, _FoteisonGameContract, _currentSquare} ) => {
  const [diceValue, setDiceValue] = useState(null);
  const [rolling, setRolling] = useState(false);

  const rollDice = async () => {
    if (rolling) return;
    setRolling(true);

    // Simulate dice rolling animation
    setTimeout(() => {
      const value = Math.floor(Math.random() * 6) + 1;
      setDiceValue(value);
      setRolling(false);
      alert(`Dice Value: ${value}`);
    }, 2000);

    console.log(_FoteisonGameContract);
    const square = await _FoteisonGameContract.moveUser(diceValue, _currentSquare);
    console.log(square);

    _FoteisonGameContract.events.SquareSelected()
    .on('data', (event) => {
        console.log('SquareSelected event received:', event.returnValues);
    })
    .on('error', (error) => {
        console.error('Error while listening to SquareSelected event:', error);
    });

    _FoteisonGameContract.events.NoConnectedSquares()
    .on('data', (event) => {
        console.log('NoConnectedSquares event received:', event.returnValues);
    })
    .on('error', (error) => {
        console.error('Error while listening to NoConnectedSquares event:', error);
    });

  };
    
  return (
    <div className='dice-roll'>
      <div className={`dice ${rolling ? 'rolling' : ''}`} onClick={rollDice}>
        <div className="side front">
          <div className="dot dot-center" />
        </div>
        <div className="side back">
          <div className="dot dot-center" />
          <div className="dot dot-top-left" />
          <div className="dot dot-bottom-right" />
        </div>
        <div className="side right">
          <div className="dot dot-top-left" />
          <div className="dot dot-bottom-right" />
          <div className="dot dot-top-right" />
          <div className="dot dot-bottom-left" />
        </div>
        <div className="side left">
          <div className="dot dot-top-left" />
          <div className="dot dot-bottom-right" />
          <div className="dot dot-top-right" />
          <div className="dot dot-bottom-left" />
        </div>
        <div className="side top">
          <div className="dot dot-center" />
          <div className="dot dot-top-left" />
          <div className="dot dot-top-right" />
          <div className="dot dot-bottom-left" />
          <div className="dot dot-bottom-right" />
        </div>
        <div className="side bottom">
          <div className="dot dot-center" />
          <div className="dot dot-top-left" />
          <div className="dot dot-top-right" />
          <div className="dot dot-bottom-left" />
          <div className="dot dot-bottom-right" />
        </div>
        {diceValue && <p className="dice-value">Dice Value: {diceValue}</p>}
      </div>
      <button className="roll-button" onClick={rollDice} disabled={rolling}>
        Roll Dice
      </button>
    </div>
  );
};

export default DiceRoll;
