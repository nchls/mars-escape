import React, { useState } from 'react';
import { connect } from 'react-redux';
import ProgressBar from '../progressBar/ProgressBar';

import './roversList.scss';
import {
	ROVER_MODES,
	ROVER_STATUSES,
	getRoverStatusDisplay,
	getRoverBatteryCapacity,
	getRoverTanksCapacity,
	getRoverWeight,
	getRoverDrivingSpeed,
	getRoverModules,
	getRoverSize,
	setRoverMode,
	setRoverName,
	uninstallModule,
	enqueueTask,
	installModule,
} from '../rover/roverModule';
import {
	openRoverDetail,
	closeRoverDetail,
	getDistinctEquippableParts,
} from './roversListModule';
import itemsData from '../data/items';

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

const InstalledModule = ({ rover, module, removalDisabled, uninstallModule, enqueueTask }) => {
	let title;
	if (module.isStock) {
		title = 'Stock part';
	} else {
		title = 'Uninstall this part';
	}

	return (
		<button
			className="button is-small is-fullwidth"
			onClick={() => {
				if (!module.isStock) {
					if (removalDisabled) {
						const taskId = `uninstallModule(${rover.id},${module.id})`;
						return enqueueTask(
							rover.id,
							taskId,
							uninstallModule,
							[rover.id, module.id],
							`Uninstall module: ${module.name}`,
							`Queuing module uninstall: ${module.name}`,
							`Uninstalling module: ${module.name}`,
							true, // showNotifications
						);
					}
					return uninstallModule(rover.id, module.id);
				}
			}}
			title={title}
		>
			{ !module.isStock && (
				<span className="icon is-small">
					<i className="fas fa-times-circle fa-align-right" />
				</span>
			) }
			<span>{ module.name }</span>
		</button>
	);
};

const AvailableModule = ({ rover, module, installationDisabled, installModule, enqueueTask }) => {
	return (
		<button
			className="button is-small is-fullwidth"
			onClick={() => {
				if (!module.isStock) {
					if (installationDisabled) {
						const taskId = `installModule(${rover.id},${module.id})`;
						return enqueueTask(
							rover.id,
							taskId,
							installModule,
							[rover, module.id],
							`Install module: ${module.name}`,
							`Queueing module install: ${module.name}`,
							`Module installed: ${module.name}`,
							true, // showNotifications
						);
					}
					return installModule(rover, module.id);
				}
			}}
		>
			<span>{ module.name }</span>
			{ !module.isStock && (
				<span className="icon is-small">
					<i className="fas fa-plus-circle fa-align-right" />
				</span>
			) }
		</button>
	);
};

const RoverModuleImage = ({ modules, status }) => {
	const isMoving = status === ROVER_STATUSES.TRAVELING_ICE
		|| status === ROVER_STATUSES.TRAVELING_ORE
		|| status === ROVER_STATUSES.TRAVELING_RESCUE
		|| status === ROVER_STATUSES.TOWING
		|| status === ROVER_STATUSES.TOWED
		|| status === ROVER_STATUSES.LOST;
	const isDrilling = status === ROVER_STATUSES.MINING_ICE || status === ROVER_STATUSES.MINING_ORE;

	return (
		<div className={`rover-module-image-wrapper ${isMoving ? 'rover-module-image-moving' : 'rover-module-image-not-moving'} ${isDrilling ? 'rover-module-image-drilling' : 'rover-module-image-not-drilling'}`}>
			{
				isMoving
					? (<div className="rover-module-img img-rover-bg" role="presentation" />)
					: (<div className="rover-module-img img-rover-bg-still" role="presentation" />)
			}

			{
				status !== ROVER_STATUSES.FALLEN_OFF_CLIFF
					? modules
						.filter((module) => module.image)
						.map(({ image, name }) => (
							<div key={name} className={`rover-module-img ${image}`} role="presentation" />
						))
					: null
			}
			{
				status === ROVER_STATUSES.STUCK || status === ROVER_STATUSES.OUT_OF_POWER
					? (<div className="rover-module-img img-rover-bg-stuck" role="presentation" />)
					: null
			}
		</div>
	);
};

