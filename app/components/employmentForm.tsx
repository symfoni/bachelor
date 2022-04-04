import { Picker } from '@react-native-picker/picker';
import { TextInput, View, Text, ScrollView, Pressable, Platform } from 'react-native';
import { buttonStyles, formStyles, styles } from '../styles';
import { Formik } from 'formik';
import * as yup from 'yup';
import React, { useState } from 'react';
import { CheckBox } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

// TODO: Fix date validation
// EmploymentSchema for validating the form inputs using the yup library.
const EmploymentSchema = yup.object({
	socialSecurityNumber: yup.string().required(),
	jobTitle: yup.string().required('Required Field'),
	placeOfWork: yup.string().required('Required Field'),
	hoursOfWork: yup.number().required('Required Field').typeError('Invalid, must be a number'),
	startDate: yup.date().required('Required Field').typeError('Valid date required MM-DD-YYYY'),
	employerTerminationNotice: yup.number().required('Required Field').typeError('Invalid, must be a number'),
	employeeTerminationNotice: yup.number().required('Required Field').typeError('Invalid, must be a number'),
	temporaryContractEndDate: yup.date().typeError('Valid date required MM-DD-YYYY'),
	workPercentage: yup.number().required('Required Field').typeError('Invalid, must be a number'),
	monthlySalary: yup.number().required('Required Field').typeError('Invalid, must be a number'),
	currency: yup.string().required('Required Field'),
	trialStartDate: yup.date().typeError('Valid date required MM-DD-YYYY'),
	trialEndDate: yup.date().typeError('Valid date required MM-DD-YYYY'),
	trialPeriodTerminationNotice: yup.number().required('Required Field').typeError('Invalid, must be a number')
});

// Const for determining the os the app runs on.
// Hides the scrollbar if on android
const showScrollIndicator = Platform.OS === 'android' ? false : true;


// TODO: Implement a way to pass the props to the proper endpoint

