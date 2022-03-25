import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginView from './app/views/LoginView';
import NAVHomeView from './app/views/NAVViews/NavHomeView';
import StateHomeView from './app/views/StateViews/StateHomeView';
import SymfoniHomeView from './app/views/SymfoniViews/SymfoniHomeView';
import { UserCreateVPView } from './app/views/UserViews/UserCreateVPView';
import UserHomeView from './app/views/UserViews/UserHomeView';
import UserListVCView from './app/views/UserViews/UserListVCView';
import UserRecieveVCView from './app/views/UserViews/UserRecieveVCView';

const Stack = createNativeStackNavigator();

export default function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName='Login'>
				<Stack.Screen name='Login' component={LoginView} options={{title: 'Choose your agent!'}}></Stack.Screen>
				
				<Stack.Screen name='UserHome' component={UserHomeView} options={{title: 'User Agent'}}></Stack.Screen>
				<Stack.Screen name='UserRecieveVC' component={UserRecieveVCView} options={{title: 'Recieve your VC'}}></Stack.Screen>
				<Stack.Screen name='UserListVCs' component={UserListVCView} options={{title: 'All your VCs'}}></Stack.Screen>
				<Stack.Screen name='UserCreateVP' component={UserCreateVPView} options={{title: 'Create your verifiable presentation'}}></Stack.Screen>
				

				<Stack.Screen name='SymfoniHome' component={SymfoniHomeView} options={{title: 'Symfoni Agent'}}></Stack.Screen>
				
				<Stack.Screen name='StateHome' component={StateHomeView} options={{title: 'State Agent'}}></Stack.Screen>
				
				<Stack.Screen name='NAVHome' component={NAVHomeView} options={{title: 'NAV Agent'}}></Stack.Screen>
			</Stack.Navigator>
		</NavigationContainer>
	);
}