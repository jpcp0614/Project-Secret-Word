import PropTypes from "prop-types"
import './GameOver.css'

const GameOver = ({ restartGame, score }) => {
	return (
		<div>
			<h1>Game Over</h1>
			<h2>Score: <span>{score}</span></h2>
      <button onClick={restartGame}>Restart</button>
		</div>
	);
};

GameOver.propTypes = {
	restartGame: PropTypes.func,
	score: PropTypes.any
}

export default GameOver