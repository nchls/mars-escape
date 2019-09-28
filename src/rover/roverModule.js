import shortUUID from 'short-uuid';

import { TICK } from '../gameTicks/gameTicksModule';
import { addOre } from '../oreCounter/oreCounterModule';
import itemsData from '../data/items';


export const ROVER_STATUSES = {
	WAITING: 'Waiting/charging in garage',
	TRAVELING_ICE: 'Traveling to ice mining site',
	TRAVELING_ORE: 'Traveling to ore mining site',
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
	ROVER_STATUSES.RETURNING,
	ROVER_STATUSES.TOWING,
];

const MINING_STATUSES = [ROVER_STATUSES.MINING_ICE, ROVER_STATUSES.MINING_ORE];

export const ROVER_MODES = {
	WAIT: 'Wait in garage',
	MINE_ICE: 'Mine ice',
	MINE_ORE: 'Mine ore',
	RESCUE: 'Rescue incapacitated rovers',
};

export const ROVER_ENERGY_COSTS = {
	IDLE: 0.0003,
	DRIVING: 0.003,
	MINING: 0.003,
	CHARGING: 0.009,
};

export const WORK_RANDOMNESS = 0.7;

export const ROVER_WEIGHT_EFFECT_ON_SPEED = 400;

export const ROVER_DRIVING_SPEED_MULTIPLICAND = 0.0003;

export const ROVER_MINING_SPEED_MULTIPLICAND = 0.0003;

export const PROPELLANT_LOAD_MULTIPLICAND = 0.01;

export const ORE_LOAD_MULTIPLICAND = 100;

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

export const getRoverWeight = (rover) => {
	const modules = getRoverModules(rover);
	const weight = modules.reduce((accumulator, module) => {
		return accumulator + module.weight;
	}, 0);
	return weight;
};

export const getRoverDrivingSpeed = (rover) => {
	const modules = getRoverModules(rover);
	const weight = getRoverWeight(rover);
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

const reduceRoverTick = (rovers, dispatch) => {
	const roversCopy = rovers.map((modelRover) => {
		const rover = { ...modelRover };
		const {
			mode,
			status,
			batteryCharge,
			progress,
			tanksLoad,
		} = rover;
		const batteryCapacity = getRoverBatteryCapacity(rover);
		const drivingSpeed = getRoverDrivingSpeed(rover);
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

		if (batteryCharge <= ROVER_ENERGY_COSTS.IDLE) {
			rover.batteryCharge = 0;
			if (![ROVER_STATUSES.WAIT, ROVER_STATUSES.TOWED].includes(rover.status)) {
				rover.status = ROVER_STATUSES.OUT_OF_POWER;
			}
		}

		if (status === ROVER_STATUSES.WAITING) {
			const chargeUnit = ROVER_ENERGY_COSTS.CHARGING * batteryCapacity;
			rover.batteryCharge += chargeUnit;

			if (rover.batteryCharge > batteryCapacity) {
				rover.batteryCharge = batteryCapacity;
				if (mode === ROVER_MODES.MINE_ICE) {
					rover.status = ROVER_STATUSES.TRAVELING_ICE;
				}
				if (mode === ROVER_MODES.MINE_ORE) {
					rover.status = ROVER_STATUSES.TRAVELING_ORE;
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

		return rover;
	});

	return roversCopy;
};


export const ADD_PROPELLANT = 'ADD_PROPELLANT';
export const addPropellant = (propellant) => (dispatch) => dispatch({ type: ADD_PROPELLANT, val: propellant });


const uuid = shortUUID();

const firstRoverName = getRoverName([]);
const secondRoverName = getRoverName([{ name: firstRoverName }]);

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
		towing: undefined,
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
		towing: undefined,
	},
]);

export const roversReducer = (state = initialState, action) => {
	switch (action.type) {
	case TICK:
		return reduceRoverTick(state, action.dispatch);
	default:
		return state;
	}
};

export const propellantReducer = (state = 0, action) => {
	switch (action.type) {
	case ADD_PROPELLANT:
		return state + action.val;
	default:
		return state;
	}
};
