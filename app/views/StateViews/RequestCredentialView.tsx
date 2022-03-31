import React from 'react';
import { Text, View, Pressable } from 'react-native';
import { buttonStyles, styles } from '../../styles';

export default function RequestCredentialView(){

	// Pre-defined data for creating a person VC
	const person = 
		{
			credentialSubject: {
				person: {
					dateOfDeath: '2020-01-01T19:23:24Z',
					countryOfDeath: 'NO',
					placeOfDeath: 'Gjøvik',
					countryOfBirth: 'NO',
					placeOfBirth: 'Addressevegen 22',
					dateOfBirth: '2010-01-01T19:23:24Z',
					gender: 'male',
					name: {
						lastName: 'Nordmann',
						firstName: 'Ola',
						middleName: 'Amadeus'
					},
					originalName: 'Ola Amadeus Nordmann',
					maritalStatus: 'unmarried',
					citizenship: 'US',
					address: {
						countryCode: 'NO',
						city: 'gjøvik',
						zipCode: 1212,
						streetName: 'veigate',
						streetNumber: 12,
						floor: '4'
					}
	
				}
			}
		};

	// Request options for a post request. Defines the method, content type and the data in the body.
	const requestOptions = {
		method: 'POST',
		headers: { 
			Accept: 'application/json',
			'Content-Type': 'application/json'
		},
                
		body: JSON.stringify( person )
	};
    
	// createPersonVC is a post request for creating a person VC using the API.
	const createPersonVC = async () => {
		console.log({ person });  
		await fetch('http://localhost:6060/state/personCredential', requestOptions).then((data) => console.log(data));
	};

	return (
		<View style={styles.container}>
			<Pressable style={buttonStyles.createVcButtonState} onPress={createPersonVC}>
				<Text style={buttonStyles.submitButtonText}>Create Person VC</Text>
			</Pressable>
		</View>
	);
}