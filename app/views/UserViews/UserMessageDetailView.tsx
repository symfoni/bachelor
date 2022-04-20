import { VerifiableCredential } from '@veramo/core';
import React from 'react';
import { Button, ScrollView } from 'react-native';
import { USER_CREDENTIAL_URL, USER_HANDLE_MESSAGE_TOKEN_URL } from '../../api.constants.';
import { MessageDetail } from '../../components/messageDetail';
import { IHandledMessage } from '../../interfaces/IMessageData.interface';

/**
 * UserMessageDetailView is the view where the user can view details within a message.
 * @param param0 takes an object with a navigator and a route that contains the message details.
 * @returns a view with message details.
 */
export function UserMessageDetailView({navigation, route}: any){
	const {item} = route.params;

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

			alert('credential was successfully added to your database');

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
			}

			const data: IHandledMessage = await rawdata.json();

			saveCredentials(data.handledMessage.credentials);

		} catch (error) {
			console.error(error);
		}
	};

	return (
		<ScrollView>
			<MessageDetail navigation={navigation} item={item}></MessageDetail>
			<Button onPress={handleMessageToken} title='Save credential' color={'orange'}></Button>
		</ScrollView>
	);
}