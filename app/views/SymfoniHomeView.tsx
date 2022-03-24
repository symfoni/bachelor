import React from 'react';
import { Alert, Button, StyleSheet } from 'react-native';
import { Text, View } from 'react-native';

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

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