const RoversList = ({
	rovers,
	roverDetail,
	inventory,
	openRoverDetail,
	closeRoverDetail,
	setRoverMode,
	setRoverName,
	uninstallModule,
	enqueueTask,
	installModule,
}) => {
	const [isNameEditOpen, setIsNameEditOpen] = useState(false);
	const [inputName, setInputName] = useState('');

	const progressStatuses = [
		ROVER_STATUSES.TRAVELING_ORE,
		ROVER_STATUSES.TRAVELING_ICE,
		ROVER_STATUSES.RETURNING,
		ROVER_STATUSES.TOWING,
	];

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
									{ rover.mode === ROVER_MODES.WAIT && (
										<i className="far fa-pause-circle" title="Job: Wait" />
									) }
									{ rover.mode === ROVER_MODES.MINE_ICE && (
										<i className="fas fa-cube" title="Job: Mining ice" />
									) }
									{ rover.mode === ROVER_MODES.MINE_ORE && (
										<i className="far fa-gem" title="Job: Mining ore" />
									) }
									{ rover.mode === ROVER_MODES.RESCUE && (
										<i className="fas fa-ambulance" title="Job: Rescue" />
									) }
									<div className="rover-status">
										{ getRoverStatusDisplay(rover, rovers) }
										{ progressStatuses.includes(rover.status) && (
											<ProgressBar
												color="red"
												id={`${rover.id}-progress`}
												progress={progress}
											/>
										) }
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
								<div className="rover-summary">
									<div className="rover-image">
										<RoverModuleImage modules={modules} status={rover.status} />
									</div>
									<div className="rover-battery" title="Battery charge">
										<ProgressBar
											color="yellow"
											isVertical
											id={`${rover.id}-battery`}
											progress={battery}
										/>
										<i className="fas fa-car-battery" />
									</div>
									{ modules.find((module) => module.name.indexOf('Tanks') !== -1) !== undefined && (
										<div className="rover-tanks" title="Tanks load">
											<ProgressBar
												color="blue"
												isVertical
												id={`${rover.id}-tanks`}
												progress={tanksLoad}
											/>
											<i className="fas fa-box-open" />
										</div>
									) }
								</div>
							</li>
						);
					}

					const changesDisabled = (rover.status !== ROVER_STATUSES.WAITING);
					const distinctEquippableParts = getDistinctEquippableParts(inventory, rover);

					return (
						<li key={rover.id} className="rover-detail">
							<div className="head">
								{ !isNameEditOpen ? (
									<>
										<h3
											className="title is-6 rover-name"
											onClick={() => {
												setInputName(rover.name);
												setIsNameEditOpen(true);
											}}
										>
											{ rover.name }
											<i className="fas fa-pencil-alt" />
										</h3>
										<div className="buttons is-right">
											<button className="button is-primary" onClick={closeRoverDetail}>Done</button>
										</div>
									</>
								) : (
									<input
										type="text"
										className="input"
										value={inputName}
										autoFocus
										maxLength="18"
										onChange={(e) => setInputName(e.target.value)}
										onBlur={() => {
											if (inputName.trim() !== '') {
												setRoverName(rover.id, inputName);
											}
											setIsNameEditOpen(false);
										}}
										onKeyDown={(e) => {
											if (e.key === 'Enter') {
												if (inputName.trim() !== '') {
													setRoverName(rover.id, inputName);
												}
												setIsNameEditOpen(false);
											}
										}}
									/>
								) }
							</div>

							<h4 className="title is-6 mode-header">Job</h4>
							<div
								className="buttons has-addons is-centered mode-buttons"
							>
								<button
									className={`button${rover.mode === ROVER_MODES.WAIT ? ' is-info' : ''}`}
									onClick={() => setRoverMode(rover.id, ROVER_MODES.WAIT)}
								>
									Wait
								</button>
								<button
									className={`button${rover.mode === ROVER_MODES.MINE_ICE ? ' is-info' : ''}`}
									onClick={() => setRoverMode(rover.id, ROVER_MODES.MINE_ICE)}
								>
									Mine Ice
								</button>
								<button
									className={`button${rover.mode === ROVER_MODES.MINE_ORE ? ' is-info' : ''}`}
									onClick={() => setRoverMode(rover.id, ROVER_MODES.MINE_ORE)}
								>
									Mine Ore
								</button>
								<button
									className={`button${rover.mode === ROVER_MODES.RESCUE ? ' is-info' : ''}`}
									onClick={() => setRoverMode(rover.id, ROVER_MODES.RESCUE)}
								>
									Rescue
								</button>
							</div>

							{ rover.taskQueue && <>
								<h4 className="title is-6 task-queue-header">Queued Jobs</h4>
								<div className="task-queue">
									<div className="field">
										{ rover.taskQueue && rover.taskQueue.map((task) => {
											return (
												<p key={task.taskId}>{task.description}</p>
											);
										}) }
									</div>
								</div>
							</> }

							<h4 className="title is-6 modules-header">Modules</h4>
							<div className="modules-configurator">
								<div className="available-modules">
									<h5 className="subtitle is-6">Available</h5>
									<div className="field">
										{ distinctEquippableParts.map((itemId) => {
											const module = itemsData.find((checkItem) => checkItem.id === itemId);
											return (
												<div key={module.id}>
													<AvailableModule
														installationDisabled={changesDisabled}
														rover={rover}
														module={module}
														installModule={installModule}
														enqueueTask={enqueueTask}
													/>
												</div>
											);
										}) }
									</div>
								</div>
								<div className="installed-modules">
									<h5 className="subtitle is-6">Installed</h5>
									<div className="field">
										{ modules.map((module) => {
											if (module.name.indexOf('Rover') !== -1) {
												return null;
											}
											return (
												<div key={module.id}>
													<InstalledModule
														removalDisabled={changesDisabled}
														rover={rover}
														module={module}
														uninstallModule={uninstallModule}
														enqueueTask={enqueueTask}
													/>
												</div>
											);
										}) }
									</div>
								</div>
							</div>

							<h4 className="title is-6 stats-header">Stats</h4>
							<div className="stat kv">
								<span className="key">Chassis: </span>
								<span className="value">{ getRoverSize(rover) }</span>
							</div>
							<div className="stat kv">
								<span className="key">Weight: </span>
								<span className="value">{ Math.floor(getRoverWeight(rover, rovers) / 8) }kg</span>
							</div>
							<div className="stat kv">
								<span className="key">Top Speed: </span>
								<span className="value">{ Math.floor(getRoverDrivingSpeed(rover, rovers) * 250) }kph</span>
							</div>
							<div className="rover-image">
								<RoverModuleImage modules={modules} status={rover.status} />
							</div>

							<div className="buttons is-right">
								<button className="button is-primary" onClick={closeRoverDetail}>Done</button>
							</div>
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
		inventory: state.inventory,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		openRoverDetail: (id) => openRoverDetail(id)(dispatch),
		closeRoverDetail: () => closeRoverDetail()(dispatch),
		setRoverMode: (roverId, mode) => setRoverMode(roverId, mode, true)(dispatch),
		setRoverName: (roverId, name) => setRoverName(roverId, name)(dispatch),
		uninstallModule: (roverId, moduleId) => uninstallModule(roverId, moduleId)(dispatch),
		installModule: (rover, moduleId) => installModule(rover, moduleId)(dispatch),
		enqueueTask: (...args) => enqueueTask(...args)(dispatch),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(RoversList);
