import { RESTART_GAME, START_APP } from '../app/appModule';
import { TICK } from '../gameTicks/gameTicksModule';

const SAVE_BEST_TIMES = 'SAVE_BEST_TIMES';
const STORAGE_KEY = 'BEST_TIMES';

const initialState = Object.freeze([]);

const setStorage = (data) => {
	try {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
		return data;
	} catch (e) {
		return initialState;
	}
};

const getStorage = () => {
	try {
		return JSON.parse(localStorage.getItem(STORAGE_KEY));
	} catch (e) {
		return initialState;
	}
};

export const saveBestTimes = (data) => (dispatch) => dispatch({ type: SAVE_BEST_TIMES, data });

export const bestTimesReducer = (state = initialState, { type, data }) => {
	switch (type) {
	case START_APP:
		return [...getStorage()];
	case SAVE_BEST_TIMES: {
		const sols = data / 100;
		const bestTimes = [...state, sols]
			.sort((a, b) => (a < b ? -1 : 1))
			.slice(0, 5);
		return setStorage(bestTimes);
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
