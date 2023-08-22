import PropTypes from 'prop-types';
import './Game.css';

const Game = ({ verifyLetter }) => {
	return (
		<div>
			<h1>Game</h1>
			<button onClick={verifyLetter}>End</button>
		</div>
	);
};

Game.propTypes = {
	verifyLetter: PropTypes.func,
};

export default Game;
