import PropTypes from "prop-types"
import './GameOver.css'

const GameOver = ({ restartGame }) => {
	return (
		<div>
			<h1>GameOver</h1>
      <button onClick={restartGame}>Restart</button>
		</div>
	);
};

GameOver.propTypes = {
  restartGame: PropTypes.func,
}

export default GameOver