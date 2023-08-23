import PropTypes from 'prop-types';
import './Game.css';

const Game = ({ verifyLetter }) => {
	return (
		<div className="game">
			<p className="points">
				<span>Score: 000</span>
			</p>
			<h1>Guess the word</h1>
			<h3>
				Any tip? <span>TIP</span>{' '}
			</h3>
			<div className="wordContainer">
				<span className="letter">A</span>
				<div className="blankSquare"></div>
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
        <span>a, </span>
        <span>b, </span>
			</div>
		</div>
	);
};

Game.propTypes = {
	verifyLetter: PropTypes.func,
};

export default Game;
