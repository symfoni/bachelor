import React from 'react';
import { Button, TextInput, View, Label, Text } from 'react-native';
import { styles } from '../styles';
import { Formik } from 'formik';
import * as yup from 'yup';

const EmploymentSchema = yup.object({
	jobTitle: yup.string().required().min(4),
	hoursOfWork: yup.number().required(),
	//startDate: yup.date().required()
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

						<Text>{props.touched.jobTitle && props.errors.jobTitle}</Text>
						
						<TextInput
							style={styles.input}
							placeholder='Hours per week'
							onChangeText={props.handleChange('hoursOfWork')}
							value={props.values.hoursOfWork}
							keyboardType='numeric'
						/>

						<Text>{props.touched.hoursOfWork && props.errors.hoursOfWork}</Text>

						<TextInput 
							style={styles.input}
							placeholder='01-01-2022'
							onChangeText={props.handleChange('startDate')}
							value={props.values.startDate}
							
						/>

						<Text>{props.touched.startDate && props.errors.startDate}</Text>
            
						<Button color='maroon' title="Submit" onPress={props.submitForm} /> 
					</View>
				)}
			</Formik>
		</View>
    
	);
}