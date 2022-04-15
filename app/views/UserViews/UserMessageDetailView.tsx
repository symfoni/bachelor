import React from 'react';
import { ScrollView } from 'react-native';
import { MessageDetail } from '../../components/messageDetail';

/**
 * UserMessageDetailView is the view where the user can view details within a message.
 * @param param0 takes an object with a navigator and a route that contains the message details.
 * @returns a view with message details.
 */
export function UserMessageDetailView({navigation, route}: any){
	
	const {item} = route.params;

	return (
		<ScrollView>
			<MessageDetail navigation={navigation} item={item}></MessageDetail>
		</ScrollView>
	);
}