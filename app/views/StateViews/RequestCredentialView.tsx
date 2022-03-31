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
export default function StateHomeView(){
	return (
		<View style={styles.container}>
			<Text>This is the state request credential page.</Text>
		</View>
	);
}