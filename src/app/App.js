import React from 'react';
import { Provider } from 'react-redux';

import AppWrap from './AppWrap';
import store from './store';

// Just a goof

const App = () => {
	return (
		<Provider store={store}>
			<AppWrap />
		</Provider>
	);
};


export default App;
