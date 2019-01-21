import React from 'react';
import { Button } from 'react-native-elements';

const TabButton = ({ name, onPress }) => {
	return (
		<Button
			icon={{
				size: 40,
				name,
				color: 'black',
			}}
			onPress={onPress}
			buttonStyle={{ backgroundColor: 'transparent' }}
		/>
	);
};

export default TabButton;
