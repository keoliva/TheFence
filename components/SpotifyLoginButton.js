import React from 'react';
import { Button } from 'react-native-elements';

const LoginButton = ({ onPress }) => {
	return (
		<Button
			icon={{
				name: 'spotify',
				color: 'white',
				type: 'font-awesome',
				size: 23,
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
			onPress={onPress}
		/>
	);
};
export default LoginButton;
