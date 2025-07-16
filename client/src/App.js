import React from 'react';
import GameBoard from './components/GameBoard';
import ParticlesBackground from './components/ParticlesBackground';
import './styles.css';



<audio controls src="/memory-match-game/client/public/sounds"></audio>

function App() {
  return (
    <>
      <ParticlesBackground />
      <GameBoard />
     
    </>
  );
}

export default App;
