import React from 'react';
import AppNavigator from './navigation/AppNavigator';
import { Provider } from 'react-redux';
import store from './store';

export default class App extends React.Component {
	render() {
		return (
			<Provider store={store}>
				<AppNavigator />
			</Provider>
		);
	}
}
