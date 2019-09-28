import { doALittleTick } from './tickinsModule';

const GAME_CHILL_LEVEL_BASIS = 500;

export const tickADiddlyAMiddlewareARooni = (store) => (next) => (action) => {
	const gameSpeed = store.getState().gameSpeed;
	const gameOver = store.getState().appModule;
	if (gameSpeed && !gameOver) {
		window.setTimeout(() => store.dispatch(doALittleTick()), gameSpeed * GAME_CHILL_LEVEL_BASIS);
	}
	return next(action);
};
