import React from 'react';
import { Text, View } from 'react-native';
import NavigationButton from '../../components/navigationButton';
import { buttonStyles, styles } from '../../styles';

/**
 * StateHomeView is a view component for the states homepage.
 * @param param0 takes a navigation object as a parameter.
 * @returns returns the state homepage view.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function StateHomeView({navigation}: any){
	return (
		<View style={styles.container}>
			<Text style={styles.headingTextBlack}>This is the state home page.</Text>

			<NavigationButton
				title='Login'
				customStyle={buttonStyles.navigationButtonState}
				onPress={()=> navigation.navigate('StateUserLogin')}
			></NavigationButton>

		</View>
	);
}