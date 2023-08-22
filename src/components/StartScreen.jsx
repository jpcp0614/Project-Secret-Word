import PropTypes from "prop-types"
import './StartScreen.css';

const StartScreen = ({startGame}) => {
	return (
		<div className="start">
			<h1>Secret World</h1>
			<p>Click the button to play</p>
			<button onClick={startGame}>Play</button>
		</div>
	);
};

StartScreen.propTypes = {
	startGame: PropTypes.func,
}

export default StartScreen;
