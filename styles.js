import { StyleSheet, Dimensions } from 'react-native';

export default StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
	bottomTab: {
		position: 'absolute',
		bottom: 0,
		flex: 1,
		flexDirection: 'row',
	},
	bottomSubTab: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-evenly',
	},
	mapView: {
		alignSelf: 'stretch',
		height: Dimensions.get('window').height,
	},
});
