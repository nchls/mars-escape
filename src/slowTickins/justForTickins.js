import { doALittleTick } from './tickinsModule';

export const tickADiddlyAMiddlewareARooni = store => next => action => {
    const gameSpeed = store.getState().tickins.gameSpeed;
    gameSpeed && window.setTimeout(() => store.dispatch(doALittleTick()), gameSpeed)
    return next(action)
}