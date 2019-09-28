import { RESTART_GAME, START_APP } from '../app/appModule';
import { TICK } from '../gameTicks/gameTicksModule';

import { setStorage, getStorage } from '../util/storage';

const SAVE_BEST_TIMES = 'SAVE_BEST_TIMES';
const STORAGE_KEY = 'BEST_TIMES';

const initialState = Object.freeze([]);

const saveBestTime = setStorage(STORAGE_KEY)(initialState);

const getBestTime = getStorage(STORAGE_KEY)(initialState);

export const saveBestTimes = (data) => (dispatch) => dispatch({ type: SAVE_BEST_TIMES, data });

export const bestTimesReducer = (state = initialState, { type, data }) => {
	switch (type) {
	case START_APP:
		return getBestTime();
	case SAVE_BEST_TIMES: {
		const date = new Date().toDateString();
		const time = data / 100;
		const bestTimes = [...state, { date, time }]
			.sort((a, b) => (a.time < b.time ? -1 : 1))
			.slice(0, 5);
		console.log({ date, time, bestTimes });
		return saveBestTime(bestTimes);
	}
	default:
		return state;
	}
};

export const elapsedTimeReducer = (state = 0, { type }) => {
	switch (type) {
	case START_APP:
	case RESTART_GAME:
		return 0;
	case TICK:
		return state + 1;
	default:
		return state;
	}
};
