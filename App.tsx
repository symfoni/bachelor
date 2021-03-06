import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginView from './app/views/LoginView';
import NAVHomeView from './app/views/NAVViews/NavHomeView';
import NAVRecieveVPView from './app/views/NAVViews/NAVRecieveVPView';
import SymfoniCreateEmploymentVCView from './app/views/SymfoniViews/SymfoniCreateEmploymentVCView';
import SymfoniCreateTerminationVCView from './app/views/SymfoniViews/SymfoniCreateTerminationVCView';
import SymfoniHomeView from './app/views/SymfoniViews/SymfoniHomeView';
import UserCreateVPView from './app/views/UserViews/UserCreateVPView';
import UserHomeView from './app/views/UserViews/UserHomeView';
import UserListVCView from './app/views/UserViews/UserListVCView';
import UserVCDetailView from './app/views/UserViews/UserVCDetailView';
import RequestCredentialView from './app/views/StateViews/RequestCredentialView';
import UserSendVPView from './app/views/UserViews/UserSendVPView';
import UserMainIdentifierView from './app/views/UserViews/UserMainIdentifierView';
import SymfoniRecieveVPView from './app/views/SymfoniViews/SymfoniRecieveVPView';
import UserSeeMessagesView from './app/views/UserViews/UserSeeMessagesView';
import UserMessageDetailView from './app/views/UserViews/UserMessageDetailView';
import StateUserPageView from './app/views/StateViews/StateUserPageView';
import StateUserLoginView from './app/views/StateViews/StateUserLoginView';

const Stack = createNativeStackNavigator();

export default function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName='Login'>
				<Stack.Screen name='Login' component={LoginView} options={{title: 'Choose your agent!'}}></Stack.Screen>
				
				<Stack.Screen name='UserHome' component={UserHomeView} options={{title: 'User Agent'}}></Stack.Screen>
				<Stack.Screen name='UserMainIdentifier' component={UserMainIdentifierView} options={{title: 'User - Main DID'}}></Stack.Screen>
				<Stack.Screen name='UserListVCs' component={UserListVCView} options={{title: 'User - List of VCs'}}></Stack.Screen>
				<Stack.Screen name='UserCreateVP' component={UserCreateVPView} options={{title: 'User - Scan for VP request'}}></Stack.Screen>
				<Stack.Screen name='UserVCDetail' component={UserVCDetailView} options={{title: 'User - VC detail'}}></Stack.Screen>
				<Stack.Screen name='UserSendVP' component={UserSendVPView} options={{title: 'Scan a QR-code with a VP request'}}></Stack.Screen>
				<Stack.Screen name='UserMessages' component={UserSeeMessagesView} options={{title: 'Messages'}}></Stack.Screen>
				<Stack.Screen name='UserMessageDetail' component={UserMessageDetailView} options={{title: 'Message'}}></Stack.Screen>

				<Stack.Screen name='SymfoniHome' component={SymfoniHomeView} options={{title: 'Symfoni Home'}}></Stack.Screen>
				<Stack.Screen name='SymfoniCreateEmploymentVC' component={SymfoniCreateEmploymentVCView} options={{title: 'Symfoni - Add employee'}}></Stack.Screen>
				<Stack.Screen name='SymfoniCreateTerminationVC' component={SymfoniCreateTerminationVCView} options={{title: 'Symfoni - Terminate employee'}}></Stack.Screen>
				<Stack.Screen name='SymfoniRecieveVP' component={SymfoniRecieveVPView} options={{title: 'Symfoni - Send your VP'}}></Stack.Screen>
				
				
				<Stack.Screen name='StateUserLogin' component={StateUserLoginView} options={{title: 'Login into your state account'}}></Stack.Screen>
				<Stack.Screen name='RequestCredential' component={RequestCredentialView} options={{title: 'State Agent'}}></Stack.Screen>
				<Stack.Screen name='StateUserPage' component={StateUserPageView} options={{title: 'Home'}}></Stack.Screen>
				
				<Stack.Screen name='NAVHome' component={NAVHomeView} options={{title: 'NAV Home'}}></Stack.Screen>
				<Stack.Screen name='NAVRecieveVP' component={NAVRecieveVPView} options={{title: 'NAV - Send your VP'}}></Stack.Screen>

			</Stack.Navigator>
		</NavigationContainer>
	);
}