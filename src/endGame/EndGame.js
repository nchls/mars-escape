import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { startApp, restartGame } from '../app/appModule';
import './endGame.scss';

const EndGame = ({ bestTimes, propellant, startApp, restartGame }) => {
	return (
		<div className="container boxed scrollable endGame-wrapper">
			{
				propellant >= 1
					? (
						<div className="notification is-success endGame-success">
							Wow! You did it! You escaped Mars. Maybe you should take a break. Or maybe you should try it again.
						</div>
					)
					: (
						<div className="notification is-danger endGame-failure">
							You've run out of rovers and won't be able to make it home.  You can wait for a slow death, or hop in your time machine and try again.
						</div>
					)
			}
			{
				bestTimes.length
					? (
						<>
							<h2 className="title is-3 is-spaced">Best Times</h2>
							<table className="table is-striped endGame-best-times">
								<thead>
									<tr>
										<th>Date</th>
										<th>Time</th>
									</tr>
								</thead>
								<tbody>
									{
										bestTimes.map(({ date, time }, index) => (
											<tr key={index}>
												<td className="endGame-date">{date}</td>
												<td className="endGame-time">{time} Sols</td>
											</tr>
										))
									}
								</tbody>
							</table>
						</>
					)
					: null
			}
			<button className="button is-large is-link" onClick={() => { restartGame(); startApp(); }}>Play again!</button>
		</div>
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
