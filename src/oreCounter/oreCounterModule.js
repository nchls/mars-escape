import { RESTART_GAME } from '../app/appModule';
import { BUILD_ITEM } from '../buildDialog/buildDialogModule';
import { CANCEL_TASK } from '../tasksList/tasksListModule';
import { showToast } from '../toast/showToast';

export const ADD_ORE = 'ADD_ORE';
export const addOre = (ore) => ({ type: ADD_ORE, data: { ore: ore } });

const oreCounterReducer = (state = 300, { type, data }) => {
	switch (type) {
	case RESTART_GAME:
		return 300;
	case BUILD_ITEM:
		showToast(`${data.cost} ore deducted!`, { isWarning: true });
		return state - data.cost;
	case CANCEL_TASK:
		return state + data.cost;
	case ADD_ORE:
		showToast(`${data.ore} ore added!`, { isSuccess: true });
		return state + data.ore;
	default:
		return state;
	}
};

export default oreCounterReducer;
