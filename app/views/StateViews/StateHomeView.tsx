import React from 'react';
import { Alert } from 'react-native';
import { Text, View } from 'react-native';
import NavigationButton from '../../components/navigationButton';
import { styles } from '../../styles';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function StateHomeView({navigation}: any){
	return (
		<View style={styles.container}>
			<Text>This is the state home page.</Text>

			<NavigationButton
				title='Create personVC'
				onPress={()=> navigation.navigate('StateCreatePersonVC')}
			></NavigationButton>

		</View>
	);
}