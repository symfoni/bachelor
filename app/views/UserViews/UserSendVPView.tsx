import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, FlatList, Alert, Pressable } from 'react-native';
import { USER_CREATE_PRESENTATION_URL, USER_GET_CREDENTIAL_ON_TYPE_URL, USER_SEND_MESSAGE_URL } from '../../api.constants';
import { CredentialCard } from '../../components/credentialCard';
import { IVerifiableCredentialDataStore } from '../../interfaces/IListCredentials.interface';
import { buttonStyles, styles } from '../../styles';
import verifiableRegistry from '../../../verifiableRegistry.json';
import { IVerifiableRegistry } from '../../interfaces/IVerifiableRegistry';

/**
 * UserSendVPView is the view where the user decides whether they want to send their VP or not.
 * It displays the name of the holder of the DID that is requesting the VP, and which VCs that will be sent.
 * @param param0 the route param consists of the DID address that requested the VP and which VCs that was requested.
 * @returns returns a view with a title, which DID that is requesting the VCs, a list of VCs that are requested, and a send button.
 */
export default function UserSendVPView({route, navigation}: any): JSX.Element {
	const [isLoading, setLoading] = useState<boolean>(true);
	const [issuer, setIssuer] = useState<string>('unknown');
	const [isVerifiedIssuer, setIsVerifiedIssuer] = useState<boolean>(false);
	const [listOfCredentials, setListOfCredentials] = useState<IVerifiableCredentialDataStore[]>([]);

	// the data recieved from scanning the QR code
	const {dataJSON} = route.params;

	const credentials: string[] = dataJSON.credentials;

	// check for verified issuer
	const checkForVerifiedIssuer = ()=>{
		for (const key in verifiableRegistry) {
			if (verifiableRegistry[key as keyof IVerifiableRegistry] === dataJSON.did) {
				setIssuer(key);
				setIsVerifiedIssuer(true);
			}
		}
		return;
	};
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
		checkForVerifiedIssuer();
	}, []);

	return(
        
		<View style={styles.container}>
            
			<Text style={styles.headingTextBlack}>You have recieved a VP request!</Text>
			{isVerifiedIssuer ? <Text style={{color: 'green'}}>Verified DID: {issuer}</Text> : <Text style={{color: 'red'}}>DID: {issuer}</Text>}
			{isLoading ? <ActivityIndicator /> : (
				<>
					<Text style={{color: 'black', marginTop: 15, fontSize: 14}}>VC(s) requested: </Text>
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