import React from 'react';
import { connect } from 'react-redux';
import ProgressBar from '../progressBar/ProgressBar';

import './roversList.scss';
import {
	ROVER_MODES,
	ROVER_STATUSES,
	getRoverStatusDisplay,
	getRoverBatteryCapacity,
	getRoverTanksCapacity,
	getRoverModules,
	setRoverMode,
	uninstallModule,
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

const Module = ({ rover, module, removalDisabled, uninstallModule }) => {
	return (
		<div className="module tag">
			{ module.name }
			{ !module.isStock && !removalDisabled && (
				<button
					className="delete is-small"
					onClick={() => uninstallModule(rover.id, module.id)}
				/>
			) }
		</div>
	);
};

const RoversList = ({
	rovers,
	roverDetail,
	openRoverDetail,
	closeRoverDetail,
	setRoverMode,
	uninstallModule,
}) => {
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
									{ rover.mode === ROVER_MODES.WAIT && <i className="far fa-pause-circle" /> }
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

					const changesDisabled = (rover.status !== ROVER_STATUSES.WAITING);

					return (
						<li key={rover.id} className="rover-detail">
							<div className="head">
								<h3 className="title is-6 rover-name">{ rover.name }</h3>
							</div>

							<h4 className="title is-6 mode-header">Job</h4>
							<div
								className="buttons has-addons is-centered mode-buttons"
								title={
									changesDisabled
										? 'You can change a rover\'s mode only when it\'s in the garage.'
										: null
								}
							>
								<button
									className={`button${rover.mode === ROVER_MODES.WAIT ? ' is-info' : ''}`}
									disabled={changesDisabled}
									onClick={() => setRoverMode(rover.id, ROVER_MODES.WAIT)}
								>
									Wait
								</button>
								<button
									className={`button${rover.mode === ROVER_MODES.MINE_ICE ? ' is-info' : ''}`}
									disabled={changesDisabled}
									onClick={() => setRoverMode(rover.id, ROVER_MODES.MINE_ICE)}
								>
									Mine Ice
								</button>
								<button
									className={`button${rover.mode === ROVER_MODES.MINE_ORE ? ' is-info' : ''}`}
									disabled={changesDisabled}
									onClick={() => setRoverMode(rover.id, ROVER_MODES.MINE_ORE)}
								>
									Mine Ore
								</button>
								<button
									className={`button${rover.mode === ROVER_MODES.RESCUE ? ' is-info' : ''}`}
									disabled={changesDisabled}
									onClick={() => setRoverMode(rover.id, ROVER_MODES.RESCUE)}
								>
									Rescue
								</button>
							</div>

							<h4 className="title is-6 modules-header">Modules</h4>
							<div className="modules-configurator">
								<div className="available-modules">
									<h5 className="subtitle is-6">Available</h5>
									<ul />
								</div>
								<div className="installed-modules">
									<h5 className="subtitle is-6">Installed</h5>
									<ul className="installed-modules">
										{ modules.map((module) => {
											if (module.name.indexOf('Rover') !== -1) {
												return null;
											}
											return (
												<li key={module.id}>
													<Module
														removalDisabled={changesDisabled}
														rover={rover}
														module={module}
														uninstallModule={uninstallModule}
													/>
												</li>
											);
										}) }
									</ul>
								</div>
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
		setRoverMode: (roverId, mode) => setRoverMode(roverId, mode)(dispatch),
		uninstallModule: (roverId, moduleId) => uninstallModule(roverId, moduleId)(dispatch),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(RoversList);
