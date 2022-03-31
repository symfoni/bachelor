import { Picker } from '@react-native-picker/picker';
import { TextInput, View, Text, ScrollView, Pressable, Platform} from 'react-native';
import { buttonStyles, formStyles, styles } from '../styles';
import { Formik } from 'formik';
import * as yup from 'yup';
import React, { useState, useEffect } from 'react';
import { CheckBox } from 'react-native-elements';

// EmploymentSchema for validating the form inputs using the yup library.
const EmploymentSchema = yup.object({
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
const employmentCredentialEndpoint = Platform.OS === 'android' ? 'http://localhost:6060/symfoni/employmentCredential' : 'http://localhost:6060/symfoni/employmentCredential';

function createCredential(jobTitle: string, placeOfWork: string, hoursOfWork: string, startDate: string, endDate: string,
	partTimePercentage: string, amount: string, currency: string, trialStartDate: string, trialEndDate: string,
	rightForPension: boolean, nonCompeteClause: boolean, requirementToWorkOverseas: boolean, employmentType: string) {
	const jsonData = {
		'credentialSubject': {
			'id': 'did:ethr:rinkeby:0x0206bc2d719721519fd7e0ac58224688e1c5cc9be5cf3fc67ec4f937db9585eef6',
			'employment': {
				'employee': {
					'employeeId': '15f56',
					'jobTitle': jobTitle,
					'placeofWork': placeOfWork,
					'hoursOfWork': hoursOfWork,
					'startDate': startDate,
					'endDate': endDate,
					'employmentStatus': {
						'employmentType': 'part time',
						'partTimePercentage': partTimePercentage
					},
					'salary': {
						'frequency': 'monthly',
						'amount': amount,
						'currency': currency
					},
					'trialPeriod': {
						'startDate': trialStartDate,
						'endDate': trialEndDate
					},
					'rightForPension': rightForPension,
					'nonCompeteClause': nonCompeteClause,
					'requirementToWorkOverseas': requirementToWorkOverseas
				},
				'employerId': 'string',
				'contractPDF': {
					'URL': 'https://symfonicontracts/contract.pdf',
					'hash': '48d7771ecb7f4eca920ca46957506a17d8fea963031f8a8dddc5be40b7366961'
				}
			}
		}
	};
	return jsonData;
}



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

					const requestOptions = {
						method: 'POST',
						headers: { 
							Accept: 'application/json',
							'Content-Type': 'application/json'
						},
								
						body: JSON.stringify( createCredential(values.jobTitle, values.placeOfWork, values.hoursOfWork, values.startDate, values.endDate, values.partTimePercentage,
							values.amount, values.currency, values.trialStartDate, values.trialEndDate, values.rightForPension, values.nonCompeteClause, values.requirementToWorkOverseas, selectedEmploymentState) )
					};
					
					// createPersonVC is a post request for creating a employment VC using the API.
					const createEmploymentVC = async () => {
						await fetch(employmentCredentialEndpoint, requestOptions);
					};

					createEmploymentVC();
				}}
			>
				{props => (
					<ScrollView
					
						showsVerticalScrollIndicator={showScrollIndicator}

					>
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