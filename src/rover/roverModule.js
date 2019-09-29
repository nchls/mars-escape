import shortUUID from 'short-uuid';
import { RESTART_GAME } from '../app/appModule';
import { TICK } from '../gameTicks/gameTicksModule';
import { COMPLETE_TASK } from '../tasksList/tasksListModule';
import { addOre } from '../oreCounter/oreCounterModule';
import itemsData from '../data/items';


export const ROVER_STATUSES = {
	WAITING: 'Waiting/charging in garage',
	TRAVELING_ICE: 'Traveling to ice mining site',
	TRAVELING_ORE: 'Traveling to ore mining site',
	TRAVELING_RESCUE: 'Traveling to incapacitated rover',
	MINING_ICE: 'Mining ice',
	MINING_ORE: 'Mining ore',
	RETURNING: 'Returning to base',
	TOWING: 'Towing incapacitated rover back to base',
	TOWED: 'Being towed back to base',
	LOST: 'Lost',
	STUCK: 'Stuck in sand',
	OUT_OF_POWER: 'Out of power',
	FALLEN_OFF_CLIFF: 'Fallen off a cliff',
};

const DRIVING_STATUSES = [
	ROVER_STATUSES.TRAVELING_ICE,
	ROVER_STATUSES.TRAVELING_ORE,
	ROVER_STATUSES.TRAVELING_RESCUE,
	ROVER_STATUSES.RETURNING,
	ROVER_STATUSES.TOWING,
];

const MINING_STATUSES = [ROVER_STATUSES.MINING_ICE, ROVER_STATUSES.MINING_ORE];

const RESCUEABLE_STATUSES = [ROVER_STATUSES.LOST, ROVER_STATUSES.STUCK, ROVER_STATUSES.OUT_OF_POWER];

export const ROVER_MODES = {
	WAIT: 'Wait in garage',
	MINE_ICE: 'Mine ice',
	MINE_ORE: 'Mine ore',
	RESCUE: 'Rescue incapacitated rovers',
};

export const ROVER_ENERGY_COSTS = {
	IDLE: 0.0004,
	DRIVING: 0.004,
	MINING: 0.004,
	CHARGING: 0.012,
};

export const WORK_RANDOMNESS = 0.7;

export const ROVER_WEIGHT_EFFECT_ON_SPEED = 400;

export const ROVER_DRIVING_SPEED_MULTIPLICAND = 0.0004;

export const ROVER_MINING_SPEED_MULTIPLICAND = 0.0004;

export const PROPELLANT_LOAD_MULTIPLICAND = 0.01;

export const ORE_LOAD_MULTIPLICAND = 100;

export const ROVER_TANK_RESOURCE_WEIGHT_MULTIPLICAND = 400;

// This is fiddly. A large panel will keep a battery fully topped up at
// ~0.000025, and will have negligable effect if we go much below 0.00001
export const SOLAR_PANEL_BASE_CAPACITY = 0.000017;

export const SOLAR_PANEL_DUST_STORM_CAPACITY_MULTIPLICAND = 0.5;

export const getRoverModules = (rover) => {
	return rover.modules.map((moduleId) => itemsData.find((item) => moduleId === item.id));
};

export const getRoverMotorsPowerDraw = (rover) => {
	const modules = getRoverModules(rover);
	const powerDraw = modules.reduce((accumulator, module) => {
		let val = accumulator;
		if (module.name.indexOf('Motors') !== -1) {
			val += module.powerDraw;
		}
		return val;
	}, 0);
	return powerDraw;
};

export const getRoverBatteryCapacity = (rover) => {
	const modules = getRoverModules(rover);
	const capacity = modules.reduce((accumulator, module) => {
		let val = accumulator;
		if (module.name.indexOf('Battery') !== -1) {
			val += module.capacity;
		}
		return val;
	}, 0);
	return capacity;
};

