export const RESTART_GAME = 'RESTART_GAME';
export const END_GAME = 'END_GAME';

export const restartGame = () => dispatch => dispatch({ type: RESTART_GAME });
export const endGame = () => dispatch => dispatch({ type: END_GAME });
