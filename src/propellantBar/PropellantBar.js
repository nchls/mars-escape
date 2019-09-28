import React from 'react';
import { connect } from 'react-redux';
import ProgressBar from '../progressBar/ProgressBar';

import './propellantBar.scss';


const PropellantBar = ({ propellant }) => {
	const asPercentage = propellant * 100;
	return (
		<>
			<h2 className="propellantBar_label">Prop.</h2>
			<ProgressBar progress={asPercentage} />
		</>
	);
};

const mapStateToProps = ({ propellant }) => {
	return {
		propellant,
	};
};

export default connect(mapStateToProps)(PropellantBar);
