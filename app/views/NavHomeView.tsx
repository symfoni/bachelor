import React from 'react';
import { Alert, Button, StyleSheet } from 'react-native';
import { Text, View } from 'react-native';

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

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
