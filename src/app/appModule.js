const RESTART_GAME = 'RESTART_GAME';
const END_GAME = 'END_GAME';

export const restartGame = () => dispatch => dispatch({ type: RESTART_GAME });
export const endGame = () => dispatch => dispatch({ type: END_GAME });

const reducer = (state = false, { type }) => {
    switch (type) {
        case RESTART_GAME:
            return false;
        case END_GAME:
            return true;
        default:
            return state;
    };
};

export default reducer;
