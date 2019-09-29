import React from 'react';
import { connect } from 'react-redux';

import { changeGameSpeed } from '../gameTicks/gameTicksModule';

import './gameSpeed.scss';

const GameSpeed = ({ gameSpeed, changeGameSpeed }) => {
	return (
		<p className="game-speed buttons has-addons">
			<button
				className={`button is-small${gameSpeed === 0 ? ' is-primary' : ' is-light'}`}
				onClick={() => changeGameSpeed(0)}
				title="Pause"
			>
				<i className="fas fa-pause" />
			</button>
			<button
				className={`button is-small${gameSpeed === 1 ? ' is-primary' : ' is-light'}`}
				onClick={() => changeGameSpeed(1)}
				title="Normal speed"
			>
				<i className="fas fa-play is-light" />
			</button>
			<button
				className={`button is-small${gameSpeed === 2 ? ' is-primary' : ' is-light'}`}
				onClick={() => changeGameSpeed(2)}
				title="Faster speed"
			>
				<i className="fas fa-step-forward" />
			</button>
			<button
				className={`button is-small${gameSpeed === 3 ? ' is-primary' : ' is-light'}`}
				onClick={() => changeGameSpeed(3)}
				title="Relativistic speed"
			>
				<i className="fas fa-fast-forward" />
			</button>
		</p>
	);
};

const mapStateToProps = (state) => ({
	gameSpeed: state.gameSpeed,
});

const mapDispatchToProps = (dispatch) => ({
	changeGameSpeed: (speed) => dispatch(changeGameSpeed(speed)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GameSpeed);
