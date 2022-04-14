import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { TYPE_PERSON_CREDENTIAL } from '../../../src/constants/verifiableCredentialConstants';
import { SYMFONI_GET_MAIN_IDENTIFIER_URL } from '../../api.constants.';
import { IMainIdentifier } from '../../interfaces/IMainIdentifier.interface';
import { styles } from '../../styles';

export default function SymfoniRecieveVPView(){
	const [isLoading, setLoading] = useState<boolean>(true);
	const [mainIdentifier, setMainIdentifier] = useState<IMainIdentifier>();
	
	// TODO: Could make the credentials array dynamic, by pushing each one to an array based on input into a form.
	const QRCodeData = {
		did: mainIdentifier,
		credentials: [TYPE_PERSON_CREDENTIAL]
	};

	// Retrieves NAVs main identifier. This is important for the end user to know where they'll send their VP.
	const getMainIdentifier = async () => {
		try {
			const response = await fetch(SYMFONI_GET_MAIN_IDENTIFIER_URL);
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
			<Text style={styles.headingTextBlack}>Scan the QRCode to send a VP!</Text>
			{ isLoading ? <ActivityIndicator></ActivityIndicator> : (
				<QRCode value={JSON.stringify(QRCodeData)} size={200}></QRCode>
			)}
		</View> 
	);
}