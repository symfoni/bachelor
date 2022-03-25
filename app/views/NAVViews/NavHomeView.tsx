import React from 'react';
import { Text, View } from 'react-native';
import NavigationButton from '../../components/navigationButton';
import { buttonStyles, styles } from '../../styles';

/**
 * NAVHomeView is a view component for the NAV homepage.
 * @param param0 takes a navigation object as a parameter.
 * @returns the NAV homepage view.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function NAVHomeView({navigation}:any){
	return (
		<View style={styles.container}>
			<Text>This is the NAV home page.</Text>

			<NavigationButton
				title='Søk dagpenger'
				customStyle={buttonStyles.navigationButtonNAV}
				onPress={()=> navigation.navigate('NAVRecieveVP')}
			></NavigationButton>

		</View>
	);
}
