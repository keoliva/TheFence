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
import { logout } from '../store';
import { connect } from 'react-redux';
import FetchInfoButton from '../components/FetchUserInfoButton';

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
	logout() {
		this.props.logout();
		this.props.navigation.navigate('AuthLoading');
	}

	render() {
		return (
			<View>
				<Text>Hello World</Text>
				<FetchInfoButton />
				<Button title="Log Out" onPress={this.logout} />
			</View>
		);
	}
}
const mapDispatch = dispatch => ({
	logout: () => dispatch(logout()),
});
export default connect(
	null,
	mapDispatch
)(HomeScreen);
