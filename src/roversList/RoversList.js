import React from 'react';
import { connect } from 'react-redux';
import ProgressBar from '../progressBar/ProgressBar';

import './roversList.scss';
import {
	ROVER_MODES,
	getRoverStatusDisplay,
	getRoverBatteryCapacity,
	getRoverTanksCapacity,
	getRoverModules,
} from '../rover/roverModule';


const RoversList = ({ rovers }) => {
	return (
		<>
			<h2 className="title is-5">Rovers</h2>
			<ul>
				{ rovers.map((rover) => {
					const progress = Math.floor(100 * rover.progress);
					const battery = Math.floor(100 * (rover.batteryCharge / getRoverBatteryCapacity(rover)));
					const tanksLoad = Math.floor(100 * (rover.tanksLoad / getRoverTanksCapacity(rover)));
					const modules = getRoverModules(rover);
					return (
						<li key={rover.id} className="rover">
							<div className="head">
								<h3 className="title is-6 rover-name">{ rover.name }</h3>
								{ rover.mode === ROVER_MODES.MINE_ICE && <i className="fas fa-cube" /> }
								{ rover.mode === ROVER_MODES.MINE_ORE && <i className="far fa-gem" /> }
								{ rover.mode === ROVER_MODES.RESCUE && <i className="fas fa-ambulance" /> }
								<div className="rover-status">
									{ getRoverStatusDisplay(rover, rovers) }
								</div>
							</div>
							<div key="4">
								Progress: <ProgressBar
									color="red"
									id={`${rover.id}-progress`}
									progress={progress}
								/>
							</div>
							<div key="5">
								Battery charge: <ProgressBar
									color="yellow"
									id={`${rover.id}-battery`}
									progress={battery}
								/>
							</div>
							{ modules.find((module) => module.name.indexOf('Tanks') !== -1) !== undefined && (
								<div key="6">
									Tanks load: <ProgressBar
										color="blue"
										id={`${rover.id}-tanks`}
										progress={tanksLoad}
									/>
								</div>
							) }
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
