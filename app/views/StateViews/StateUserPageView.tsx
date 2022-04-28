import React, { useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import { Button } from 'react-native-elements';
import { STATE_PERSON_CREDENTIAL_URL, STATE_SEND_MESSAGE_URL } from '../../api.constants';
import { styles } from '../../styles';

/**
 * StateUserPageView a dynamic page for a user that logs into their state account.
 * @param param0 person data passed from the login page.
 * @returns a view with a custom user page at the state site.
 */
export default function StateUserPageView({route}: any) {
	const [text, setText] = useState('');
	const {item} = route.params;

	// issues a person credential
	const issuePersonCredential = async () => {
		try {
			const messageType = 'PersonVC';
			// combine did (text), and person data from db, to create person credential subject object
			const credentialSubject = {
				credentialSubject: {
					...item.personData,
					id: text
				}
			};
			
			// create person VC
			const rawdata = await fetch(STATE_PERSON_CREDENTIAL_URL, {
				method: 'POST',
				body: JSON.stringify(credentialSubject),
				headers: {
					'Content-Type': 'application/json'
				}
			});
			const credential = await rawdata.json();
			const credentialToken = credential.credential.proof.jwt;

			// construct a message body.
			const messageBody = {
				toDid: text,
				type: messageType,
				message: credentialToken
			};

			// send message
			await fetch(STATE_SEND_MESSAGE_URL, {
				method: 'POST',
				body: JSON.stringify(messageBody),
				headers: {
					'Content-Type': 'application/json'
				}
			});
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<View style={styles.container}>
			<Text style={styles.headingTextBlack}>Hello, {item.personData.person.name.firstName}.</Text>
			
			<Text style={{marginTop: 10}}>Enter you DID address to recieve your person credential:</Text>
			<TextInput onChangeText={(text)=>{setText(text);}} style={styles.textInputFieldWide} placeholder='did:ethr:rinkeby:0x...'></TextInput>
			
			<Button onPress={issuePersonCredential} title={'Recieve person VC'}></Button>
		</View>
	);
}