const getRoverSolarPanelCharge = (rover, isStorming) => {
	const modules = getRoverModules(rover);
	const chargeMultiplicand = (
		SOLAR_PANEL_BASE_CAPACITY * (isStorming ? SOLAR_PANEL_DUST_STORM_CAPACITY_MULTIPLICAND : 1));
	const charge = modules.reduce((accumulator, module) => {
		let val = accumulator;
		if (module.name.indexOf('Solar panel') !== -1) {
			val += module.current * chargeMultiplicand;
		}
		return val;
	}, 0);
	return charge;
};

export const getRoverWeight = (rover, rovers) => {
	const modules = getRoverModules(rover);
	let weight = modules.reduce((accumulator, module) => {
		return accumulator + module.weight;
	}, 0);
	const tanksCapacity = getRoverTanksCapacity(rover);
	weight += rover.tanksLoad * tanksCapacity * ROVER_TANK_RESOURCE_WEIGHT_MULTIPLICAND;
	if (rover.status === ROVER_STATUSES.TOWING && rover.rescuingId !== undefined) {
		const towingRover = rovers.find((checkRover) => checkRover.id === rover.rescuingId);
		weight += getRoverWeight(towingRover, []);
	}
	return weight;
};

export const getRoverDrivingSpeed = (rover, rovers) => {
	const modules = getRoverModules(rover);
	const weight = getRoverWeight(rover, rovers);
	const torque = modules.reduce((accumulator, module) => {
		let val = accumulator;
		if (module.name.indexOf('Motors') !== -1) {
			val += module.horsepower;
		}
		if (module.name.indexOf('Wheels') !== -1) {
			val += (module.grip / 2);
		}
		return val;
	}, 0);
	const speed = torque / (1 + (weight / ROVER_WEIGHT_EFFECT_ON_SPEED));
	return speed * ROVER_DRIVING_SPEED_MULTIPLICAND;
};

export const getRoverMiningSpeed = (rover) => {
	const modules = getRoverModules(rover);
	const speed = modules.reduce((accumulator, module) => {
		let val = accumulator;
		if (module.name.indexOf('Drill') !== -1) {
			val += module.effectiveness;
		}
		return val;
	}, 0);
	return speed * ROVER_MINING_SPEED_MULTIPLICAND;
};

export const getRoverTanksCapacity = (rover) => {
	const modules = getRoverModules(rover);
	const capacity = modules.reduce((accumulator, module) => {
		let val = accumulator;
		if (module.name.indexOf('Tanks') !== -1) {
			val += module.capacity;
		}
		return val;
	}, 0);
	return capacity;
};

export const getRoverStatusDisplay = (rover, rovers) => {
	if (![ROVER_STATUSES.TRAVELING_RESCUE, ROVER_STATUSES.TOWING].includes(rover.status)) {
		return rover.status;
	}
	const rescuingRover = rovers.find((checkRover) => checkRover.id === rover.rescuingId);
	if (rover.status === ROVER_STATUSES.TRAVELING_RESCUE) {
		return `Traveling to incapacitated ${rescuingRover.name}`;
	}
	if (rover.status === ROVER_STATUSES.TOWING) {
		return `Towing incapacitated ${rescuingRover.name} back to base`;
	}
};

export const getRoverName = (rovers) => {
	const names = [
		'Curiosity',
		'Spirit',
		'Opportunity',
		'Beagle',
		'Rovey McRoveface',
		'Sojourner',
		'Pathfinder',
		'Yutu',
		'Marsokhod',
		'Pragyan',
		'Nomad',
		'Lorax',
		'Scarab',
		'Zephyr',
		'Odyssey',
	];

	const selectedName = names[Math.floor(Math.random() * names.length)];

	const roversWithThisNameCount = rovers.filter((rover) => rover.name === selectedName).length;

	if (roversWithThisNameCount === 0) {
		return selectedName;
	}
	return `${selectedName} ${roversWithThisNameCount + 1}`;
};

