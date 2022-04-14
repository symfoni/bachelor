import React from 'react';
import { Text, View } from 'react-native';
import NavigationButton from '../../components/navigationButton';
import { buttonStyles, styles } from '../../styles';

/**
 * SymfoniHomeView is a view component for Symfonis homepage.
 * @param param0 takes a navigation object as a parameter.
 * @returns the homepage view for Symfoni.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function SymfoniHomeView({navigation}: any){
	return (
		<View style={styles.container}>
			<Text style={styles.headingTextBlack}>This is the symfoni home page.</Text>
			<Text>Employer actions</Text>
			<NavigationButton
				title='Add employee'
				customStyle={buttonStyles.navigationButtonSymfoni}
				onPress={()=> navigation.navigate('SymfoniCreateEmploymentVC')}
			></NavigationButton>

			<NavigationButton
				title='Terminate employee'
				customStyle={buttonStyles.navigationButtonSymfoni}
				onPress={()=> navigation.navigate('SymfoniCreateTerminationVC')}
			></NavigationButton>

			<Text>Employee action</Text>

			<NavigationButton
				title='Request VCs'
				customStyle={buttonStyles.navigationButtonSymfoni}
				onPress={()=> navigation.navigate('SymfoniRecieveVP')}
			></NavigationButton>

		</View>
	);
}