import { START_APP } from '../app/appModule'; 
import { nextTick, TICK } from './gameTicksModule';

const GAME_CHILL_LEVEL_BASIS = {
	1: 500,
	2: 200,
	3: 50,
};

export const tickADiddlyAMiddlewareARooni = (store) => (next) => (action) => {
	if (action.type === TICK || action.type === START_APP) {
		const gameSpeed = store.getState().gameSpeed;
		const gameOver = store.getState().gameOver;
		if (gameSpeed && !gameOver) {
			window.setTimeout(() => store.dispatch(nextTick()), GAME_CHILL_LEVEL_BASIS[gameSpeed]);
		}
	}
	return next(action);
};
