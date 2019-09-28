import { END_GAME } from '../app/appModule';
import { saveBestTimes } from './endGameModule';

const endGameMiddleware = (store) => (next) => (action) => {
	const { elapsedTime, propellant } = store.getState();

	if (propellant >= 1 && action && action.type === END_GAME) {
		setTimeout(() => saveBestTimes(elapsedTime)(store.dispatch), 0);
	}

	return next(action);
};

export default endGameMiddleware;
