import React from 'react';
import { Provider } from 'react-redux';

import store from './store'

import './app.scss';


const App = () => {
	return (
		<Provider store={store}>
			<div className="app">
				Hello world
			</div>
		</Provider>
	);
};

export default App;
