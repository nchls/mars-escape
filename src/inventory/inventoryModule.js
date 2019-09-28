import { RESTART_GAME } from '../app/appModule';
import { COMPLETE_TASK } from '../tasksList/tasksListModule';

const initialState = Object.freeze([]);

const inventoryReducer = (state = initialState, { type, data }) => {
	switch (type) {
	case RESTART_GAME:
		return initialState;
	case COMPLETE_TASK:
		return [...state, data];
	default:
		return state;
	}
};

export default inventoryReducer;
