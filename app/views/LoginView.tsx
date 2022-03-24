import { StatusBar } from 'expo-status-bar';
import { Button, Text, View } from 'react-native';
import { styles } from '../styles';

// TODO: Fix type issue, it is not safe to have 'any' as type here
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function LoginView( { navigation }: any ) {
	return (
		<View style={styles.container}>
			<Text>Choose your agent!</Text>
			<StatusBar style="auto" />
			
			<Button
				title='User agent'
				onPress={()=> navigation.navigate('UserHome') }

			/>
			
			<Button 
				title='Symfoni agent'
				onPress={()=>navigation.navigate('SymfoniHome')}

			/>

			<Button 
				title='NAV agent'
				onPress={()=>navigation.navigate('NAVHome')}
			/>

			<Button 
				title='State agent'
				onPress={()=>navigation.navigate('StateHome')}

			/>
		</View>
	);
}

