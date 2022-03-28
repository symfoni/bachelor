import React from 'react';
import { Button, TextInput, View, Text } from 'react-native';
import { styles } from '../styles';
import { Formik } from 'formik';
import * as yup from 'yup';

// A schema for validating the form inputs using the yup library
const EmploymentSchema = yup.object({
	jobTitle: yup.string().required().min(4),
	hoursOfWork: yup.number().required(),
	//startDate: yup.date().required()
});

// TODO: Add a way to navigate to the QR page when submitting the form
// TODO: Implement a way to pass the props to the proper endpoint

export default function EmploymentForm() {

	return (
    
		/**
		 * A form for creating an employment VC with the information about an employee.
		 * Uses the Formik library to pass the props for each field. 
		 */
		<View style={styles.container}>
			<Formik
				initialValues={{ jobTitle: '', hoursOfWork: '', startDate: '' }}
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
							placeholder='01-01-2022'
							onChangeText={props.handleChange('startDate')}
							value={props.values.startDate}
							onBlur={props.handleBlur('startDate')}
							
						/>

						<Text>{props.touched.startDate && props.errors.startDate}</Text>
            
						<Button color='maroon' title="Submit" onPress={props.submitForm} /> 
					</View>
				)}
			</Formik>
		</View>
    
	);
}