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

	return (
		<div className="App">
			{gameStage === 'start' && <StartScreen startGame={startGame} />}
			{gameStage === 'game' && <Game />}
			{gameStage === 'end' && <GameOver />}
		</div>
	);
}

export default App;
