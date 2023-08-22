// CSS
import './App.css';

// React
import { useState } from 'react';

// data
import { wordsList } from './data/words';

// Components
import Game from './components/Game';
import GameOver from './components/GameOver';
import StartScreen from './components/StartScreen';

const STAGES = [
	{ id: 1, name: 'start' },
	{ id: 2, name: 'game' },
	{ id: 3, name: 'end' },
];

function App() {
	const [gameStage, setGameStage] = useState(STAGES[0].name);
	const [words] = useState(wordsList);

		// start secret word game
	const startGame = () => {
		setGameStage(STAGES[1].name);
	};

	// inicialmente, a função vai
	// manter o fluxo do jogo para
	// o gameOver
	const verifyLetter = () => {
		setGameStage(STAGES[2].name);
	}

	return (
		<div className="App">
			{gameStage === 'start' && <StartScreen startGame={startGame} />}
			{gameStage === 'game' && <Game verifyLetter={verifyLetter}/>}
			{gameStage === 'end' && <GameOver />}
		</div>
	);
}

export default App;
