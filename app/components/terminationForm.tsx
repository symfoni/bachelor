import { TextInput, View, Text, ScrollView, Pressable, Button} from 'react-native';
import { buttonStyles, formStyles, styles } from '../styles';
import { Formik } from 'formik';
import * as yup from 'yup';
import React, { useState } from 'react';
import { CheckBox } from 'react-native-elements';

export default function TerminationForm() {
	return (
		<View>
			<Formik
				initialValues={{
					lastDayAtWork: '',
					lastPayDay: '',
					terminatedDuringTrialPeriod: false,
					weeklyWorkHours: ''
				}}

				onSubmit={() => {
					//Do something
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

						<Text style={formStyles.textLabel}>Last day at work</Text>
						<TextInput
							style={formStyles.textInput}
							placeholder='MM-DD-YYYY'
							onChangeText={props.handleChange('lastPayDay')}
							value={props.values.lastPayDay}
							onBlur={props.handleBlur('lastPayDay')}
						/>

						<Text style={formStyles.textLabel}>Weekly work hours</Text>
						<TextInput
							style={formStyles.textInput}
							placeholder='Weekly hours'
							onChangeText={props.handleChange('weeklyWorkHours')}
							value={props.values.weeklyWorkHours}
							onBlur={props.handleBlur('weeklyWorkHours')}
						/>

						<CheckBox
							containerStyle={formStyles.checkBoxContainer}
							checkedIcon="check-box"
							iconType="material"
							uncheckedIcon="check-box-outline-blank"
							title="Terminated during trial period"
							checked={props.values.terminatedDuringTrialPeriod}
							onPress={() => props.setFieldValue('terminatedDuringTrialPeriod', !props.values.requirementToWorkOverseas)}
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