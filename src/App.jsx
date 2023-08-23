// CSS
import './App.css';

// React
import { useState, useEffect } from 'react';

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

	// check if letter has already been utilized
	const checkLetterAlreadyUtilized = (letter) => {
		if (guessedLetters.includes(letter) || wrongLetters.includes(letter)) {
			return;
		}
	};

	// push guessed letter or remove a guess
	const pushGuessedLetterOrRemoveGuess = (letter) => {
		if (letters.includes(letter)) {
			setGuessedLetters((actualGuessedLetter) => [
				...actualGuessedLetter,
				letter,
			]);
		} else {
			setWrongLetters((actualWrongLetter) => [...actualWrongLetter, letter]);
			setGuesses((actualGuesses) => actualGuesses - 1);
		}
	};

	// verify the letter
	const verifyLetter = (letter) => {
		const normalizedLetter = letter.toLowerCase();

		checkLetterAlreadyUtilized(normalizedLetter);
		pushGuessedLetterOrRemoveGuess(normalizedLetter);
		// console.log('guessedLetters ', guessedLetters);
		// console.log('wrongLetters ', wrongLetters);
	};

	const clearLetterStates = () => {
		setGuessedLetters([]);
		setWrongLetters([]);
	}

	// monitorar o estado das guesses
	useEffect(() => {
		if (guesses <= 0) {
			// reset all states
			clearLetterStates();
			setGameStage(STAGES[2].name)
		}
	}, [guesses]);

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