// TerminationForm is a form component for providing the information for a termination VC.
// On successful submit takes you back to the homepage.
export default function EmploymentForm({ screenName }: any) {

	// Const used for determining the state of the picker.
	const [selectedEmploymentState, setSelectedEmploymentState] = useState('fullTime');

	// Need to use useNavigation for handling components not in the screen stack.
	const navigation = useNavigation();

	return (

		/**
		 * A form for creating an employment VC with the information about an employee.
		 * Uses the Formik library to pass the props for each field. 
		 */
		<View style={styles.container}>
			<Formik
				initialValues={{
					socialSecurityNumber: '',
					jobTitle: '',
					placeOfWork: '',
					hoursOfWork: '',
					startDate: '',
					employerTerminationNotice: '',
					employeeTerminationNotice: '',
					temporaryContractEndDate: '',
					workPercentage: '',
					monthlySalary: '',
					currency: '',
					trialStartDate: '',
					trialEndDate: '',
					trialPeriodTerminationNotice: '',
					rightForPension: false,
					nonCompeteClause: false,
					requirementToWorkOverseas: false
				}}

				validationSchema={EmploymentSchema}
				onSubmit={(values, actions) => {
					actions.resetForm();
					navigation.navigate(screenName);
				}}
			>
				{props => (
					<ScrollView

						showsVerticalScrollIndicator={showScrollIndicator}
					>

						<Text style={formStyles.textLabel}>Social Security Number</Text>
						<TextInput
							style={formStyles.textInput}
							placeholder='Social Security Number'
							onChangeText={props.handleChange('socialSecurityNumber')}
							value={props.values.socialSecurityNumber}
							onBlur={props.handleBlur('socialSecurityNumber')}
						/>

						<Text>{props.touched.socialSecurityNumber && props.errors.socialSecurityNumber}</Text>

						<Text style={formStyles.textLabel}>Job Title</Text>
						<TextInput
							style={formStyles.textInput}
							placeholder='Job title'
							onChangeText={props.handleChange('jobTitle')}
							value={props.values.jobTitle}
							onBlur={props.handleBlur('title')}
						/>

						<Text>{props.touched.jobTitle && props.errors.jobTitle}</Text>

						<Text style={formStyles.textLabel}>Place of Work</Text>
						<TextInput
							style={formStyles.textInput}
							placeholder='Place of Work'
							onChangeText={props.handleChange('placeOfWork')}
							value={props.values.placeOfWork}
							onBlur={props.handleBlur('placeOfWork')}
						/>

						<Text>{props.touched.placeOfWork && props.errors.placeOfWork}</Text>

						<Text style={formStyles.textLabel}>Hours per week</Text>
						<TextInput
							style={formStyles.textInput}
							placeholder='Hours per week'
							onChangeText={props.handleChange('hoursOfWork')}
							value={props.values.hoursOfWork}
							keyboardType='numeric'
							onBlur={props.handleBlur('hoursOfWork')}
						/>

						<Text>{props.touched.hoursOfWork && props.errors.hoursOfWork}</Text>

						<Text style={formStyles.textLabel}>Contract start Date</Text>
						<TextInput
							style={formStyles.textInput}
							placeholder='MM-DD-YYYY'
							onChangeText={props.handleChange('startDate')}
							value={props.values.startDate}
							onBlur={props.handleBlur('startDate')}
						/>

						<Text>{props.touched.startDate && props.errors.startDate}</Text>

						<Text style={formStyles.textLabel}>Employer Termination notice</Text>
						<TextInput
							style={formStyles.textInput}
							placeholder='Termination notice in days'
							onChangeText={props.handleChange('employerTerminationNotice')}
							value={props.values.employerTerminationNotice}
							onBlur={props.handleBlur('employerTerminationNotice')}
						/>

						<Text>{props.touched.employerTerminationNotice && props.errors.employerTerminationNotice}</Text>

						<Text style={formStyles.textLabel}>Employee Termination notice</Text>
						<TextInput
							style={formStyles.textInput}
							placeholder='Resignation notice in days'
							onChangeText={props.handleChange('employeeTerminationNotice')}
							value={props.values.employeeTerminationNotice}
							onBlur={props.handleBlur('employeeTerminationNotice')}
						/>

						<Text>{props.touched.employeeTerminationNotice && props.errors.employeeTerminationNotice}</Text>

						<Text style={formStyles.textLabel}>Employment status</Text>
						<Picker
							style={formStyles.picker}
							selectedValue={selectedEmploymentState}
							onValueChange={(itemValue) => setSelectedEmploymentState(itemValue)}
						>
							<Picker.Item label='Full time employee' value='full time employee'></Picker.Item>
							<Picker.Item label='Temporary employee' value='temporary employee'></Picker.Item>
						</Picker>

						<Text style={formStyles.textLabel}>Temp contract end date</Text>
						<TextInput
							style={formStyles.textInput}
							placeholder='MM-DD-YYYY'
							onChangeText={props.handleChange('temporaryContractEndDate')}
							value={props.values.temporaryContractEndDate}
							onBlur={props.handleBlur('temporaryContractEndDate')}
						/>

						<Text>{props.touched.temporaryContractEndDate && props.errors.temporaryContractEndDate}</Text>

						<Text style={formStyles.textLabel}>Work percentage</Text>
						<TextInput
							style={formStyles.textInput}
							placeholder='100'
							onChangeText={props.handleChange('workPercentage')}
							value={props.values.workPercentage}
							onBlur={props.handleBlur('workPercentage')}
						/>

						<Text>{props.touched.workPercentage && props.errors.workPercentage}</Text>

						<Text style={formStyles.textLabel}>Monthly salary</Text>
						<TextInput
							style={formStyles.textInput}
							placeholder='Monthly salary'
							onChangeText={props.handleChange('monthlySalary')}
							value={props.values.monthlySalary}
							onBlur={props.handleBlur('monthlySalary')}
						/>

						<Text>{props.touched.monthlySalary && props.errors.monthlySalary}</Text>

						<Text style={formStyles.textLabel}>Currency</Text>
						<TextInput
							style={formStyles.textInput}
							placeholder='Currency'
							onChangeText={props.handleChange('currency')}
							value={props.values.currency}
							onBlur={props.handleBlur('currency')}
						/>

						<Text>{props.touched.currency && props.errors.currency}</Text>

						<Text style={formStyles.textLabel}>Trial period</Text>
						<TextInput
							style={formStyles.textInput}
							placeholder='Start: MM-DD-YYYY'
							onChangeText={props.handleChange('trialStartDate')}
							value={props.values.trialStartDate}
							onBlur={props.handleBlur('trialStartDate')}
						/>

						<Text>{props.touched.trialStartDate && props.errors.trialStartDate}</Text>

						<TextInput
							style={formStyles.textInput}
							placeholder='End: MM-DD-YYYY'
							onChangeText={props.handleChange('trialEndDate')}
							value={props.values.trialEndDate}
							onBlur={props.handleBlur('trialEndDate')}
						/>

						<Text>{props.touched.trialEndDate && props.errors.trialEndDate}</Text>

						<Text style={formStyles.textLabel}>Trial period termination notice</Text>
						<TextInput
							style={formStyles.textInput}
							placeholder='In days'
							onChangeText={props.handleChange('trialPeriodTerminationNotice')}
							value={props.values.trialPeriodTerminationNotice}
							onBlur={props.handleBlur('trialPeriodTerminationNotice')}
						/>

						<Text>{props.touched.trialPeriodTerminationNotice && props.errors.trialPeriodTerminationNotice}</Text>

						<Text style={formStyles.textLabel}>Special clauses</Text>

						<CheckBox
							containerStyle={formStyles.checkBoxContainer}
							checkedIcon="check-box"
							iconType="material"
							uncheckedIcon="check-box-outline-blank"
							title="Right for pension"
							checked={props.values.rightForPension}
							onPress={() => props.setFieldValue('rightForPension', !props.values.rightForPension)}
						/>

						<CheckBox
							containerStyle={formStyles.checkBoxContainer}
							checkedIcon="check-box"
							iconType="material"
							uncheckedIcon="check-box-outline-blank"
							title="Non-compete Clause"
							checked={props.values.nonCompeteClause}
							onPress={() => props.setFieldValue('nonCompeteClause', !props.values.nonCompeteClause)}
						/>

						<CheckBox
							containerStyle={formStyles.checkBoxContainer}
							checkedIcon="check-box"
							iconType="material"
							uncheckedIcon="check-box-outline-blank"
							title="Requirement to work overseas"
							checked={props.values.requirementToWorkOverseas}
							onPress={() => props.setFieldValue('requirementToWorkOverseas', !props.values.requirementToWorkOverseas)}
						/>

						<Pressable style={buttonStyles.submitButtonFormSymfoni} onPress={props.submitForm}>
							<Text style={buttonStyles.submitButtonText}>Submit</Text>
						</Pressable>

					</ScrollView>
				)}
			</Formik>
		</View>

	);
}