const reduceRoverTick = (rovers, dispatch, isDustStorm) => {
	const beingRescuedInThisLoop = [];
	const roversCopy = rovers.map((modelRover) => {
		const rover = { ...modelRover };
		const {
			id,
			mode,
			status,
			batteryCharge,
			progress,
			tanksLoad,
			rescuingId,
		} = rover;
		const batteryCapacity = getRoverBatteryCapacity(rover);
		const drivingSpeed = getRoverDrivingSpeed(rover, rovers);
		const workRandomness = (Math.random() * WORK_RANDOMNESS) + (1 - (WORK_RANDOMNESS / 2));

		rover.batteryCharge -= ROVER_ENERGY_COSTS.IDLE;

		if (DRIVING_STATUSES.includes(status)) {
			const motorsPowerDraw = getRoverMotorsPowerDraw(rover);
			const drivingCost = ROVER_ENERGY_COSTS.DRIVING * motorsPowerDraw;
			rover.batteryCharge -= drivingCost;
		}

		if (MINING_STATUSES.includes(status)) {
			rover.batteryCharge -= ROVER_ENERGY_COSTS.MINING;
		}

		// Solar Panel stuff. We'll give the panels a chance to restore some power
		// before we check if the rover is dead.
		if (status !== ROVER_STATUSES.WAITING) {
			rover.batteryCharge += getRoverSolarPanelCharge(rover, isDustStorm);
			// if (isDustStorm) { debugger; }
			if (rover.batteryCharge > batteryCapacity) {
				rover.batteryCharge = batteryCapacity;
			}
		}

		if (batteryCharge <= ROVER_ENERGY_COSTS.IDLE) {
			rover.batteryCharge = 0;
			if (rover.status === ROVER_STATUSES.TOWING) {
				const droppedId = rover.rescuingId;
				setTimeout(() => setRoverStatus(droppedId, ROVER_STATUSES.LOST)(dispatch), 1);
				rover.rescuingId = undefined;
			}
			if (![ROVER_STATUSES.WAIT, ROVER_STATUSES.TOWED].includes(rover.status)) {
				rover.status = ROVER_STATUSES.OUT_OF_POWER;
				rover.tanksLoad = 0;
				rover.progress = 0;
			}
		}

		if (status === ROVER_STATUSES.WAITING) {
			const chargeUnit = ROVER_ENERGY_COSTS.CHARGING * batteryCapacity;
			rover.batteryCharge += chargeUnit;

			if (rover.batteryCharge > batteryCapacity) {
				rover.batteryCharge = batteryCapacity;

				if (mode === ROVER_MODES.MINE_ICE) {
					rover.status = ROVER_STATUSES.TRAVELING_ICE;
				} else if (mode === ROVER_MODES.MINE_ORE) {
					rover.status = ROVER_STATUSES.TRAVELING_ORE;
				} else if (mode === ROVER_MODES.RESCUE) {
					const rescuedRoverIds = rovers.reduce((accumulator, checkRover) => {
						if (checkRover.rescuingId !== undefined) {
							accumulator.push(checkRover.rescuingId);
						}
						return accumulator;
					}, []);
					const roversNeedingRescue = rovers.filter((checkRover) => {
						return (
							checkRover.id !== id
							&& !rescuedRoverIds.includes(checkRover.id)
							&& !beingRescuedInThisLoop.includes(checkRover.id)
							&& RESCUEABLE_STATUSES.includes(checkRover.status)
						);
					});
					if (roversNeedingRescue.length) {
						rover.rescuingId = roversNeedingRescue[0].id;
						beingRescuedInThisLoop.push(rover.rescuingId);
						rover.status = ROVER_STATUSES.TRAVELING_RESCUE;
					}
				}
			}
		}

		if (DRIVING_STATUSES.includes(status)) {
			rover.progress += drivingSpeed * workRandomness;
			if (progress >= 1) {
				rover.progress = 0;
				if (mode === ROVER_MODES.MINE_ICE) {
					rover.status = ROVER_STATUSES.MINING_ICE;
				}
				if (mode === ROVER_MODES.MINE_ORE) {
					rover.status = ROVER_STATUSES.MINING_ORE;
				}
				if (mode === ROVER_MODES.RESCUE) {
					rover.status = ROVER_STATUSES.TOWING;
					setTimeout(() => setRoverStatus(rescuingId, ROVER_STATUSES.TOWED)(dispatch), 1);
				}
			}
		}

		if (MINING_STATUSES.includes(status)) {
			const miningSpeed = getRoverMiningSpeed(rover);
			const tanksCapacity = getRoverTanksCapacity(rover);
			rover.tanksLoad += miningSpeed * workRandomness;
			if (tanksLoad > tanksCapacity) {
				rover.tanksLoad = tanksCapacity;
				rover.status = ROVER_STATUSES.RETURNING;
			}
		}

		if (status === ROVER_STATUSES.RETURNING && progress >= 1) {
			if (mode === ROVER_MODES.MINE_ICE) {
				const propellant = rover.tanksLoad * PROPELLANT_LOAD_MULTIPLICAND;
				// This is hideous. I'm sorry.
				setTimeout(() => addPropellant(propellant)(dispatch), 1);
			}
			if (mode === ROVER_MODES.MINE_ORE) {
				const ore = rover.tanksLoad * ORE_LOAD_MULTIPLICAND;
				setTimeout(() => addOre(ore)(dispatch), 1);
			}
			rover.tanksLoad = 0;
			rover.progress = 0;
			rover.status = ROVER_STATUSES.WAITING;
		}

		if (status === ROVER_STATUSES.TOWING && progress >= 1) {
			rover.progress = 0;
			rover.rescuingId = undefined;
			rover.status = ROVER_STATUSES.WAITING;
			setTimeout(() => setRoverStatus(rescuingId, ROVER_STATUSES.WAITING)(dispatch), 1);
		}

		return rover;
	});

	return roversCopy;
};


