// CSS
import './App.css';

// React
import { useState, useEffect, useCallback } from 'react';

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

const GUESSESQTY = 3;

function App() {
	const [gameStage, setGameStage] = useState(STAGES[0].name);
	const [words] = useState(wordsList);
	const [pickedWord, setPickedWord] = useState('');
	const [pickedCategory, setPickedCategory] = useState('');
	const [letters, setLetters] = useState([]);
	const [guessedLetters, setGuessedLetters] = useState([]);
	const [wrongLetters, setWrongLetters] = useState([]);
	const [guesses, setGuesses] = useState(GUESSESQTY);
	const [score, setScore] = useState(0);

	const pickWordAndCategory = useCallback(() => {
		// pick a random category
		const categories = Object.keys(words);
		const numberOfKeys = Object.keys(categories).length;
		const category = categories[Math.floor(Math.random() * numberOfKeys)];

		// pick a random word
		const word =
			words[category][Math.floor(Math.random() * words[category].length)];
		// words[category].length) = quantidade de palavras na categoria
		return { word, category };
	}, [words]);

	// start secret word game
	const startGame = useCallback(() => {
		// clear all letters
		clearLetterStates();

		// pick word and pick category
		const { word, category } = pickWordAndCategory();

		// create array of letters
		let wordLetters = word.split('');
		wordLetters = wordLetters.map((letter) => letter.toLowerCase());

		// fill states
		setPickedWord(word);
		setPickedCategory(category);
		setLetters(wordLetters);
		setGameStage(STAGES[1].name);
	}, [pickWordAndCategory]);

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
	};

	const clearLetterStates = () => {
		setGuessedLetters([]);
		setWrongLetters([]);
	};

	// check loose condition
	useEffect(() => {
		if (guesses <= 0) {
			// reset all states
			clearLetterStates();
			setGameStage(STAGES[2].name);
		}
	}, [guesses]);

	// check win condition
	useEffect(() => {
		const uniqueLetters = [...new Set(letters)]; // array de letras únicas

		// win condition
		if (guessedLetters.length === uniqueLetters.length) {
			// add score
			setScore((actualScore) => (actualScore += 100));

			// restart game with new record
			startGame();
		}
	}, [guessedLetters, letters, startGame]);

	// reinicia o jogo
	const restartGame = () => {
		setScore(0);
		setGuesses(GUESSESQTY);
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
			{gameStage === 'end' && (
				<GameOver restartGame={restartGame} score={score} />
			)}
		</div>
	);
}

export default App;
