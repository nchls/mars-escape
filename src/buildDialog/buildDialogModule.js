import { RESTART_GAME } from '../app/appModule';

const CLOSE_BUILD_DIALOG = 'CLOSE_BUILD_DIALOG';
const OPEN_BUILD_DIALOG = 'OPEN_BUILD_DIALOG';

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
