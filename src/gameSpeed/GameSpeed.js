import React from 'react';
import { connect } from 'react-redux';

import {changeGameSpeed} from '../gameTicks/gameTicksModule';

import './gameSpeed.scss';

const GameSpeed = ({ gameSpeed, changeGameSpeed }) => {

	const onChange = (event) => {
		changeGameSpeed(parseInt(event.target.value));
	};

	return (
		<p className='game-speed'>
			<span> Game speed: </span>
			<select id="leave" onChange={onChange} value={gameSpeed}>
				<option value='0'>Paused</option>
				<option value='1'>Normal</option>
				<option value='2'>Fast</option>
				<option value='3'>Relativistic</option>
			</select>
		</p>
	);
};

const mapStateToProps = state => ({
	gameSpeed: state.gameSpeed
});

const mapDispatchToProps = dispatch => ({
	changeGameSpeed: speed => dispatch(changeGameSpeed(speed))
});

export default connect(mapStateToProps, mapDispatchToProps)(GameSpeed);
