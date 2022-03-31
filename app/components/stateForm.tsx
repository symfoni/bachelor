import { Formik } from 'formik';
import * as yup from 'yup';
import { TextInput, View, Text, Pressable} from 'react-native';
import { buttonStyles, formStyles, styles } from '../styles';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

// Enum for validating preset Social Security Numbers.
enum SocialSecurityNumber {
	SSN_1 = '1234',
	SSN_2 = '5678',
	SSN_3 = '1337'
}

// Validation schema using the yup library.
const ValidationSchema = yup.object({
	lastName: yup.mixed<SocialSecurityNumber>().oneOf(Object.values(SocialSecurityNumber), 'Must be a valid Social Security Number').required()
	
});


/**
 * StateForm is a form component for writing in your social security number. 
 * This is just mocked data, as there is no database only an enum with approved SSN.
 * If the form validation passes it takes you to a new screen.
 * @returns 
 */
export default function StateForm({ screenName }: any) {

	// Need to use useNavigation for handeling components not in the screen stack.
	const navigation = useNavigation();

	return(
		<View style={styles.container}>
			<Formik
				initialValues={{
					lastName: ''
				}}
				validationSchema={ValidationSchema}
				onSubmit={() => { 
					navigation.navigate(screenName);
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