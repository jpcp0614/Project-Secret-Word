import PropTypes from 'prop-types';
import './Game.css';

const Game = ({ states, verifyLetter }) => {
	return (
		<div className="game">
			<p className="points">
				<span>Score: {states.score}</span>
			</p>
			<h1>Guess the word</h1>
			<h3 className="tip">
				Any tip? <span>{states.pickedCategory}</span>
			</h3>
			<p>You still have {states.guesses} tries</p>
			<div className="wordContainer">
				{states.letters.map((letter, index) =>
					states.guessedLetters.includes(letter) ? (
						<span key={index} className="letter">{letter}</span>
					) : (
						<span key={index} className="blankSquare"></span>
					)
				)}
			</div>
			<div className="letterContainer">
				<p>Try to guess a letter:</p>
				<form>
					<input type="text" name="letter" maxLength="1" required />
					<button>Play</button>
				</form>
			</div>
			<div className="wrongLettersContainer">
				<p>Letters already chosen</p>
				{states.wrongLetters.map((letter, index) => (
					<span key={index}>{letter} </span>
				))}
			</div>
		</div>
	);
};

Game.propTypes = {
	states: PropTypes.any,
	verifyLetter: PropTypes.any
}

export default Game;
