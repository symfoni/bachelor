import React from 'react';
import { Text, View } from 'react-native';
import NavigationButton from '../../components/navigationButton';
import { styles } from '../../styles';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function NAVHomeView({navigation}:any){
	return (
		<View style={styles.container}>
			<Text>This is the NAV home page.</Text>

			<NavigationButton
				title='Søk dagpenger'
				onPress={()=> navigation.navigate('NAVRecieveVP')}
			></NavigationButton>

		</View>
	);
}
