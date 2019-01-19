import React from 'react';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { refreshTokenForRequest } from '../store';

class FetchUserInfo extends React.Component {
	constructor() {
		super();
		this.handlePress = this.handlePress.bind(this);
	}
	componentDidMount;
	handlePress = async () => {
		await this.props.refreshToken();
		// this.props.accessToken;
	};
	render() {
		return <Button title="FETCH USER INFO" onPress={this.handlePress} />;
	}
}
const mapState = state => ({
	accessToken: state.userToken.accessToken,
});
const mapDispatch = dispatch => ({
	refreshToken: () => dispatch(refreshTokenForRequest()),
});
export default connect(
	mapState,
	mapDispatch
)(FetchUserInfo);
