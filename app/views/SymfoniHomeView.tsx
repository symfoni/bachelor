import React from 'react';
import { Alert, Button } from 'react-native';
import { Text, View } from 'react-native';
import { styles } from '../styles';

export default function SymfoniHomeView(){
	return (
		<View style={styles.container}>
			<Text>This is the symfoni home page.</Text>

			<Button
				title='Create employment contract'
				onPress={()=> Alert.alert('Test','Test')}
			></Button>

			<Button
				title='Create termination contract'
				onPress={()=> Alert.alert('Test','Test')}
			></Button>

		</View>
	);
}