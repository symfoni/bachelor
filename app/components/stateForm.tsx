import { Formik } from 'formik';
import * as yup from 'yup';
import { TextInput, View, Text, Pressable} from 'react-native';
import { buttonStyles, formStyles, styles } from '../styles';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

/**
 * ! NO LONGER IN USE
 */

// Enum for validating predefined Social Security Numbers.
enum SocialSecurityNumber {
	SSN_1 = '1234',
	SSN_2 = '5678',
	SSN_3 = '1337'
}

// Validation schema using the yup library.
const ValidationSchema = yup.object({
	socialSecurityNumber: yup.mixed<SocialSecurityNumber>().oneOf(Object.values(SocialSecurityNumber), 'Must be a valid Social Security Number').required()
	
});


/**
 * StateForm is a form component for writing in your social security number. 
 * This is just mocked data, as there is no database, only an enum with approved SSN.
 * If the form validation passes it takes you to a new screen.
 * @returns 
 */
export default function StateForm({ screenName }: any) {

	// Need to use useNavigation for handling components not in the screen stack.
	const navigation = useNavigation();

	return(
		<View style={styles.container}>
			<Formik
				initialValues={{
					socialSecurityNumber: ''
				}}
				validationSchema={ValidationSchema}
				onSubmit={() => { 
					navigation.navigate(screenName);
				}}
			>
				{props => (
					<View>
						<Text style={formStyles.textLabel}>Social Security Number</Text>
                    
						<TextInput
							style={formStyles.textInput}
							placeholder='Social Security Number'
							onChangeText={props.handleChange('socialSecurityNumber')}
							value={props.values.socialSecurityNumber}
							onBlur={props.handleBlur('socialSecurityNumber')} 
						/>

						<Text>{props.touched.socialSecurityNumber && props.errors.socialSecurityNumber}</Text>

						<Pressable style={buttonStyles.submitButtonFormState} onPress={props.submitForm}>
							<Text style={buttonStyles.submitButtonText}>Login</Text>
						</Pressable>
					</View>
				)}
			</Formik>
		</View>

		
	);
}