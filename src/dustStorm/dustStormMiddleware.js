import { toggleDustStorm } from './dustStormModule';

const NO_DUST_STORM_MULTIPLIER = 0.005;
const IS_DUST_STORM_MULTIPLIER = 0.15;

const dustStormMiddleware = (store) => (next) => (action) => {
	const { isDustStorm, timeSinceLastDustStorm } = store.getState();
	const multiplier = isDustStorm ? IS_DUST_STORM_MULTIPLIER : NO_DUST_STORM_MULTIPLIER;
	const comparisonRoll = timeSinceLastDustStorm * multiplier;

	if (comparisonRoll > 1) {
		const randomizer = 100 * Math.random();
		if (randomizer < comparisonRoll) {
			setTimeout(() => toggleDustStorm()(store.dispatch), 0);
		}
	}

	const alteredAction = action;
	alteredAction.extraData = alteredAction.extraData || {};
	alteredAction.extraData.isDustStorm = isDustStorm;
	return next(action);
};

export default dustStormMiddleware;
