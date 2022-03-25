import React from 'react';
import { Alert } from 'react-native';
import { Text, View } from 'react-native';
import NavigationButton from '../components/navigationButton';
import { styles } from '../styles';

export default function UserHomeView(){
	return (
		<View style={styles.container}>
			<Text>This is the user home page.</Text>

			<NavigationButton
				title='Recieve VC'
				onPress={()=> Alert.alert('Test','Test')}
			></NavigationButton>

			<NavigationButton
				title='List VCs'
				onPress={()=> Alert.alert('Test','Test')}
			></NavigationButton>

			<NavigationButton
				title='Send VP'
				onPress={()=> Alert.alert('Test','Test')}
			></NavigationButton>

		</View>
	);
}