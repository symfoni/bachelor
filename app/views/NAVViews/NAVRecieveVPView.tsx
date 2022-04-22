import React from 'react';
import QRCode from 'react-native-qrcode-svg';
import { ActivityIndicator, Text, View } from 'react-native';
import { styles } from '../../styles';
import { useEffect, useState } from 'react';
import { TYPE_EMPLOYMENT_CREDENTIAL, TYPE_PERSON_CREDENTIAL, TYPE_TERMINATION_CREDENTIAL } from '../../../src/constants/verifiableCredentialConstants';
import { NAV_GET_MAIN_IDENTIFIER_URL } from '../../api.constants.';
import { IMainIdentifier } from '../../interfaces/IMainIdentifier.interface';

/**
 * NAVRecieveVPView is responsible for presenting a QR-code with the neccessary information needed
 * to send a VP to NAV.
 * @returns a view containing a QR-code with navs address and the required VCs for unemployment benefits.
 */
export function NAVRecieveVPView() {
	const [isLoading, setLoading] = useState<boolean>(true);
	const [mainIdentifier, setMainIdentifier] = useState<IMainIdentifier>();
	
	// TODO: Could make the credentials array dynamic, by pushing each one to an array based on input into a form.
	const QRCodeData = {
		did: mainIdentifier,
		credentials: [TYPE_PERSON_CREDENTIAL, TYPE_EMPLOYMENT_CREDENTIAL, TYPE_TERMINATION_CREDENTIAL]
	};

	// Retrieves NAVs main identifier. This is important for the end user to know where they'll send their VP.
	const getMainIdentifier = async () => {
		try {
			const response = await fetch(NAV_GET_MAIN_IDENTIFIER_URL);
			const json = await response.json();
			setMainIdentifier(json.mainIdentifier.did);
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		getMainIdentifier();
	}, []);

	return (
		<View style={styles.container}>
			<Text style={styles.headingTextBlack}>Send your VP by scanning the QR-code with your wallet!</Text>
			{ isLoading ? <ActivityIndicator></ActivityIndicator> : (
				<QRCode value={JSON.stringify(QRCodeData)} size={200}></QRCode>
			)}
			<Text style={{marginTop: 10}}>Info:</Text>
			<Text style={{marginHorizontal: 200}}>
			The QR-code contains our main DID address and which VC(s) we must validate to determine if you qualify for unemployment benefits. 
			It might take a few seconds to verify your credentials, but you should receive your result in a minute.</Text>
		</View> 
	);
}