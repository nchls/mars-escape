import React from 'react';
import { connect } from 'react-redux';


const TICKS_PER_SOL = 100;
const HOURS_PER_SOL = 24 + (39 / 60);
const TICKS_PER_HOUR = TICKS_PER_SOL / HOURS_PER_SOL;

export const convertTicksToSols = (ticks) => {
	const sols = Math.floor(ticks / TICKS_PER_SOL);
	const hours = Math.floor((ticks / TICKS_PER_HOUR) % HOURS_PER_SOL);
	return `${sols} sols, ${hours} hours`;
};

const ElapsedTime = ({ elapsedTime }) => {
	const converted = convertTicksToSols(elapsedTime);
	return (
		<div className="elapsed-time-inner">
			{converted}
		</div>
	);
};

const mapStateToProps = ({ elapsedTime }) => {
	return {
		elapsedTime,
	};
};

export default connect(mapStateToProps)(ElapsedTime);
