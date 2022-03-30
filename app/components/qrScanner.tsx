import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { styles } from '../styles';

// QR codes have type 256.
const QR_TYPE = 256;

/**
 * QRScanner is a component for scanning QR codes.
 * @returns a QR code scanner.
 */
export function QRScanner() {
	const [hasPermission, setHasPermission] = useState(null);
	const [scanned, setScanned] = useState(false);

	useEffect(() => {
		(async () => {
			const { status } = await BarCodeScanner.requestPermissionsAsync();
			setHasPermission(status === 'granted');
		})();
	}, []);

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const handleBarCodeScanned = ({ type, data }: any) => {
		if (type === QR_TYPE) {
			setScanned(true);
			alert(`Scanned type: ${type}, with data: ${data}, successfully!`);
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