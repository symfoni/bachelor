import { StyleSheet } from 'react-native';

// Main color for different actors
const symfoniColor = '#170c5a';
const navColor = '#C30000';
const userColor =  '#003399';
const stateColor = '#6f2c3f';

// General styles
export const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
		marginVertical: 8,
	},
	credentialCard: {
		padding: 60,
		marginVertical: 10,
		marginHorizontal: 16,
		backgroundColor: userColor,
		borderRadius: 4,
		elevation: 3,
		alignItems: 'center',
		justifyContent: 'center',
	},
	defaultText: {
		color: '#fff'
	},
	headingText: {
		fontSize: 22,
		color: '#fff',
		marginBottom: 15
	},
	headingTextBlack: {
		fontSize: 22,
		color: '#000',
		marginBottom: 15
	},
	credentialDetailView: {
		flex: 1,
		backgroundColor: '#fff',
		justifyContent: 'center',
		marginVertical: 8,
	}
});

// Button styles
export const buttonStyles = StyleSheet.create({
	navigationButtonDefault: {
		backgroundColor: '#000',
		alignItems: 'center',
		justifyContent: 'center',
		paddingVertical: 24,
		paddingHorizontal: 64,
		borderRadius: 4,
		elevation: 3,
		margin: 5
	},
	navigationButtonSymfoni: {
		backgroundColor: symfoniColor,
		alignItems: 'center',
		justifyContent: 'center',
		paddingVertical: 12,
		paddingHorizontal: 32,
		borderRadius: 4,
		elevation: 3,
		margin: 5
	},
	navigationButtonNAV: {
		backgroundColor: navColor,
		alignItems: 'center',
		justifyContent: 'center',
		paddingVertical: 12,
		paddingHorizontal: 32,
		borderRadius: 4,
		elevation: 3,
		margin: 5
	},
	navigationButtonUser: {
		backgroundColor: userColor,
		alignItems: 'center',
		justifyContent: 'center',
		paddingVertical: 12,
		paddingHorizontal: 32,
		borderRadius: 4,
		elevation: 3,
		margin: 5
	},
	navigationButtonState: {
		backgroundColor: stateColor,
		alignItems: 'center',
		justifyContent: 'center',
		paddingVertical: 12,
		paddingHorizontal: 32,
		borderRadius: 4,
		elevation: 3,
		margin: 5
	},
	navigationButtonText: {
		color: '#fff',
	}
});