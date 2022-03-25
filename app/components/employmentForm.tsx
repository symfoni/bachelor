import React from 'react';
import { Button, TextInput, View } from 'react-native';
import { styles } from '../styles';
import { Formik } from 'formik';
import * as yup from 'yup';

const EmploymentSchema = yup.object({
	jobTitle: yup.string().required(),
	hoursOfWork: yup.number().required(),
	startDate: yup.date().required()
});

export default function EmploymentForm() {

	return (
    
		<View style={styles.container}>
			<Formik
				initialValues={{ jobTitle: '', hoursOfWork: '', startDate: '' }}
				validationSchema={EmploymentSchema}
				onSubmit={(values, actions) => {
					actions.resetForm();
					console.log(values);
				}}
			>
				{props => (
					<View>
						<TextInput
							style={styles.input}
							placeholder='Job title'
							onChangeText={props.handleChange('jobTitle')}
							value={props.values.jobTitle}
						/>

						<TextInput
							style={styles.input}
							multiline
							placeholder='Hours per week'
							onChangeText={props.handleChange('hoursOfWork')}
							value={props.values.hoursOfWork}
							keyboardType='numeric'
						/>

						<TextInput 
							style={styles.input}
							placeholder='01-01-2022'
							onChangeText={props.handleChange('startDate')}
							value={props.values.startDate}
							
						/>
            
						<Button color='maroon' title="Submit" onPress={props.submitForm} /> 
					</View>
				)}
			</Formik>
		</View>
    
	);
}