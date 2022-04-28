import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import NavigationButton from '../components/navigationButton';
import { styles } from '../styles';

// TODO: Fix type issue, it is not safe to have 'any' as type here
/**
 * LoginView is the initial view component for the application.
 * @param param0 takes a navigation object as a parameter.
 * @returns a login page view component.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function LoginView( { navigation }: any ): JSX.Element {
	return (
		<View style={styles.container}>
			<Text style={styles.headingTextBlack}>Choose your agent!</Text>
			<StatusBar style="auto" />
			
			<NavigationButton
				title='User'
				onPress={()=> navigation.navigate('UserHome')}
			></NavigationButton>
			
			<NavigationButton
				title='Symfoni'
				onPress={()=>navigation.navigate('SymfoniHome')}
			></NavigationButton>

			<NavigationButton
				title='NAV'
				onPress={()=>navigation.navigate('NAVHome')}
			></NavigationButton>

			<NavigationButton
				title='State'
				onPress={()=>navigation.navigate('StateUserLogin')}
			></NavigationButton>

		</View>
	);
}

