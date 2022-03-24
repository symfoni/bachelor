import React from 'react';
import { Alert, Button } from 'react-native';
import { Text, View } from 'react-native';
import { styles } from '../styles';

export default function UserHomeView(){
	return (
		<View style={styles.container}>
			<Text>This is the user home page.</Text>

			<Button
				title='Recieve VC'
				onPress={()=> Alert.alert('Test','Test')}
			></Button>

			<Button
				title='List VCs'
				onPress={()=> Alert.alert('Test','Test')}
			></Button>

			<Button
				title='Send VP'
				onPress={()=> Alert.alert('Test','Test')}
			></Button>

		</View>
	);
}