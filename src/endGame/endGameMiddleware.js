import { END_GAME, endGame } from '../app/appModule';
import { ROVER_STATUSES } from '../rover/roverModule';
import { saveBestTimes } from './endGameModule';

const { LOST, STUCK, OUT_OF_POWER, FALLEN_OFF_CLIFF } = ROVER_STATUSES;

const endGameMiddleware = (store) => (next) => (action) => {
	const { elapsedTime, gameOver, inventory, ore, propellant, rovers, tasks } = store.getState();

	if (propellant >= 1 && action && action.type === END_GAME) {
		setTimeout(() => saveBestTimes(elapsedTime)(store.dispatch), 0);
	}

	if (!gameOver && ore < 350) {
		const { length } = rovers;
		const disabledRovers = rovers.filter(({ status }) => [LOST, STUCK, OUT_OF_POWER, FALLEN_OFF_CLIFF].includes(status));
		if (length === disabledRovers.length && tasks.length === 0) {
			const sellCost = inventory.filter((item) => item.cost && item.itemId !== 22).reduce((acc, item) => acc + Math.floor(item.cost / 2), 0);
			const hasWinch = inventory.find((item) => item.itemId === 22) ? 150 : 0;
			const finalOre = sellCost + hasWinch + ore;
			if (finalOre < 350) {
				setTimeout(() => store.dispatch(endGame()), 0);
			}
		}
	}

	return next(action);
};

export default endGameMiddleware;
