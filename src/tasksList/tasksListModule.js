import { RESTART_GAME } from '../app/appModule';
import { BUILD_ITEM } from '../buildDialog/buildDialogModule';

const initialState = Object.freeze([]);

const tasksListReducer = (state = initialState, { type, data }) => {
	switch (type) {
	case RESTART_GAME:
		return [...initialState];
	case BUILD_ITEM:
		return [...state, data.task];
	default:
		return state;
	}
};

export default tasksListReducer;
