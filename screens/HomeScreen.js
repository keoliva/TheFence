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
import { refreshTokenForRequest } from '../store';
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
	componentDidMount() {
		this.props.refreshToken();
	}
	render() {
		return (
			<View>
				<Text>Hello World</Text>
			</View>
		);
	}
}
const mapDispatch = dispatch => ({
	refreshToken: () => dispatch(refreshTokenForRequest()),
});
export default connect(
	null,
	mapDispatch
)(HomeScreen);
