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
	const [pickedWord, setPickedWord] = useState('');
	const [pickedCategory, setPickedCategory] = useState('');
	const [letters, setLetters] = useState([]);
	const [guessedLetters, setGuessedLetters] = useState([]);
	const [wrongLetters, setWrongLetters] = useState([]);
	const [guesses, setGuesses] = useState(3);
	const [score, setScore] = useState(0);

	const pickWordAndCategory = () => {
		// pick a random category
		const categories = Object.keys(words);
		const numberOfKeys = Object.keys(categories).length;
		const category = categories[Math.floor(Math.random() * numberOfKeys)];

		// pick a random word
		const word =
			words[category][Math.floor(Math.random() * words[category].length)];
		// words[category].length) = quantidade de palavras na categoria
		return { word, category };
	};

	// start secret word game
	const startGame = () => {
		//pick word and pick category
		const { word, category } = pickWordAndCategory();

		// create array of letters
		let wordLetters = word.split('');
		wordLetters = wordLetters.map((letter) => letter.toLowerCase());

		// console.log(word, category);
		// console.log(wordLetters);

		// fill states
		setPickedWord(word);
		setPickedCategory(category);
		setLetters(wordLetters);
		setGameStage(STAGES[1].name);
	};

	// verify the letter
	const verifyLetter = (letter) => {
		console.log(letter)
	};

	// reinicia o jogo
	const restartGame = () => {
		setGameStage(STAGES[0].name);
	};

	const states = {
		pickedWord,
		pickedCategory,
		letters,
		guessedLetters,
		wrongLetters,
		guesses,
		score,
	};

	return (
		<div className="App">
			{gameStage === 'start' && <StartScreen startGame={startGame} />}
			{gameStage === 'game' && (
				<Game states={states} verifyLetter={verifyLetter} />
			)}
			{gameStage === 'end' && <GameOver restartGame={restartGame} />}
		</div>
	);
}

export default App;
