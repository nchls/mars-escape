import { RESTART_GAME } from '../app/appModule';
import { COMPLETE_TASK } from '../tasksList/tasksListModule';
import { INSTALL_MODULE, UNINSTALL_MODULE, ADD_MODULE_TO_INVENTORY } from '../rover/roverModule';

import itemsData from '../data/items';


const initialState = Object.freeze(itemsData.reduce((accumulator, item) => {
	if (!item.isStock) {
		accumulator.push({
			id: `${Math.random()}`,
			itemId: item.id,
			cost: item.cost,
		});
	}
	return accumulator;
}, []));

const inventoryReducer = (state = initialState, action) => {
	switch (action.type) {
	case RESTART_GAME:
		return initialState;
	case COMPLETE_TASK:
		return [...state, action.data];
	case UNINSTALL_MODULE: {
		const module = itemsData.find((checkItem) => checkItem.id === action.moduleId);
		return [...state, { itemId: module.id }];
	}
	case INSTALL_MODULE: {
		const newState = [...state];

		// Remove this part from inventory
		const firstItemIndex = newState.findIndex((item) => item.itemId === action.moduleId);
		newState.splice(firstItemIndex, 1);

		return newState;
	}
	case ADD_MODULE_TO_INVENTORY:
		return [...state, action.module];
	default:
		return state;
	}
};

export default inventoryReducer;
