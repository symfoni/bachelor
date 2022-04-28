import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { TYPE_PERSON_CREDENTIAL } from '../../../src/constants/verifiableCredentialConstants';
import { SYMFONI_GET_MAIN_IDENTIFIER_URL } from '../../api.constants';
import { IMainIdentifier } from '../../interfaces/IMainIdentifier.interface';
import { styles } from '../../styles';

/**
 * SymfoniRecieveVPView represents a view where symfoni displays a QR-code with their main did address, and which VC they need to verify before issuing credentials.
 * @returns a view with a QR-code that a user can scan to send a VP with the required VCs to Symfonis main did address.
 */
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
			<Text style={styles.headingTextBlack}>Send your VP by scanning the QR-code with your wallet!</Text>
			{ isLoading ? <ActivityIndicator></ActivityIndicator> : (
				<QRCode value={JSON.stringify(QRCodeData)} size={200}></QRCode>
			)}
			<Text style={{marginTop: 10}}>Info:</Text>
			<Text style={{marginHorizontal: 200}}>
				The QR-code contains our main DID address and which VC(s) we must validate before issuing your employment contract and termination contract VC. 
				It might take a few seconds to verify your credentials, but you should receive your result in a minute.</Text>
		</View> 
	);
}