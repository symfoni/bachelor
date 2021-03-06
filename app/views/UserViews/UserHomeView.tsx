import React from 'react';
import { Text, View } from 'react-native';
import NavigationButton from '../../components/navigationButton';
import { buttonStyles, styles } from '../../styles';

/**
 * UserHomeView is a view component for the general users homepage.
 * @param param0 takes a navigation object as a parameter.
 * @returns the homepage view for the user.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function UserHomeView({navigation}: any): JSX.Element {
	return (
		<View style={styles.container}>
			<Text style={styles.headingTextBlack}>Welcome User!</Text>

			<NavigationButton
				title='Show DID'
				customStyle={buttonStyles.navigationButtonUser}
				onPress={()=> navigation.navigate('UserMainIdentifier')}
			></NavigationButton>

			<NavigationButton
				title='List VCs'
				customStyle={buttonStyles.navigationButtonUser}
				onPress={()=>navigation.navigate('UserListVCs')}
			></NavigationButton>

			<NavigationButton
				title='Send VP'
				customStyle={buttonStyles.navigationButtonUser}
				onPress={()=> navigation.navigate('UserCreateVP')}
			></NavigationButton>

			<NavigationButton
				title='Messages'
				customStyle={buttonStyles.navigationButtonUser}
				onPress={()=> navigation.navigate('UserMessages')}
			></NavigationButton>

		</View>
	);
}