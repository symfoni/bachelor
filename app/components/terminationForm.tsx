import { TextInput, View, Text, ScrollView, Pressable, Button} from 'react-native';
import { buttonStyles, formStyles, styles } from '../styles';
import { Formik } from 'formik';
import * as yup from 'yup';
import React, { useState } from 'react';
import { CheckBox } from 'react-native-elements';
import { Picker } from '@react-native-picker/picker';

const TerminationSchema = yup.object({
	lastDayAtWork: yup.date().required('Required Field').typeError('Valid date required MM-DD-YYYY'),
	lastPayDay: yup.date().required('Required Field').typeError('Valid date required MM-DD-YYYY'),
	weeklyWorkHours: yup.number().typeError('Invalid, must be a number')
});

export default function TerminationForm() {

	const [selectedTermintionState, setSelectedTerminationState] = useState('fullTime');

	return (
		<View>
			<Formik
				initialValues={{
					lastDayAtWork: '',
					lastPayDay: '',
					terminatedDuringTrialPeriod: false,
					weeklyWorkHours: ''
				}}

				validationSchema = {TerminationSchema}

				onSubmit={(actions) => {
					// Do something
				}}
			>

				{props => (
					<View>
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
							selectedValue={selectedTermintionState}
							onValueChange={(itemValue) => setSelectedTerminationState(itemValue)}
						>
							<Picker.Item label='full time' value='full time'></Picker.Item>
							<Picker.Item label='part time' value='part time'></Picker.Item>
							<Picker.Item label='freelance' value='freelance'></Picker.Item>
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