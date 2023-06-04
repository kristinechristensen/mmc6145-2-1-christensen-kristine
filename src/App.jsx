import React, { useState } from "react";
import CardGame from "./components/cardGame";
import Header from "./components/header";
import Modal from "./components/modal";
import { useTimer } from "./util/customHooks";

export default function App() {
  const [showModal, setShowModal] = useState(false);
  // store times for  bestTime / previousTime 
  const [bestTime, setBestTime] = useState(null);
  const [previousTime, setPreviousTime] = useState(null); //set to null 

   const {
    time,
    start: timerStart,
    stop: timerStop,
    reset: timerReset,
  } = useTimer();

  const cardTexts = [
    "Bunny 🐰",
    "Frog 🐸",
    "Panda 🐼",
    "Doggy 🐶",
    "Kitty 😺",
    "Duck 🦆",
  ];

  //Create function that starts the timer when the game is started
  function startGame() {
      timerReset(); //reset the clock
      timerStart(); //start the timer
      setPreviousTime();//reset the previous time when the game starts again
      
      
  }

  /* endGame function that stops the timer and determines the best time / resets previous time */
    function stopGame() {
        timerStop(); //stop the timer
        
        //determine if current game time beats bestTime
        if ( !bestTime ||time < bestTime) {
          setBestTime(time);
        }
        setPreviousTime(time); //set previousTime to time
        timerReset();
  }

  function reset(){
    timerReset();   
  }




  return (
    <>
      <Header
        // add time, bestTime, previousTime props
        time = {time}
        previousTime= {previousTime}
        bestTime = {bestTime}
        
        openModal={() => setShowModal(true)}
        
      />
  


      <CardGame
        // add onGameStart , onGameEnd props
        cardTexts={cardTexts}
        onGameStart = {startGame}
        onGameEnd  = {stopGame}

      />
      <Modal isShown={showModal} close={() => setShowModal(false)} />
    </>
  );
}

