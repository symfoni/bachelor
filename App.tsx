import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginView from './app/views/LoginView';
import NAVHomeView from './app/views/NavHomeView';
import StateHomeView from './app/views/StateHomeView';
import SymfoniHomeView from './app/views/SymfoniHomeView';
import UserHomeView from './app/views/UserHomeView';

const Stack = createNativeStackNavigator();

export default function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName='Login'>
				<Stack.Screen name='Login' component={LoginView} options={{title: 'Choose your agent!'}}></Stack.Screen>
				
				<Stack.Screen name='UserHome' component={UserHomeView} options={{title: 'User Agent'}}></Stack.Screen>

				<Stack.Screen name='SymfoniHome' component={SymfoniHomeView} options={{title: 'Symfoni Agent'}}></Stack.Screen>
				
				<Stack.Screen name='StateHome' component={StateHomeView} options={{title: 'State Agent'}}></Stack.Screen>
				
				<Stack.Screen name='NAVHome' component={NAVHomeView} options={{title: 'NAV Agent'}}></Stack.Screen>
			</Stack.Navigator>
		</NavigationContainer>
	);
}