import React from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import { endGame } from '../app/appModule';
import ProgressBar from '../progressBar/ProgressBar';

import './propellantBar.scss';

const PropellantBar = ({ endGame, propellant }) => {
	const asPercentage = Math.floor(propellant * 100);
	return propellant < 1
		? (
			<>
				<h2 className="propellantBar-label" aria-label="Propellant">Prop.</h2>
				<p className="propellantBar-percent">{asPercentage}%</p>
				<ProgressBar
					aria-label={`Propellant: ${asPercentage}%`}
					color="green"
					id="propellant-bar"
					isVertical
					progress={asPercentage}
				/>
			</>
		)
		: (
			<button
				className="button is-large is-success propellantBar-button"
				onClick={endGame}
			>
				Launch
			</button>
		);
};

const mapStateToProps = ({ propellant }) => {
	return {
		propellant,
	};
};

const mapDispatchToProps = (dispatch) => bindActionCreators({ endGame }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PropellantBar);
