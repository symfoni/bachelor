import React from 'react';
import { Alert } from 'react-native';
import { Text, View } from 'react-native';
import NavigationButton from '../components/navigationButton';
import { styles } from '../styles';

export default function NAVHomeView(){
	return (
		<View style={styles.container}>
			<Text>This is the NAV home page.</Text>

			<NavigationButton
				title='Søk dagpenger'
				onPress={()=>{Alert.alert('test','test');}}
			></NavigationButton>

		</View>
	);
}
