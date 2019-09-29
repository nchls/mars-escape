import { START_APP } from '../app/appModule';
import { nextTick, TICK, CHANGE_GAME_SPEED } from './gameTicksModule';

const GAME_CHILL_LEVEL_BASIS = {
	1: 400,
	2: 150,
	3: 40,
};

export const tickADiddlyAMiddlewareARooni = (store) => (next) => (action) => {
	const gameSpeed = store.getState().gameSpeed;
	if (action.type === TICK || action.type === START_APP) {
		const gameOver = store.getState().gameOver;
		if (gameSpeed && !gameOver) {
			window.setTimeout(() => store.dispatch(nextTick()), GAME_CHILL_LEVEL_BASIS[gameSpeed]);
		}
	}

	// This feels wrong
	if (action.type === CHANGE_GAME_SPEED && gameSpeed === 0 && action.gameSpeed) {
		window.setTimeout(() => store.dispatch(nextTick()), GAME_CHILL_LEVEL_BASIS[action.gameSpeed]);
	}
	return next(action);
};
