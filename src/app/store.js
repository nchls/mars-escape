import { combineReducers, createStore, applyMiddleware, compose } from 'redux';

// reducers
import { gameOverReducer } from './appModule';
import buildDialogReducer from '../buildDialog/buildDialogModule';
import inventoryReducer from '../inventory/inventoryModule';
import oreCounterReducer from '../oreCounter/oreCounterModule';
import tasksListReducer from '../tasksList/tasksListModule';
import { tickinsReducer, doALittleTick } from '../slowTickins/tickinsModule';

// middlewares
import tasksListMiddleware from '../tasksList/tasksListMiddleware';
import { tickADiddlyAMiddlewareARooni } from '../slowTickins/justForTickins';

const reducers = combineReducers({
	gameOver: gameOverReducer,
	gameSpeed: tickinsReducer,
	inventory: inventoryReducer,
	isBuildDialogOpen: buildDialogReducer,
	ore: oreCounterReducer,
	tasks: tasksListReducer,
});
// eslint-disable-next-line no-underscore-dangle
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middleware = [tickADiddlyAMiddlewareARooni, tasksListMiddleware];
const store = createStore(
	reducers,
	composeEnhancers(applyMiddleware(...middleware)),
);

store.dispatch(doALittleTick());

export default store;
