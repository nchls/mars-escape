import { setStorage, getStorage } from '../util/storage';
import { START_APP } from '../app/appModule';

const SET_TUTORIAL_PROGRESS = 'SET_TUTORIAL_PROGRESS';
const SHOW_TUTORIAL = 'SHOW_TUTORIAL';

const STORAGE_KEY = 'TUTORIAL_PROGRESS';

const initialTutorialProgressState = 0;

const saveTutorialState = setStorage(STORAGE_KEY)(initialTutorialProgressState);
const getTutorialState = getStorage(STORAGE_KEY)(initialTutorialProgressState);

export const setTutorialProgress = (progressId) => (dispatch) => (
	dispatch({ type: SET_TUTORIAL_PROGRESS, data: { progressId } }));

export const tutorialProgressReducer = (state = initialTutorialProgressState, { type, data }) => {
	switch (type) {
	case START_APP:
		return getTutorialState();
	case SET_TUTORIAL_PROGRESS:
		return saveTutorialState(data.progressId);
	default:
		return state;
	}
};

const initialTutorialShownState = 0;

export const setTutorialShown = (tutorialId) => (dispatch) => (
	dispatch({ type: SHOW_TUTORIAL, data: { tutorialId } }));

export const tutorialShownReducer = (state = initialTutorialShownState, { type, data }) => {
	switch (type) {
	case SHOW_TUTORIAL:
		return data.tutorialId;
	default:
		return state;
	}
};
