import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, FlatList, Alert, Pressable, Platform } from 'react-native';
import { CredentialCard } from '../../components/credentialCard';
import { buttonStyles, styles } from '../../styles';

// TODO: Find a better way to change localhost to IPV4
const GET_CREDENTIAL_ON_TYPE_URL = Platform.OS === 'android' ? 'http://localhost:6060/user/credential/' : 'http://localhost:6060/user/credential/';
const CREATE_PRESENTATION_URL = Platform.OS === 'android' ? 'http://localhost:6060/user/presentation' : 'http://localhost:6060/user/presentation';
const USER_SEND_MESSAGE_URL = Platform.OS === 'android' ? 'http://localhost:6060/user/sendMessage' : 'http://localhost:6060/user/sendMessage';

export default function UserSendVPView({route, navigation}: any) {
	const [isLoading, setLoading] = useState<boolean>(true);
	const [listOfCredentials, setListOfCredentials] = useState<any[]>([]);

	// the data recieved from scanning the QR code
	const {dataJSON} = route.params;

	const credentials: string[] = dataJSON.credentials;

	// creates a VP based on the credentials in listOfCredentials, and sends the jwt token of this presentation
	// to the did that requested the VCs
	const sendPresentation = async () => {
		try {
			// create presentation
			const presentationResult = await fetch(CREATE_PRESENTATION_URL, {
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
				const result = await fetch(GET_CREDENTIAL_ON_TYPE_URL + credentials[index]);
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
						keyExtractor={({ id }) => id}
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