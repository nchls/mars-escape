import React from 'react';
import { connect } from 'react-redux';
import ProgressBar from '../progressBar/ProgressBar';

import './propellantBar.scss';


const PropellantBar = ({ propellant }) => {
	const asPercentage = Math.floor(propellant * 100);
	return propellant <= 1
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
			<button>Launch</button>
		);
};

const mapStateToProps = ({ propellant }) => {
	return {
		propellant,
	};
};

export default connect(mapStateToProps)(PropellantBar);
