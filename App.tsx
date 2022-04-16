import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginView from './app/views/LoginView';
import NAVHomeView from './app/views/NAVViews/NavHomeView';
import { NAVRecieveVPView } from './app/views/NAVViews/NAVRecieveVPView';
import StateHomeView from './app/views/StateViews/StateHomeView';
import { SymfoniCreateEmploymentVCView } from './app/views/SymfoniViews/SymfoniCreateEmploymentVCView';
import { SymfoniCreateTerminationVCView } from './app/views/SymfoniViews/SymfoniCreateTerminationVCView';
import { SymfoniQrCodeView } from './app/views/SymfoniViews/SymfoniQrCodeView';
import SymfoniHomeView from './app/views/SymfoniViews/SymfoniHomeView';
import { UserCreateVPView } from './app/views/UserViews/UserCreateVPView';
import UserHomeView from './app/views/UserViews/UserHomeView';
import UserListVCView from './app/views/UserViews/UserListVCView';
import UserRecieveVCView from './app/views/UserViews/UserRecieveVCView';
import { UserVCDetailView } from './app/views/UserViews/UserVCDetailView';
import RequestCredentialView from './app/views/StateViews/RequestCredentialView';
import UserSendVPView from './app/views/UserViews/UserSendVPView';
import UserMainIdentifierView from './app/views/UserViews/UserMainIdentifierView';
import SymfoniRecieveVPView from './app/views/SymfoniViews/SymfoniRecieveVPView';
import UserSeeMessagesView from './app/views/UserViews/UserSeeMessagesView';
import { UserMessageDetailView } from './app/views/UserViews/UserMessageDetailView';
import StateUserPageView from './app/views/StateViews/StateUserPageView';
import { StateUserLoginView } from './app/views/StateViews/StateUserLoginView';

const Stack = createNativeStackNavigator();

export default function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName='Login'>
				<Stack.Screen name='Login' component={LoginView} options={{title: 'Choose your agent!'}}></Stack.Screen>
				
				<Stack.Screen name='UserHome' component={UserHomeView} options={{title: 'User Agent'}}></Stack.Screen>
				<Stack.Screen name='UserMainIdentifier' component={UserMainIdentifierView} options={{title: 'Recieve your VC'}}></Stack.Screen>
				<Stack.Screen name='UserRecieveVC' component={UserRecieveVCView} options={{title: 'Recieve your VC'}}></Stack.Screen>
				<Stack.Screen name='UserListVCs' component={UserListVCView} options={{title: 'All your VCs'}}></Stack.Screen>
				<Stack.Screen name='UserCreateVP' component={UserCreateVPView} options={{title: 'Create your verifiable presentation'}}></Stack.Screen>
				<Stack.Screen name='UserVCDetail' component={UserVCDetailView}></Stack.Screen>
				<Stack.Screen name='UserSendVP' component={UserSendVPView}></Stack.Screen>
				<Stack.Screen name='UserMessages' component={UserSeeMessagesView}></Stack.Screen>
				<Stack.Screen name='UserMessageDetail' component={UserMessageDetailView}></Stack.Screen>

				<Stack.Screen name='SymfoniHome' component={SymfoniHomeView} options={{title: 'Symfoni Agent'}}></Stack.Screen>
				<Stack.Screen name='SymfoniCreateEmploymentVC' component={SymfoniCreateEmploymentVCView} options={{title: 'Create employment VC'}}></Stack.Screen>
				<Stack.Screen name='SymfoniCreateTerminationVC' component={SymfoniCreateTerminationVCView} options={{title: 'Create termination VC'}}></Stack.Screen>
				<Stack.Screen name='SymfoniQrCodeView' component={SymfoniQrCodeView} options={{title: 'Symfoni QR code'}}></Stack.Screen>
				<Stack.Screen name='SymfoniRecieveVP' component={SymfoniRecieveVPView} options={{title: 'Send a VP here'}}></Stack.Screen>
				
				
				<Stack.Screen name='StateHome' component={StateHomeView} options={{title: 'State Agent'}}></Stack.Screen>
				<Stack.Screen name='StateUserLogin' component={StateUserLoginView} options={{title: 'Create personVC'}}></Stack.Screen>
				<Stack.Screen name='RequestCredential' component={RequestCredentialView} options={{title: 'State Agent'}}></Stack.Screen>
				<Stack.Screen name='StateUserPage' component={StateUserPageView}></Stack.Screen>
				
				<Stack.Screen name='NAVHome' component={NAVHomeView} options={{title: 'NAV Agent'}}></Stack.Screen>
				<Stack.Screen name='NAVRecieveVP' component={NAVRecieveVPView} options={{title: 'Send your VP here and get it verified, or not'}}></Stack.Screen>

			</Stack.Navigator>
		</NavigationContainer>
	);
}