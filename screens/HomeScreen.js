import React from 'react';
import {
	Image,
	Platform,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import { Button } from 'react-native-elements';
import { refreshTokenForRequest, logout } from '../store';
import { connect } from 'react-redux';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});

class HomeScreen extends React.Component {
	constructor() {
		super();
		this.logout = this.logout.bind(this);
	}
	componentDidMount() {
		this.props.refreshToken();
	}
	logout() {
		this.props.logout();
		this.props.navigation.navigate('AuthLoading');
	}
	render() {
		return (
			<View>
				<Text>Hello World</Text>
				<Button
					icon={{
						name: 'spotify',
						color: 'white',
						type: 'font-awesome',
						size: 23,
					}}
					title="Log Out"
					buttonStyle={{
						backgroundColor: 'black',
						borderWidth: 0,
						borderRadius: 5,
						width: 300,
						height: 45,
						borderColor: 'transparent',
					}}
					onPress={this.logout}
				/>
			</View>
		);
	}
}
const mapDispatch = dispatch => ({
	refreshToken: () => dispatch(refreshTokenForRequest()),
	logout: () => dispatch(logout()),
});
export default connect(
	null,
	mapDispatch
)(HomeScreen);
