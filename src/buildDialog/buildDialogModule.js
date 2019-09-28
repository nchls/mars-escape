import { RESTART_GAME } from '../app/appModule';

export const BUILD_ITEM = 'BUILD_ITEM';
const CLOSE_BUILD_DIALOG = 'CLOSE_BUILD_DIALOG';
const OPEN_BUILD_DIALOG = 'OPEN_BUILD_DIALOG';

export const buildItem = (cost, task) => (dispatch) => dispatch({ type: BUILD_ITEM, data: { cost, task } });
export const closeBuildDialog = () => (dispatch) => dispatch({ type: CLOSE_BUILD_DIALOG });
export const openBuildDialog = () => (dispatch) => dispatch({ type: OPEN_BUILD_DIALOG });

const buildModuleReducer = (state = false, { type }) => {
	switch (type) {
	case RESTART_GAME:
	case CLOSE_BUILD_DIALOG:
		return false;
	case OPEN_BUILD_DIALOG:
		return true;
	default:
		return state;
	}
};

export default buildModuleReducer;
