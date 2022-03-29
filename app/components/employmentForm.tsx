import { Picker } from '@react-native-picker/picker';
import { Button, TextInput, View, Text } from 'react-native';
import { styles, symfoniColor } from '../styles';
import { Formik } from 'formik';
import * as yup from 'yup';
import React, { useState } from 'react';

// A schema for validating the form inputs using the yup library
const EmploymentSchema = yup.object({
	jobTitle: yup.string().required().min(4),
	hoursOfWork: yup.number().required(),
	startDate: yup.date().required()
});



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
				initialValues={{ jobTitle: '', placeOfWork: '', hoursOfWork: '', startDate: '', endDate: '',  employmentType: '', partTimePercentage: '', frequency: '', amount: '',
					currency: '', trialStartDate: '', trialEndDate: '', rightForPension: false, nonCompeteClause: false, requirementToWorkOversees: false, employmentStatus: ''}}
				validationSchema={EmploymentSchema}
				onSubmit={(values, actions) => {
					actions.resetForm();		
				}}
			>
				{props => (
					<View>
						<Text>Job Title</Text>
						<TextInput
							style={styles.input}
							placeholder='Job title'
							onChangeText={props.handleChange('jobTitle')}
							value={props.values.jobTitle}
							onBlur={props.handleBlur('title')}
						/>

						<Text>{props.touched.jobTitle && props.errors.jobTitle}</Text>

						
						
						
						<Text>Hours per week</Text>
						<TextInput
							style={styles.input}
							placeholder='Hours per week'
							onChangeText={props.handleChange('hoursOfWork')}
							value={props.values.hoursOfWork}
							keyboardType='numeric'
							onBlur={props.handleBlur('hoursOfWork')}
						/>

						<Text>{props.touched.hoursOfWork && props.errors.hoursOfWork}</Text>

						<Text>start Date</Text>
						<TextInput 
							style={styles.input}
							placeholder='MM-DD-YYYY'
							onChangeText={props.handleChange('startDate')}
							value={props.values.startDate}
							onBlur={props.handleBlur('startDate')}
							
						/>

						<Text>Trial period</Text>
						<TextInput 
							style={styles.input}
							placeholder='Start: MM-DD-YYYY'
							onChangeText={props.handleChange('trialStartDate')}
							value={props.values.startDate}
							onBlur={props.handleBlur('trialStartDate')}
							
						/>
						<TextInput 
							style={styles.input}
							placeholder='End: MM-DD-YYYY'
							onChangeText={props.handleChange('trialEndDate')}
							value={props.values.startDate}
							onBlur={props.handleBlur('trialEndDate')}
						/>

						<Text>Employment status</Text>
						<Picker
							selectedValue={selectedEmploymentState}
							onValueChange={(itemValue) => setSelectedEmploymentState(itemValue)}
						>
							<Picker.Item label='full time' value='full time'></Picker.Item>
							<Picker.Item label='part time' value='part time'></Picker.Item>
							<Picker.Item label='freelance' value='freelance'></Picker.Item>
						</Picker>
							
						

						<Text>{props.touched.startDate && props.errors.startDate}</Text>
            
						<Button color={symfoniColor} title="Submit" onPress={props.submitForm} /> 
					</View>
				)}
			</Formik>
		</View>
    
	);
}