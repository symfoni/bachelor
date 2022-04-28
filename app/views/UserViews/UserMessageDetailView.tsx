import { VerifiableCredential } from '@veramo/core';
import React from 'react';
import { Alert, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
import { USER_CREDENTIAL_URL, USER_HANDLE_MESSAGE_TOKEN_URL } from '../../api.constants';
import { MessageDetail } from '../../components/messageDetail';
import { IHandledMessage } from '../../interfaces/IMessageData.interface';

/**
 * UserMessageDetailView is the view where the user can view details within a message.
 * @param param0 takes an object with a navigator and a route that contains the message details.
 * @returns a view with message details.
 */
export function UserMessageDetailView({navigation, route}: any){
	const {item} = route.params;

	// deletes a message from the database
	const deleteMessage = async () => {
		try {
			// TODO: Add API call that actually deletes the message.
			navigation.navigate('UserMessages');
			return Alert.alert('Deleted', 'The message was deleted');
		} catch (error) {
			console.error(error);
			return alert('unable to remove message, please try again later');
		}
	};

	// displays an alert message which forces the user to confirm the deletion.
	const deleteMessageAlert = () => {
		Alert.alert(
			'Delete', 
			'Are you sure you want to delete this message?',
			[
				{
					text: 'Cancel',
					onPress: () => {return;}
				},
				{
					text: 'Delete',
					onPress: deleteMessage
				},
			]
		);
	};

	// save credentials to db
	const saveCredentials = async (credentials: VerifiableCredential[]) => {
		try {
			if (typeof credentials === 'undefined') {
				return alert('credential list was empty');
			}

			for (let index = 0; index < credentials.length; index++) {
				await fetch(USER_CREDENTIAL_URL, {
					method: 'POST',
					body: JSON.stringify({credential: credentials[index]}),
					headers: {
						'Content-Type': 'application/json'
					}
				});
			}

			alert('A credential was successfully added to your wallet');

		} catch (error) {
			return alert('something went wrong, try again later');
		}
	};

	// turns a message token into message data
	const handleMessageToken = async () => {
		try {
			const rawdata = await fetch(USER_HANDLE_MESSAGE_TOKEN_URL + item.data.messageData);

			if (!rawdata.ok) {
				alert('no credentials found in the message');
				return;
			}

			const data: IHandledMessage = await rawdata.json();

			saveCredentials(data.handledMessage.credentials);

		} catch (error) {
			console.error(error);
		}
	};

	return (
		<ScrollView>
			<MessageDetail item={item}></MessageDetail>
			<Button buttonStyle={{marginVertical: 5, marginHorizontal: 15, backgroundColor: 'orange'}} onPress={handleMessageToken} title='Save credential'></Button>
			<Button buttonStyle={{marginVertical: 5, marginHorizontal: 15}} title='Delete' onPress={deleteMessageAlert}></Button>
		</ScrollView>
	);
}