import { RESTART_GAME } from '../app/appModule';
import { BUILD_ITEM } from '../buildDialog/buildDialogModule';

const oreCounterReducer = (state = 0, { type, data }) => {
	switch (type) {
	case RESTART_GAME:
		return 0;
	case BUILD_ITEM:
		return state - data.cost;
	default:
		return state;
	}
};

export default oreCounterReducer;
