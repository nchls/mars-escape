export const TICK = 'TOCK';
export const CHANGE_GAME_SPEED = 'MOAR_TICKINS';

export const doALittleTick = () => ({ type: TICK });

export const notQuiteMyTempo = (thatsMyTempo) => ({ type: CHANGE_GAME_SPEED, tempo: thatsMyTempo });

const initial = Object.freeze({
    gameSpeed: 1000
});

export const tickinsReducer = (store=initial, action) => {
    switch (action.type) {
        case CHANGE_GAME_SPEED:
            return {...store, gameSpeed: action.tempo};
        default:
            return store;
    }
}