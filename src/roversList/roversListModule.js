import { getRoverModules } from '../rover/roverModule';
import itemsData from '../data/items';


export const OPEN_ROVER_DETAIL = 'OPEN_ROVER_DETAIL';
export const openRoverDetail = (id) => (dispatch) => dispatch({ type: OPEN_ROVER_DETAIL, id: id });

export const CLOSE_ROVER_DETAIL = 'CLOSE_ROVER_DETAIL';
export const closeRoverDetail = () => (dispatch) => dispatch({ type: CLOSE_ROVER_DETAIL });

export const getDistinctEquippableParts = (inventory, rover) => {
	const modules = getRoverModules(rover);
	const chassisId = modules.find((module) => module.name.includes('Rover')).id;
	const parts = new Set();
	inventory.forEach((item) => {
		const module = itemsData.find((checkItem) => checkItem.id === item.itemId);
		if (rover.modules.indexOf(item.itemId) !== -1) { return; }
		if (module.minSize && module.minSize > chassisId) { return; }
		parts.add(item.itemId);
	});
	return Array.from(parts);
};

export const roverDetailReducer = (state = null, action) => {
	switch (action.type) {
	case OPEN_ROVER_DETAIL:
		return action.id;
	case CLOSE_ROVER_DETAIL:
		return null;
	default:
		return state;
	}
};
