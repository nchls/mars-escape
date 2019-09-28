import { RESTART_GAME } from '../app/appModule';
import { TICK } from '../gameTicks/gameTicksModule';

const TOGGLE_DUST_STORM = 'TOGGLE_DUST_STORM';

export const toggleDustStorm = () => (dispatch) => dispatch({ type: TOGGLE_DUST_STORM });

export const isDustStormReducer = (state = false, { type }) => {
	switch (type) {
	case RESTART_GAME:
		return false;
	case TOGGLE_DUST_STORM:
		return !state;
	default:
		return state;
	}
};

export const timeSinceLastDustStormReducer = (state = 0, { type }) => {
	switch (type) {
	case RESTART_GAME:
	case TOGGLE_DUST_STORM:
		return 0;
	case TICK:
		return state + 1;
	default:
		return state;
	}
};
