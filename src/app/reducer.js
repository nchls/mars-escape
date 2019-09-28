import { RESTART_GAME, END_GAME } from '../actions/GameConditionsActions';

const initialState = Object.freeze({
    rovers: [],
    tasks: [],
    inventory: [],
    tutorialProgress: 0,
    tutorialShown: 0,
    isBuildDialogOpen: false,
    isDustStorm: false,
    timeSinceLastDustStorm: 0,
    ore: 0,
    propellant: 1,
    gameSpeed: 0,
    elapsedTime: 0,
    bestTimes: [],
    gameOver: false,
});

const reducer = (state = initialState, { type, data }) => {
    switch (type) {
        case RESTART_GAME:
            return { ...initialState };
        case END_GAME:
            return { ...state, gameOver: true };
        default:
            return state;
    };
};

export default reducer;
