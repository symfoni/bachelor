import React from 'react';
import { Text, View } from 'react-native';
import NavigationButton from '../../components/navigationButton';
import { styles } from '../../styles';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function UserHomeView({navigation}: any){
	return (
		<View style={styles.container}>
			<Text>This is the user home page.</Text>

			<NavigationButton
				title='Recieve VC'
				onPress={()=> navigation.navigate('UserRecieveVC')}
			></NavigationButton>

			<NavigationButton
				title='List VCs'
				onPress={()=>navigation.navigate('UserListVCs')}
			></NavigationButton>

			<NavigationButton
				title='Create VP'
				onPress={()=> navigation.navigate('UserCreateVP')}
			></NavigationButton>

		</View>
	);
}