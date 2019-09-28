export const START_APP = 'START_APP';
export const RESTART_GAME = 'RESTART_GAME';
export const END_GAME = 'END_GAME';

export const startApp = () => ({ type: START_APP });
export const restartGame = () => ({ type: RESTART_GAME });
export const endGame = () => ({ type: END_GAME });

export const gameOverReducer = (state = false, { type }) => {
	switch (type) {
	case RESTART_GAME:
		return false;
	case END_GAME:
		return true;
	default:
		return state;
	}
};
