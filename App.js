import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-elements';

export default class App extends React.Component {
	render() {
		return (
			<View style={styles.container}>
				<Button
					icon={{
						name: 'spotify',
						color: 'white',
						type: 'font-awesome',
						size: 18,
					}}
					title="Sign In"
					buttonStyle={{
						backgroundColor: 'black',
						borderWidth: 0,
						borderRadius: 5,
						width: 300,
						height: 45,
						borderColor: 'transparent',
					}}
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
