import { Picker } from '@react-native-picker/picker';
import { TextInput, View, Text, ScrollView, Pressable, Platform} from 'react-native';
import { buttonStyles, formStyles, styles } from '../styles';
import { Formik } from 'formik';
import * as yup from 'yup';
import React, { useState } from 'react';
import { CheckBox } from 'react-native-elements';

// EmploymentSchema for validating the form inputs using the yup library.
const EmploymentSchema = yup.object({
	socialSecurityNumber: yup.string().required(),
	jobTitle: yup.string().required('Required Field'),
	placeOfWork: yup.string().required('Required Field'),
	hoursOfWork: yup.number().required('Required Field').typeError('Invalid, must be a number'),
	startDate: yup.date().required('Required Field').typeError('Valid date required MM-DD-YYYY'),
	endDate: yup.date().typeError('Valid date required MM-DD-YYYY'),
	partTimePercentage: yup.number().typeError('Invalid, must be a number'),
	amount: yup.number().required('Required Field').typeError('Invalid, must be a number'),
	currency: yup.string().required('Required Field'),
	trialStartDate: yup.date().typeError('Valid date required MM-DD-YYYY'),
	trialEndDate: yup.date().typeError('Valid date required MM-DD-YYYY'),
});

const showScrollIndicator = Platform.OS === 'android' ? false : true;

// TODO: Add a way to navigate to the QR page when submitting the form
// TODO: Implement a way to pass the props to the proper endpoint

export default function EmploymentForm() {

	const [selectedEmploymentState, setSelectedEmploymentState] = useState('fullTime');

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
					endDate: '', 
					partTimePercentage: '', 
					amount: '',
					currency: '', 
					trialStartDate: '', 
					trialEndDate: '', 
					rightForPension: false, 
					nonCompeteClause: false, 
					requirementToWorkOverseas: false
				}}

				validationSchema={EmploymentSchema}
				onSubmit={(values, actions) => {
					actions.resetForm();		
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

						<Text style={formStyles.textLabel}>Contract end Date</Text>
						<TextInput 
							style={formStyles.textInput}
							placeholder='MM-DD-YYYY'
							onChangeText={props.handleChange('endDate')}
							value={props.values.endDate}
							onBlur={props.handleBlur('endDate')}
						/>

						<Text>{props.touched.endDate && props.errors.endDate}</Text>

						<Text style={formStyles.textLabel}>Employment status</Text>
						<Picker
							style={formStyles.picker}
							selectedValue={selectedEmploymentState}
							onValueChange={(itemValue) => setSelectedEmploymentState(itemValue)}
						>
							<Picker.Item label='full time' value='full time'></Picker.Item>
							<Picker.Item label='part time' value='part time'></Picker.Item>
							<Picker.Item label='freelance' value='freelance'></Picker.Item>
						</Picker>

						<Text style={formStyles.textLabel}>Part time percentage</Text>
						<TextInput 
							style={formStyles.textInput}
							placeholder='Part time percentage'
							onChangeText={props.handleChange('partTimePercentage')}
							value={props.values.partTimePercentage}
							onBlur={props.handleBlur('partTimePercentage')}
						/>

						<Text>{props.touched.partTimePercentage && props.errors.partTimePercentage}</Text>

						<Text style={formStyles.textLabel}>Salary</Text>
						<TextInput 
							style={formStyles.textInput}
							placeholder='Amount'
							onChangeText={props.handleChange('amount')}
							value={props.values.amount}
							onBlur={props.handleBlur('amount')}
						/>

						<Text>{props.touched.amount && props.errors.amount}</Text>

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