import React from 'react';
import { connect } from 'react-redux';
import ProgressBar from '../progressBar/ProgressBar';

import './roversList.scss';
import { getRoverWeight, getRoverDrivingSpeed, getRoverStatusDisplay } from '../rover/roverModule';


const RoversList = ({ rovers }) => {
	return (
		<>
			<p>Rovers list</p>
			<ul>
				{ rovers.map((rover) => {
					const progress = Math.floor(100 * rover.progress);
					const battery = Math.floor(100 * rover.batteryCharge);
					const tanksLoad = Math.floor(100 * rover.tanksLoad);
					return (
						<li key={rover.id} style={{ padding: '.5em' }}>
							<div key="1">Name: { rover.name }</div>
							<div key="2">Mode: { rover.mode }</div>
							<div key="3">Status: { getRoverStatusDisplay(rover, rovers) }</div>
							<div key="4">Progress: {progress}% <ProgressBar color="yellow" id={`${rover.id}-progress`} progress={progress} /></div>
							<div key="5">Battery charge: {battery}% <ProgressBar color="red" id={`${rover.id}-battery`} progress={battery} /></div>
							<div key="6">Tanks load: {tanksLoad}% <ProgressBar color="blue" id={`${rover.id}-tanks`} progress={tanksLoad} /></div>
							<div key="7">Weight: { getRoverWeight(rover, rovers) }</div>
							<div key="8">Speed: { getRoverDrivingSpeed(rover, rovers) }</div>
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
