import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { startApp, restartGame } from '../app/appModule';
import './endGame.scss';

const EndGame = ({ bestTimes, propellant, startApp, restartGame }) => {
	return (
		<>
			{
				propellant >= 1
					? (
						<div className="endGame-success">
							Wow! You did it! You escaped Mars. Maybe you take a break.
						</div>
					)
					: (
						<div className="endGame-failure">
							You've run out of rovers and won't be able to make it home.  You can wait for a slow death, or hop in your time machine and try again.
						</div>
					)
			}
			<ul className="endGame-best-times">
				{
					bestTimes.map(({ date, time }, index) => (
						<li key={index}>
							<span className="endGame-date">{date}</span>
							<span className="endGame-time">{time}</span>
						</li>
					))
				}
			</ul>
			<button className="button is-large is-primary" onClick={() => { restartGame(); startApp(); }}>Play again!</button>
		</>
	);
};

const mapStateToProps = ({ bestTimes, propellant }) => {
	return {
		bestTimes,
		propellant,
	};
};

const mapDispatchToProps = (dispatch) => bindActionCreators({ startApp, restartGame }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(EndGame);
