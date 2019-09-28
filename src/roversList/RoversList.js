import React from 'react';
import { connect } from 'react-redux';

import './roversList.scss';


const RoversList = ({ rovers }) => {
	return (
		<>
			<p>Rovers list</p>
			<ul>
				{ rovers.map((rover) => {
					return (
						<li key={rover.id} style={{ padding: '.5em' }}>
							<div key="1">Name: { rover.name }</div>
							<div key="2">Mode: { rover.mode }</div>
							<div key="3">Status: { rover.status }</div>
							<div key="4">Progress: { rover.progress }</div>
							<div key="5">Battery charge: { rover.batteryCharge }</div>
							<div key="6">Tanks load: { rover.tanksLoad }</div>
						</li>
					);
				}) }
			</ul>
		</>
	);
};

const mapStateToProps = (state) => {
	return {
		rovers: state.rovers,
	};
};

export default connect(mapStateToProps)(RoversList);
