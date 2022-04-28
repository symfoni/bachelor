import { TextInput, View, Text, ScrollView, Pressable, Platform, Alert} from 'react-native';
import { buttonStyles, formStyles, styles } from '../styles';
import { Formik } from 'formik';
import * as yup from 'yup';
import React, { useState } from 'react';
import { CheckBox } from 'react-native-elements';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { parse, isDate } from 'date-fns';
import { SYMFONI_ADD_TERMINATION_CONTRACT_TO_DB_URL } from '../api.constants';



function parseDateString(value: string, originalValue: string) {
	const parsedDate = isDate(originalValue)
		? originalValue
		: parse(originalValue, 'yyyy-MM-dd', new Date());
  
	return parsedDate;
}

// Typeguards and error handling for the input in the form using the yup library.
const TerminationSchema = yup.object({
	socialSecurityNumber: yup.string().required('Required Field'),
	terminationNoticeReceived: yup.date().transform(parseDateString).required('Required Field'),
	terminationReason: yup.string(),
	lastDayAtWork: yup.date().transform(parseDateString).required('Required Field').typeError('Valid date required YYYY-MM-DD'),
	lastPayDay: yup.date().transform(parseDateString).required('Required Field').typeError('Valid date required YYYY-MM-DD'),
	
});

// Const for determining the os the app runs on.
// Hides the scrollbar if on android
const showScrollIndicator = Platform.OS === 'android' ? false : true;

function terminationFormDataToJSON(
	socialSecurityNumber: string, 
	terminationNoticeReceived: string, 
	terminationReason: string,
	lastDayAtWork: string, 
	lastPayday: string, 
	terminationStatus: string, 
	terminatedDuringTrialPeriod: boolean
) {
	const jsonData = {
		'id': socialSecurityNumber,
		'credentialSubject': {
			'id': 'Not set yet',
			'termination': {
				'employee': {
					'terminationNoticeReceived': terminationNoticeReceived,
					'terminationReason': terminationReason,
					'lastDayAtWork': lastDayAtWork,
					'lastPayday': lastPayday,
					'terminationStatus': terminationStatus,
					'terminatedDuringTrialPeriod': terminatedDuringTrialPeriod
				}
			}}};
	return jsonData;
}

// TerminationForm is a form component for providing the information for a termination VC.
// On successful submit takes you back to the homepage.
export default function TerminationForm({ screenName }: any) {

	// Const used for determining the state of the picker.
	const [selectedTerminationState, setSelectedTerminationState] = useState('resigned');

	// Need to use useNavigation for handling components not in the screen stack.
	const navigation = useNavigation();

	return (
	/**
		 * A form for creating an termination VC with the information about an employee.
		 * Uses the Formik library to pass the props for each field. 
		 */
		<View style={styles.container}>
			<Formik
				initialValues={{
					socialSecurityNumber: '',
					terminationNoticeReceived: '',
					terminationReason: '',
					lastDayAtWork: '',
					lastPayDay: '',
					terminatedDuringTrialPeriod: false
				}}

				validationSchema = {TerminationSchema}

				onSubmit={(values) => {
					const requestOptions = {
						method: 'POST',
						headers: { 
							Accept: 'application/json',
							'Content-Type': 'application/json'
						},
                                
						body: JSON.stringify( terminationFormDataToJSON(
							values.socialSecurityNumber, 
							values.terminationNoticeReceived, 
							values.terminationReason, 
							values.lastDayAtWork, 
							values.lastPayDay, 
							selectedTerminationState, 
							values.terminatedDuringTrialPeriod
						) )
					};

					const storeDataInDatabase = async () => {
						await fetch(SYMFONI_ADD_TERMINATION_CONTRACT_TO_DB_URL, requestOptions).then((res)=> {
							if(res.ok) {
								if(Platform.OS === 'android') {
									const createSuccessAlert = () =>
										Alert.alert(
											'Alert',
											'Termination data was successfully added.',
											[
												{
													text: 'Cancel',
													onPress: () => console.log('Cancel Pressed'),
													style: 'cancel'
												},
												{ text: 'OK', onPress: () => console.log('OK Pressed') }
											]
										);
									createSuccessAlert();
								} else {
									alert('Termination data was successfully added.');
								}
							} else {
								if(Platform.OS === 'android') {
									const createFailAlert = () =>
										Alert.alert(
											'Alert',
											'Was not able to add termination data to database. Status code: ' + res.status,
											[
												{ text: 'OK', onPress: () => console.log('OK Pressed') }
											]
										);
									createFailAlert();
								} else {
									alert('Was not able to add termination data to database. Status code: ' + res.status);
								}
								
								
								
							}
							navigation.navigate(screenName);
						});
					};

					storeDataInDatabase();
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
						
						<Text style={formStyles.textLabel}>Termination notice received</Text>
						<TextInput
							style={formStyles.textInput}
							placeholder='Received date: YYYY-MM-DD'
							onChangeText={props.handleChange('terminationNoticeReceived')}
							value={props.values.terminationNoticeReceived}
							onBlur={props.handleBlur('terminationNoticeReceived')}
						/>

						<Text>{props.touched.terminationNoticeReceived && props.errors.terminationNoticeReceived}</Text>

						<Text style={formStyles.textLabel}>Termination reason</Text>
						<TextInput
							style={formStyles.textInput}
							placeholder='Brief description'
							onChangeText={props.handleChange('terminationReason')}
							value={props.values.terminationReason}
							onBlur={props.handleBlur('terminationReason')}
						/>

						<Text>{props.touched.terminationReason && props.errors.terminationReason}</Text>

						<Text style={formStyles.textLabel}>Last day at work</Text>
						<TextInput
							style={formStyles.textInput}
							placeholder='YYYY-MM-DD'
							onChangeText={props.handleChange('lastDayAtWork')}
							value={props.values.lastDayAtWork}
							onBlur={props.handleBlur('lastDayAtWork')}
						/>

						<Text>{props.touched.lastDayAtWork && props.errors.lastDayAtWork}</Text>

						<Text style={formStyles.textLabel}>Last day at work</Text>
						<TextInput
							style={formStyles.textInput}
							placeholder='YYYY-MM-DD'
							onChangeText={props.handleChange('lastPayDay')}
							value={props.values.lastPayDay}
							onBlur={props.handleBlur('lastPayDay')}
						/>

						<Text>{props.touched.lastPayDay && props.errors.lastPayDay}</Text>

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

					</ScrollView>
				)}

			</Formik>
		</View>
	);
}