export const ADD_PROPELLANT = 'ADD_PROPELLANT';
export const addPropellant = (propellant) => (dispatch) => dispatch({ type: ADD_PROPELLANT, val: propellant });

export const SET_ROVER_STATUS = 'SET_ROVER_STATUS';
export const setRoverStatus = (roverId, status) => (dispatch) => {
	return dispatch({
		type: SET_ROVER_STATUS,
		roverId: roverId,
		status: status,
	});
};

export const SET_ROVER_MODE = 'SET_ROVER_MODE';
export const setRoverMode = (roverId, mode) => (dispatch) => dispatch({
	type: SET_ROVER_MODE,
	roverId: roverId,
	mode: mode,
});

export const SET_ROVER_NAME = 'SET_ROVER_NAME';
export const setRoverName = (roverId, name) => (dispatch) => dispatch({
	type: SET_ROVER_NAME,
	roverId: roverId,
	name: name,
});

export const UNINSTALL_MODULE = 'UNINSTALL_MODULE';
export const uninstallModule = (roverId, moduleId) => (dispatch) => dispatch({
	type: UNINSTALL_MODULE,
	roverId: roverId,
	moduleId: moduleId,
});

export const INSTALL_MODULE = 'INSTALL_MODULE';
export const installModule = (rover, moduleId) => (dispatch) => dispatch({
	type: INSTALL_MODULE,
	rover: rover,
	moduleId: moduleId,
});

// Action for telling inventory about an item replaced on a rover
export const ADD_MODULE_TO_INVENTORY = 'ADD_MODULE_TO_INVENTORY';
export const addModuleToInventory = (module) => (dispatch) => dispatch({
	type: ADD_MODULE_TO_INVENTORY,
	module: module,
});


const uuid = shortUUID();

const firstRoverName = getRoverName([]);
const secondRoverName = getRoverName([{ name: firstRoverName }]);

const STOCK_MODULES = itemsData.slice(4).filter((val) => val.isStock).map((val) => val.id);

