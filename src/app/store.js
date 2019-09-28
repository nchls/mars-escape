import { combineReducers, createStore, applyMiddleware, compose } from 'redux';

// reducers
import appModuleReducer from './appModule';
import { tickinsReducer, doALittleTick } from '../slowTickins/tickinsModule';

// middlewares
import { tickADiddlyAMiddlewareARooni } from '../slowTickins/justForTickins';

const reducers = combineReducers({
    gameOver: appModuleReducer,
    tickins: tickinsReducer,
});
// eslint-disable-next-line no-underscore-dangle
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middleware = [tickADiddlyAMiddlewareARooni];
const store = createStore(
    reducers,
    composeEnhancers(applyMiddleware(...middleware)),
);

store.dispatch(doALittleTick())

export default store;
