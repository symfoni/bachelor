import QRCode from 'react-native-qrcode-svg';
import { Text, View } from 'react-native';
import { styles } from '../../styles';
import { useEffect, useState } from 'react';
import { TYPE_EMPLOYMENT_CREDENTIAL, TYPE_PERSON_CREDENTIAL, TYPE_TERMINATION_CREDENTIAL } from '../../../src/constants/verifiableCredentialConstants';

const GET_MAIN_IDENTIFIER_URL = 'http://localhost:6060/nav/mainIdentifier';

export function NAVRecieveVPView() {
	const [mainIdentifier, setMainIdentifier] = useState([]);
	// TODO: Could make the credentials array dynamic, by pushing each one to an array based on input into a form.
	const QRCodeData = {
		did: mainIdentifier,
		credentials: [TYPE_PERSON_CREDENTIAL, TYPE_EMPLOYMENT_CREDENTIAL, TYPE_TERMINATION_CREDENTIAL]
	};

	// Retrieves NAVs main identifier
	const getMainIdentifier = async () => {
		try {
			const response = await fetch(GET_MAIN_IDENTIFIER_URL);
			const json = await response.json();
			setMainIdentifier(json.mainIdentifier.did);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		getMainIdentifier();
	}, []);

	return (
		<View style={styles.container}>
			<Text style={styles.headingTextBlack}>Send your VP by scanning this QR-code!</Text>
			<QRCode value={JSON.stringify(QRCodeData)} size={200}></QRCode>
		</View>
	);
}