import React from 'react';
import { Alert } from 'react-native';
import { Text, View } from 'react-native';
import NavigationButton from '../../components/navigationButton';
import { styles } from '../../styles';

export default function SymfoniHomeView(){
	return (
		<View style={styles.container}>
			<Text>This is the symfoni home page.</Text>

			<NavigationButton
				title='Create employment contract'
				onPress={()=> Alert.alert('Test','Test')}
			></NavigationButton>

			<NavigationButton
				title='Create termination contract'
				onPress={()=> Alert.alert('Test','Test')}
			></NavigationButton>

		</View>
	);
}