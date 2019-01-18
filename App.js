import React from 'react';
import { View, StyleSheet } from 'react-native';
import AppNavigator from './navigation/AppNavigator';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});

export default class App extends React.Component {
	render() {
		return (
			<View style={styles.container}>
				<AppNavigator />
			</View>
		);
	}
}
