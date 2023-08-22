// CSS
import './App.css';

// React
import { useState } from 'react';

// data
import { wordsList } from './data/words';

// Components
import StartScreen from './components/StartScreen';

const STAGES = [
	{ id: 1, name: 'start' },
	{ id: 2, name: 'game' },
	{ id: 3, name: 'end' },
];

function App() {
	const [gameStage, setGameStage] = useState(STAGES[0].name);

	return (
		<div className="App">
			{gameStage === 'start' && <StartScreen />}
			{gameStage === 'game' && <StartScreen />}
			{gameStage === 'end' && <StartScreen />}
		</div>
	);
}

export default App;
