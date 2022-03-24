import React from 'react';
import { Alert, Button } from 'react-native';
import { Text, View } from 'react-native';
import { styles } from '../styles';

export default function NAVHomeView(){
	return (
		<View style={styles.container}>
			<Text>This is the NAV home page.</Text>

			<Button
				title='Søk dagpenger'
				onPress={()=>{Alert.alert('test','test');}}
			></Button>

		</View>
	);
}
