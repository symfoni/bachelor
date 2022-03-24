import React from 'react';
import { Alert, Button } from 'react-native';
import { Text, View } from 'react-native';
import { styles } from '../styles';

export default function StateHomeView(){
	return (
		<View style={styles.container}>
			<Text>This is the state home page.</Text>

			<Button
				title='Create personVC'
				onPress={()=>Alert.alert('test','test')}
			></Button>

		</View>
	);
}