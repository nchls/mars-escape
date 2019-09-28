import { doALittleTick } from './tickinsModule';

export const tickADiddlyAMiddlewareARooni = (store) => (next) => (action) => {
	const gameSpeed = store.getState().tickins.gameSpeed;
	const gameOver = store.getState().appModule;
	if (gameSpeed && !gameOver) {
		window.setTimeout(() => store.dispatch(doALittleTick()), gameSpeed);
	}
	return next(action);
};
