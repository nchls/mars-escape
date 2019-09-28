import { toggleDustStorm } from './dustStormModule';

const NO_DUST_STORM_MULTIPLIER = 0.05;
const IS_DUST_STORM_MULTIPLIER = 0.75;

const dustStormMiddleware = (store) => (next) => (action) => {
	const { isDustStorm, timeSinceLastDustStorm } = store.getState();
	const multiplier = isDustStorm ? IS_DUST_STORM_MULTIPLIER : NO_DUST_STORM_MULTIPLIER;
	const comparisonRoll = timeSinceLastDustStorm * multiplier;

	if (comparisonRoll > 1) {
		const randomizer = 100 * Math.random();
		if (randomizer < comparisonRoll) {
			toggleDustStorm()(store.dispatch);
		}
	}

	return next(action);
};

export default dustStormMiddleware;
