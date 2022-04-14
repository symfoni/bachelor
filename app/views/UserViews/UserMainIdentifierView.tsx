import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { USER_GET_MAIN_IDENTIFIER } from '../../api.constants.';
import { IMainIdentifier } from '../../interfaces/IMainIdentifier.interface';
import { styles } from '../../styles';
  
/**
 * UserMainIdentifierView is a view that shows the users main identifier as a QRCode and in plain text.
 * @returns a view with the users main identifier on display.
 */
export default function UserMainIdentifierView() {
	const [isLoading, setLoading] = useState(true);
	const [mainIdentifier, setMainIdentifier] = useState<IMainIdentifier>();

	const getMainIdentifier = async () => {
		try {
			const result = await fetch(USER_GET_MAIN_IDENTIFIER);
			const jsonResult = await result.json();

			setMainIdentifier(jsonResult.mainIdentifier);
		} catch (error) {
			console.error(error);   
		} finally {
			setLoading(false);
		}
	};

	useEffect(()=>{
		getMainIdentifier();
	},[]);

	return (
		<View style={styles.container}>
			<Text style={styles.headingTextBlack}>This is your did address!</Text>
			{isLoading ? <ActivityIndicator></ActivityIndicator> : (
				<>
					{typeof mainIdentifier === 'undefined' ? <Text>Something went wrong</Text> : (
						<>
							<QRCode value={mainIdentifier.did} size={200}></QRCode>
							<Text>In plain text:</Text><Text style={{ marginHorizontal: 50 }}>{mainIdentifier.did}</Text>
						</>
					)}
				</>
			)}
		</View>
	);
}