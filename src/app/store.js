import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import appModule from './appModule';

const reducers = combineReducers({
	appModule,
});
// eslint-disable-next-line no-underscore-dangle
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middleware = [];
const store = createStore(
    reducers,
    composeEnhancers(applyMiddleware(...middleware)),
);

export default store;