const initialState = Object.freeze([
	{
		id: uuid.new(),
		name: firstRoverName,
		modules: [1, 5, 7, 9, 12, 14, 19],
		mode: ROVER_MODES.MINE_ICE,
		status: ROVER_STATUSES.WAITING,
		progress: 0,
		batteryCharge: 1,
		tanksLoad: 0,
		rescuingId: undefined,
	},
	{
		id: uuid.new(),
		name: secondRoverName,
		modules: [1, 5, 7, 9, 12, 14, 19],
		mode: ROVER_MODES.MINE_ORE,
		status: ROVER_STATUSES.WAITING,
		progress: 0,
		batteryCharge: 1,
		tanksLoad: 0,
		rescuingId: undefined,
	},
]);

export const roversReducer = (state = initialState, action) => {
	switch (action.type) {
	case RESTART_GAME:
		return initialState;
	case COMPLETE_TASK: {
		const { itemId } = action.data;
		if ([1, 2, 3, 4].includes(itemId)) {
			return [
				...state,
				{
					id: uuid.new(),
					name:  getRoverName(state),
					modules: [itemId, ...STOCK_MODULES],
					mode: ROVER_MODES.WAIT,
					status: ROVER_STATUSES.WAITING,
					progress: 0,
					batterChage: 1,
					tanksLoad: 0,
					rescuingId: undefined,
				},
			];
		}
		return state;
	}
	case TICK:
		return reduceRoverTick(state, action.dispatch, action.extraData.isDustStorm);
	case SET_ROVER_STATUS: {
		const newState = [...state];
		const rover = newState.find((checkRover) => checkRover.id === action.roverId);
		rover.status = action.status;
		return newState;
	}
	case SET_ROVER_MODE: {
		const newState = [...state];
		const rover = newState.find((checkRover) => checkRover.id === action.roverId);
		rover.mode = action.mode;
		return newState;
	}
	case SET_ROVER_NAME: {
		const newState = [...state];
		const rover = newState.find((checkRover) => checkRover.id === action.roverId);
		rover.name = action.name;
		return newState;
	}
	case UNINSTALL_MODULE: {
		const newState = [...state];
		const rover = newState.find((checkRover) => checkRover.id === action.roverId);
		rover.modules = rover.modules.filter((checkModuleId) => checkModuleId !== action.moduleId);

		// Restore stock parts
		const module = itemsData.find((checkItem) => checkItem.id === action.moduleId);
		if (module.name === 'Motors (advanced)') { rover.modules.push(5); }
		if (module.name === 'Wheels (advanced)') { rover.modules.push(7); }
		if (module.name === 'Battery (medium)' || module.name === 'Battery (large)') { rover.modules.push(9); }
		if (module.name === 'GPS') { rover.modules.push(12); }

		return newState;
	}
	case INSTALL_MODULE: {
		const newState = [...state];
		const rover = newState.find((checkRover) => checkRover.id === action.rover.id);
		const module = itemsData.find((checkItem) => checkItem.id === action.moduleId);
		rover.modules.push(action.moduleId);
		if (module.name.indexOf('Battery') !== -1) {
			rover.batteryCharge = 0.1;
		}

		// Remove parts that are replaced by this one
		if (module.replaces) {
			const replacedModules = rover.modules.filter((checkModuleId) => module.replaces.indexOf(checkModuleId) !== -1);
			rover.modules = rover.modules.filter((checkModuleId) => module.replaces.indexOf(checkModuleId) === -1);

			// Tell the inventory about the parts that were removed
			replacedModules.forEach((replacedModuleId) => {
				const replacedModule = itemsData.find((checkItem) => checkItem.id === replacedModuleId);
				if (!replacedModule.isStock) {
					setTimeout(() => (
						addModuleToInventory({
							itemId: replacedModule.id,
							name: replacedModule.name,
						})(action.dispatch)
					), 1);
				}
			});
		}

		return newState;
	}
	default:
		return state;
	}
};

export const propellantReducer = (state = 0, action) => {
	switch (action.type) {
	case RESTART_GAME:
		return 0;
	case ADD_PROPELLANT:
		return state + action.val;
	default:
		return state;
	}
};
