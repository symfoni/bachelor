import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Alert } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { styles } from '../../styles';

// QR codes have type 256.
const QR_TYPE = 256;

/**
 * UserCreateVPView is the view where the user makes their VP upon scanning a QR code.
 * @returns a view where the user uses their phone to scan a QR code for sending their presentation.
 */
export function UserCreateVPView({navigation}: any) {
	const [hasPermission, setHasPermission] = useState<boolean>(false);
	const [scanned, setScanned] = useState<boolean>(false);

	useEffect(() => {
		(async () => {
			const { status } = await BarCodeScanner.requestPermissionsAsync();
			setHasPermission(status === 'granted');
		})();
	}, []);

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const handleBarCodeScanned = ({ type, data }: any) => {
		if (type === QR_TYPE) {
			try {
				const dataJSON = JSON.parse(data);
				setScanned(true);
				return Alert.alert(
					'Presentation request', 
					'A presentation request has been detected',
					[
						{text: 'OK', onPress: () => navigation.navigate('UserSendVP', {dataJSON})}
					]
				);
				
			} catch (error) {
				// TODO: Fix error on timeout.
				setScanned(true);
				alert('Not a valid request');
			}
		}
	};

	if (hasPermission === null) {
		return <Text>Requesting for camera permission</Text>;
	}
	if (hasPermission === false) {
		return <Text>No access to camera</Text>;
	}

	return (
		<View style={styles.container}>
			<BarCodeScanner
				onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
				style={StyleSheet.absoluteFillObject}
			/>
			{scanned && <Button title={'Tap here to scan again!'} onPress={() => setScanned(false)} />}
		</View>
	);
}