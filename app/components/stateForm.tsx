import { Formik } from 'formik';
import * as yup from 'yup';
import { TextInput, View, Text, ScrollView, Pressable} from 'react-native';
import { buttonStyles, formStyles, styles } from '../styles';
import personDetails from '../personDetails.json';
import { ProfileDiscoveryProvider } from '@veramo/data-store';
//import person from '../mockData.ts'

enum SocialSecurityNumber {
	SSN_1 = '1234',
	SSN_2 = '5678',
	SSN_3 = '1337'
}

const ValidationSchema = yup.object({
	lastName: yup.mixed<SocialSecurityNumber>().oneOf(Object.values(SocialSecurityNumber), 'Must be a valid Social Security Number').required()
	
});



export default function StateForm() {

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

	const requestOptions = {
		method: 'POST',
		headers: { 
			Accept: 'application/json',
			'Content-Type': 'application/json'
		},
			
		body: JSON.stringify( person )
	};

	const createPersonVC = async () => {
		console.log({ person });  
		await fetch('http://localhost:6060/state/personCredential', requestOptions).then((data) => console.log(data));
	};

	return(
		<View style={styles.container}>
			<Formik
				initialValues={{
					lastName: ''
				}}
				validationSchema={ValidationSchema}
				onSubmit={() => { 
					createPersonVC();
				}}
			>
				{props => (
					<View>
						<Text style={formStyles.textLabel}>Last Name</Text>
                    
						<TextInput
							style={formStyles.textInput}
							placeholder='Last Name'
							onChangeText={props.handleChange('lastName')}
							value={props.values.lastName}
							onBlur={props.handleBlur('lastName')} 
						/>

						<Text>{props.touched.lastName && props.errors.lastName}</Text>

						<Pressable style={buttonStyles.submitButtonFormSymfoni} onPress={props.submitForm}>
							<Text style={buttonStyles.submitButtonText}>Submit</Text>
						</Pressable>
					</View>
				)}
			</Formik>
		</View>
	);
}