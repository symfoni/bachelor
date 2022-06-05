import { StyleSheet } from 'react-native';

// Main color for different actors
export const symfoniColor = '#170c5a';
export const navColor = '#C30000';
export const userColor =  '#003399';
export const stateColor = '#6f2c3f';

/**
 * General styles.
 */
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
	},
	credentialDetailTextDivider: {
		margin: 10
	},
	credentialDetailHeadingText: {
		fontSize: 16,
		marginBottom: 4,
	},
	textInputField: {
		borderColor: '#000', 
		borderWidth: 1, 
		borderRadius: 1, 
		padding: 10, 
		margin: 10
	},
	textInputFieldWide: {
		borderColor: '#000', 
		borderWidth: 1, 
		borderRadius: 1, 
		padding: 10, 
		margin: 10,
		width: '50%'
	}
});

/**
 * Styles related to forms.
 */
export const formStyles = StyleSheet.create({
	picker: {
		height: 35,
		margin: 10,
		marginTop: 1, 	
	}, 
	textInput: {
		borderWidth: 1,
		borderColor: '#000000',
		padding: 10,
		fontSize: 18,
		borderRadius: 6,
		margin: 10,
		marginTop: 1
	},
	scrollView: {

	}, 
	checkBoxContainer: {
		flex: 1,
		borderWidth: 1,
		borderColor: '#000000',
		backgroundColor: '#fff',
		alignItems: 'flex-start',
		justifyContent: 'center',
		margin: 10,
		marginTop: 1,
		borderRadius: 6,
	},
	textLabel: {
		margin: 10, 
		marginBottom: 1
	}
});

/**
 * Styles related to buttons.
 */
export const buttonStyles = StyleSheet.create({
	submitButtonFormSymfoni: {
		margin: 10,
		backgroundColor: symfoniColor,
		borderRadius: 6,
		alignItems: 'center',
		padding: 10
	},
	submitButtonFormState: {
		margin: 10,
		backgroundColor: stateColor,
		borderRadius: 6,
		alignItems: 'center',
		padding: 10
	},
	submitButtonText: {
		color: '#fff',
		fontSize: 18
	},
	navigationButtonDefault: {
		backgroundColor: '#000',
		alignItems: 'center',
		justifyContent: 'center',
		paddingVertical: 24,
		width: 200,
		borderRadius: 40,
		elevation: 3,
		margin: 5
	},
	navigationButtonSymfoni: {
		backgroundColor: symfoniColor,
		alignItems: 'center',
		justifyContent: 'center',
		paddingVertical: 24,
		width: 250,
		borderRadius: 40,
		elevation: 3,
		margin: 5
	},
	navigationButtonNAV: {
		backgroundColor: navColor,
		alignItems: 'center',
		justifyContent: 'center',
		paddingVertical: 24,
		width: 200,
		borderRadius: 40,
		elevation: 3,
		margin: 5
	},
	navigationButtonUser: {
		backgroundColor: userColor,
		alignItems: 'center',
		justifyContent: 'center',
		paddingVertical: 24,
		width: 200,
		borderRadius: 40,
		elevation: 3,
		margin: 5
	},
	navigationButtonState: {
		backgroundColor: stateColor,
		alignItems: 'center',
		justifyContent: 'center',
		paddingVertical: 24,
		width: 200,
		borderRadius: 40,
		elevation: 3,
		margin: 5
	},
	navigationButtonText: {
		color: '#fff',
	},
	createVcButtonState: {
		backgroundColor: stateColor,
		alignItems: 'center',
		justifyContent: 'center',
		paddingVertical: 12,
		paddingHorizontal: 32,
		borderRadius: 4,
		elevation: 3,
	},
	stateLoginButton: {
		width: 100, 
		backgroundColor: stateColor
	}
});