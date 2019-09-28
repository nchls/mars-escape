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
import { openRoverDetail, closeRoverDetail } from './roversListModule';


const RoverWarning = ({ children }) => {
	return (
		<div className="rover-tanks-warning">
			<span className="icon has-text-danger">
				<i className="fas fa-exclamation-triangle" />
			</span>
			{ children }
			<span className="icon has-text-danger">
				<i className="fas fa-exclamation-triangle" />
			</span>
		</div>
	);
};

const RoversList = ({ rovers, roverDetail, openRoverDetail, closeRoverDetail }) => {
	return (
		<>
			<h2 className="title is-5">Rovers</h2>
			<ul>
				{ rovers.map((rover) => {
					const modules = getRoverModules(rover);
					if (rover.id !== roverDetail) {
						const progress = Math.floor(100 * rover.progress);
						const battery = Math.floor(100 * (rover.batteryCharge / getRoverBatteryCapacity(rover)));
						const tanksLoad = Math.floor(100 * (rover.tanksLoad / getRoverTanksCapacity(rover)));
						return (
							<li key={rover.id} className="rover" onClick={() => openRoverDetail(rover.id)}>
								<div className="head">
									<h3 className="title is-6 rover-name">{ rover.name }</h3>
									{ rover.mode === ROVER_MODES.MINE_ICE && <i className="fas fa-cube" /> }
									{ rover.mode === ROVER_MODES.MINE_ORE && <i className="far fa-gem" /> }
									{ rover.mode === ROVER_MODES.RESCUE && <i className="fas fa-ambulance" /> }
									<div className="rover-status">
										{ getRoverStatusDisplay(rover, rovers) }
									</div>
								</div>
								{ [ROVER_MODES.MINE_ICE, ROVER_MODES.MINE_ORE].includes(rover.mode)
									&& modules.find((module) => module.name.indexOf('Tanks') !== -1) === undefined && (
									<RoverWarning>
										This rover has no tanks installed and cannot collect ice or ore!
									</RoverWarning>
								) }
								{ [ROVER_MODES.MINE_ICE, ROVER_MODES.MINE_ORE].includes(rover.mode)
									&& modules.find((module) => module.name.indexOf('Drill') !== -1) === undefined && (
									<RoverWarning>
										This rover has no drill installed and cannot collect ice or ore!
									</RoverWarning>
								) }
								{ rover.mode === ROVER_MODES.RESCUE
									&& modules.find((module) => module.name.indexOf('winch') !== -1) === undefined && (
									<RoverWarning>
										This rover has no winch installed and cannot rescue rovers!
									</RoverWarning>
								) }
								<div className="rover-progress">
									Progress: <ProgressBar
										color="red"
										id={`${rover.id}-progress`}
										progress={progress}
									/>
								</div>
								<div className="rover-battery">
									Battery charge: <ProgressBar
										color="yellow"
										id={`${rover.id}-battery`}
										progress={battery}
									/>
								</div>
								{ modules.find((module) => module.name.indexOf('Tanks') !== -1) !== undefined && (
									<div className="rover-tanks">
										Tanks load: <ProgressBar
											color="blue"
											id={`${rover.id}-tanks`}
											progress={tanksLoad}
										/>
									</div>
								) }
							</li>
						);
					}

					return (
						<li key={rover.id} className="rover-detail">
							<div className="head">
								<h3 className="title is-6 rover-name">{ rover.name }</h3>
							</div>
							<button className="button is-primary" onClick={closeRoverDetail}>Done</button>
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
		roverDetail: state.roverDetail,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		openRoverDetail: (id) => openRoverDetail(id)(dispatch),
		closeRoverDetail: () => closeRoverDetail()(dispatch),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(RoversList);
