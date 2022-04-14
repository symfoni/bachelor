import React from 'react';
import { View } from 'react-native';
import { MessageDetail } from '../../components/messageDetail';
import { styles } from '../../styles';

/**
 * UserMessageDetailView is the view where the user can view details within a message.
 * @param param0 takes an object with a navigator and a route that contains the message details.
 * @returns a view with message details.
 */
export function UserMessageDetailView({navigation, route}: any){
	
	const {item} = route.params;

	return (
		<View style={styles.container}>
			<MessageDetail navigation={navigation} item={item}></MessageDetail>
		</View>
	);
}