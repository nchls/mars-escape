import { COMPLETE_TASK } from '../tasksList/tasksListModule';

const initialState = Object.freeze([]);

const inventoryReducer = (state = initialState, { type, data }) => {
	switch (type) {
	case COMPLETE_TASK:
		return [...state, data];
	default:
		return state;
	}
};

export default inventoryReducer;
