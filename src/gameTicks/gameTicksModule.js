import { RESTART_GAME } from '../app/appModule';

export const TICK = 'TICK';
export const CHANGE_GAME_SPEED = 'CHANGE_GAME_SPEED';

export const nextTick = () => ({ type: TICK });

export const changeGameSpeed = (gameSpeed) => ({ type: CHANGE_GAME_SPEED, gameSpeed });

const initial = 3;

export const gameTickReducer = (store = initial, action) => {
	switch (action.type) {
	case RESTART_GAME:
		return initial;
	case CHANGE_GAME_SPEED:
		if (action.gameSpeed >= 0 && action.gameSpeed <= 3) {
			return action.gameSpeed;
		}
		return store;
	default:
		return store;
	}
};
