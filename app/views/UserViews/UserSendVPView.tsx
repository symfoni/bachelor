import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, FlatList, Alert, Pressable } from 'react-native';
import { USER_CREATE_PRESENTATION_URL, USER_GET_CREDENTIAL_ON_TYPE_URL, USER_SEND_MESSAGE_URL } from '../../api.constants.';
import { CredentialCard } from '../../components/credentialCard';
import { IVerifiableCredentialDataStore } from '../../interfaces/IListCredentials.interface';
import { buttonStyles, styles } from '../../styles';

export default function UserSendVPView({route, navigation}: any) {
	const [isLoading, setLoading] = useState<boolean>(true);
	const [listOfCredentials, setListOfCredentials] = useState<IVerifiableCredentialDataStore[]>([]);

	// the data recieved from scanning the QR code
	const {dataJSON} = route.params;

	const credentials: string[] = dataJSON.credentials;

	// creates a VP based on the credentials in listOfCredentials, and sends the jwt token of this presentation
	// to the did that requested the VCs
	const sendPresentation = async () => {
		try {
			// create presentation
			const presentationResult = await fetch(USER_CREATE_PRESENTATION_URL, {
				method: 'POST',
				body: JSON.stringify({listOfCredentials: listOfCredentials}),
				headers: {
					'Content-Type': 'application/json'
				}
			});
			const jsonPresentation = await presentationResult.json();

			// get presentation token
			const presentationToken: string = jsonPresentation.presentation.proof.jwt;
			const toDid: string = dataJSON.did;
			const type = 'Presentation';
    
			// send message with presentation token
			await fetch(USER_SEND_MESSAGE_URL, {
				method: 'POST',
				body: JSON.stringify({
					'toDid': toDid,
					'type': type,
					'message': presentationToken
				}),
				headers: {
					'Content-Type': 'application/json'
				}
			});

			return Alert.alert('Success', 'Successfully sent the VP');	
		} catch (error) {
			console.error(error);
			alert('something went wrong, try again later');
		}
	};
    

	// retrieves all the credentials requested by nav for the user to see.
	const getVerifiableCredentials = async () => {
		try {
			// loop through each credential in the credentials array and fetch each from the wallet.
			for (let index = 0; index < credentials.length; index++) {
				// get credential
				const result = await fetch(USER_GET_CREDENTIAL_ON_TYPE_URL + credentials[index]);
				const json = await result.json();
                
				const credentialData = await json.listOfCredentials[0];

				// adds to list
				setListOfCredentials(listOfCredentials => [...listOfCredentials, credentialData]);                
			}
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		getVerifiableCredentials();
	}, []);

	return(
        
		<View style={styles.container}>
            
			<Text style={styles.headingTextBlack}>You have recieved a VP request!</Text>
			{isLoading ? <ActivityIndicator /> : (
				<>
					<Text style={styles.headingTextBlack}>These VCs are requested</Text>
					<FlatList
						data={listOfCredentials}
						keyExtractor={({ hash }) => hash}
						// eslint-disable-next-line @typescript-eslint/no-explicit-any
						renderItem={({ item }: any) => (
						// TODO: Fix 'each child in list should have a unique key' on mobile build.
							<CredentialCard key={item.hash} item={item} navigation={navigation}></CredentialCard>
						)}
					/>
					<Pressable style={buttonStyles.submitButtonFormSymfoni} onPress={sendPresentation}>
						<Text style={buttonStyles.submitButtonText}>Send</Text>
					</Pressable>
				</>
			)
			}
		</View>
	);
}