import React from 'react';
import { connect } from 'react-redux';

import { ROVER_STATUSES } from '../rover/roverModule';

import './alertsList.scss';

const findIncapacitatedRovers = (rovers) => (
	rovers.filter((e) => e.status === ROVER_STATUSES.LOST
		|| e.status === ROVER_STATUSES.STUCK
		|| e.status === ROVER_STATUSES.OUT_OF_POWER));

const Alert = ({ displayValue }) => (
	<li className="alert-list-item">
		<strong className="alert-list-value">{displayValue}</strong>
	</li>
);


const AlertsList = ({ rovers, isDustStorm }) => {
	const incapacitatedRovers = findIncapacitatedRovers(rovers);
	return (
		<ul className="alert-list">
			{isDustStorm
				&& <Alert displayValue="Dust Storm!" />}
			{incapacitatedRovers.map((rover) => (
				<Alert key={rover.id} displayValue={`${rover.name} is ${rover.status}`} />
			))}
		</ul>
	);
};

const mapStateToProps = (state) => {
	return {
		rovers: state.rovers,
		isDustStorm: state.isDustStorm,
	};
};

export default connect(mapStateToProps)(AlertsList);
