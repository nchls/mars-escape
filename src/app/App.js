import React from 'react';
import { Provider } from 'react-redux';

import AppWrap from './AppWrap';
import store from './store';


const App = () => {
	return (
		<Provider store={store}>
			<AppWrap />
		</Provider>
	);
};


export default App;
