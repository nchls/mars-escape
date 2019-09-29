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
		const stuckRovers = rovers.filter(({ status }) => [STUCK, OUT_OF_POWER, LOST, FALLEN_OFF_CLIFF].includes(status)); // All the rovers who are stuck
		if (tasks.length === 0) { // We don't have any tasks running
			const sellCost = inventory // We get the value of everything in our inventory
				.filter((item) => item.cost && item.itemId !== 22)
				.reduce((acc, item) => acc + Math.floor(item.cost / 2), 0);
			const finalOre = sellCost + ore;

			if (length === stuckRovers.length || finalOre < 300) { // All rovers are broken and we can't bulid new ones
				const itemsInInventory = inventory.map((item) => item.itemId);

				const functioningRovers = rovers // Then we check the rovers
					.filter(({ modules, status }) => (
						![STUCK, OUT_OF_POWER, LOST, FALLEN_OFF_CLIFF].includes(status) // All rovers who are working
						&& (
							(modules.includes(22) || itemsInInventory.includes(22) || finalOre >= 150) // If the rovers have a winch or one is inventory
							|| (
								(
									modules.includes(14)
									|| modules.includes(15)
									|| itemsInInventory.includes(14)
									|| itemsInInventory.includes(15)
									|| finalOre >= 100
								) // If the rovers have a drill or one is in inventory
								&& (
									modules.includes(19)
									|| modules.includes(20)
									|| itemsInInventory.includes(19)
									|| itemsInInventory.includes(20)
									|| finalOre >= 100
								) // And the rovers have a tank or one is in inventory
							)
						)
					));

				if (functioningRovers.length === 0) {
					setTimeout(() => store.dispatch(endGame()), 0);
				}
			}
		}
	}

	return next(action);
};

export default endGameMiddleware;
