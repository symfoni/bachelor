import React from 'react';
import { Text, View } from 'react-native';
import NavigationButton from '../../components/navigationButton';
import { styles } from '../../styles';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function SymfoniHomeView({navigation}: any){
	return (
		<View style={styles.container}>
			<Text>This is the symfoni home page.</Text>

			<NavigationButton
				title='Create employment contract'
				onPress={()=> navigation.navigate('SymfoniCreateEmploymentVC')}
			></NavigationButton>

			<NavigationButton
				title='Create termination contract'
				onPress={()=> navigation.navigate('SymfoniCreateTerminationVC')}
			></NavigationButton>

		</View>
	);
}