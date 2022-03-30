import { Formik } from 'formik';
import * as yup from 'yup';
import { TextInput, View, Text, ScrollView, Pressable} from 'react-native';
import { buttonStyles, formStyles, styles } from '../styles';
import personDetails from '../personDetails.json';



export default function StateForm() {

	const credentialData = personDetails.credentialSubject; 

	const approvedName = 'Nordmann';

	const requestOptions = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ credentialSubject: credentialData })
	};

	const createPersonVC = async () => {
		console.log({ credentialSubject: credentialData });
        
		await fetch('http://localhost:6060/state/personCredential', requestOptions).then((data) => console.log(data));
	};


	return(
		<View style={styles.container}>
			<Formik
				initialValues={{
					lastName: ''
				}}
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

						<Pressable style={buttonStyles.submitButtonFormSymfoni} onPress={props.submitForm}>
							<Text style={buttonStyles.submitButtonText}>Submit</Text>
						</Pressable>
					</View>
				)}
			</Formik>
		</View>
	);
}