import { END_GAME, endGame } from '../app/appModule';
import { ROVER_STATUSES } from '../rover/roverModule';
import { saveBestTimes } from './endGameModule';

const { LOST, STUCK, OUT_OF_POWER, FALLEN_OFF_CLIFF } = ROVER_STATUSES;

const endGameMiddleware = (store) => (next) => (action) => {
	const { elapsedTime, ore, propellant, rovers } = store.getState();

	if (propellant >= 1 && action && action.type === END_GAME) {
		setTimeout(() => saveBestTimes(elapsedTime)(store.dispatch), 0);
	}

	if (ore < 350) {
		const { length } = rovers;
		const disabledRovers = rovers.filter(({ status }) => [LOST, STUCK, OUT_OF_POWER, FALLEN_OFF_CLIFF].includes(status));
		if (length === disabledRovers.length) {
			setTimeout(() => store.dispatch(endGame()), 0);
		}
	}

	return next(action);
};

export default endGameMiddleware;
