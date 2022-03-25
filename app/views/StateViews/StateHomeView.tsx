import React from 'react';
import { Alert } from 'react-native';
import { Text, View } from 'react-native';
import NavigationButton from '../../components/navigationButton';
import { styles } from '../../styles';

export default function StateHomeView(){
	return (
		<View style={styles.container}>
			<Text>This is the state home page.</Text>

			<NavigationButton
				title='Create personVC'
				onPress={()=>Alert.alert('test','test')}
			></NavigationButton>

		</View>
	);
}