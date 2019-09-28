import { START_APP } from '../app/appModule';

export const TICK = 'TICK';
export const CHANGE_GAME_SPEED = 'CHANGE_GAME_SPEED';

export const nextTick = () => ({ type: TICK });

export const changeGameSpeed = (gameSpeed) => ({ type: CHANGE_GAME_SPEED, gameSpeed });

const initial = 1;

export const gameTickReducer = (store = initial, action) => {
	switch (action.type) {
	case CHANGE_GAME_SPEED:
		if (action.gameSpeed >= 1 && action.gameSpeed <= 3) {
			return action.gameSpeed;
		}
		return store;
	case START_APP:
		
	default:
		return store;
	}
};
