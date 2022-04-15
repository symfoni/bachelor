import { IMessage } from '@veramo/core';
import React from 'react';
import { Alert, Button, Text, View } from 'react-native';
import { USER_CREDENTIAL_URL } from '../api.constants.';

export function MessageDetail({item, navigation}: {item: IMessage, navigation: any}){

	// saves any amount of credentials to the database
	const saveCredentials = async () => {
		try {
			const credentials = item.credentials;

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
		} catch (error) {
			return alert('something went wrong, try again later');
		}
	};

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

	return (
		<View style={{margin: 10}}>
			
			<View style={{margin: 10}}>
				<Text style={{marginVertical: 5}}>From: {item.from}</Text>
				<Text style={{marginVertical: 5}}>To: {item.to}</Text>
				<Text style={{marginVertical: 5}}>Type: {item.type}</Text>
				{item.data == null ? <></> : <Text style={{marginVertical: 5}}>Data: {JSON.stringify(item.data.messageData)}</Text>}
				<Text style={{marginVertical: 5}}>Credential count: {item.credentials?.length}</Text>
				<Text style={{marginVertical: 5}}>Presentation count: {item.presentations?.length}</Text>
			</View>
            
			<View style={{margin:10}}>
				<Button title='delete' onPress={deleteMessageAlert}></Button>
			</View>
			<View style={{margin: 10}}>
				{
					item.credentials?.length === 0 ? 
						<></> 
						: 
						<Button title='Save credential(s)' color={'orange'} onPress={saveCredentials} />
				}
			</View>
			
		</View>
	);
}