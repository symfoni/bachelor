import { TextInput, View, Text, ScrollView, Pressable, Button} from 'react-native';
import { buttonStyles, formStyles, styles } from '../styles';
import { Formik } from 'formik';
import * as yup from 'yup';
import React, { useState } from 'react';
import { CheckBox } from 'react-native-elements';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';

// Typeguards and error handling for the input in the form using the yup library.
const TerminationSchema = yup.object({
	socialSecurityNumber: yup.string().required('Required Field'),
	lastDayAtWork: yup.date().required('Required Field').typeError('Valid date required MM-DD-YYYY'),
	lastPayDay: yup.date().required('Required Field').typeError('Valid date required MM-DD-YYYY'),
	weeklyWorkHours: yup.number().typeError('Invalid, must be a number')
});

export default function TerminationForm({ screenName }: any) {

	const [selectedTerminationState, setSelectedTerminationState] = useState('fullTime');
	const navigation = useNavigation();

	return (
	/**
		 * A form for creating an termination VC with the information about an employee.
		 * Uses the Formik library to pass the props for each field. 
		 */
		<View>
			<Formik
				initialValues={{
					socialSecurityNumber: '',
					lastDayAtWork: '',
					lastPayDay: '',
					terminatedDuringTrialPeriod: false,
					weeklyWorkHours: ''
				}}

				validationSchema = {TerminationSchema}

				onSubmit={(actions) => {
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

						<Text style={formStyles.textLabel}>Last day at work</Text>
						<TextInput
							style={formStyles.textInput}
							placeholder='MM-DD-YYYY'
							onChangeText={props.handleChange('lastDayAtWork')}
							value={props.values.lastDayAtWork}
							onBlur={props.handleBlur('lastDayAtWork')}
						/>

						<Text>{props.touched.lastDayAtWork && props.errors.lastDayAtWork}</Text>

						<Text style={formStyles.textLabel}>Last day at work</Text>
						<TextInput
							style={formStyles.textInput}
							placeholder='MM-DD-YYYY'
							onChangeText={props.handleChange('lastPayDay')}
							value={props.values.lastPayDay}
							onBlur={props.handleBlur('lastPayDay')}
						/>

						<Text>{props.touched.lastPayDay && props.errors.lastPayDay}</Text>

						<Text style={formStyles.textLabel}>Weekly work hours</Text>
						<TextInput
							style={formStyles.textInput}
							placeholder='Weekly hours'
							onChangeText={props.handleChange('weeklyWorkHours')}
							value={props.values.weeklyWorkHours}
							onBlur={props.handleBlur('weeklyWorkHours')}
						/>

						<Text>{props.touched.weeklyWorkHours && props.errors.weeklyWorkHours}</Text>

						<CheckBox
							containerStyle={formStyles.checkBoxContainer}
							checkedIcon="check-box"
							iconType="material"
							uncheckedIcon="check-box-outline-blank"
							title="Terminated during trial period"
							checked={props.values.terminatedDuringTrialPeriod}
							onPress={() => props.setFieldValue('terminatedDuringTrialPeriod', !props.values.terminatedDuringTrialPeriod)}
						/>

						<Text style={formStyles.textLabel}>Termination status</Text>
						<Picker
							style={formStyles.picker}
							selectedValue={selectedTerminationState}
							onValueChange={(itemValue) => setSelectedTerminationState(itemValue)}
						>
							<Picker.Item label='Resigned' value='resigned'></Picker.Item>
							<Picker.Item label='Terminated' value='terminated'></Picker.Item>
						</Picker>

						<Pressable style={buttonStyles.submitButtonFormSymfoni} onPress={props.submitForm}>
							<Text style={buttonStyles.submitButtonText}>Submit</Text>
						</Pressable>

					</View>
				)}

			</Formik>
		</View>
	);
}