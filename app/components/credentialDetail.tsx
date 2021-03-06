import React from 'react';
import { View, Text, ScrollView, SafeAreaView } from 'react-native';
import { Divider } from 'react-native-elements';
import QRCode from 'react-native-qrcode-svg';
import { 
	TYPE_BUSINESS_CREDENTIAL, 
	TYPE_EMPLOYMENT_CREDENTIAL, 
	TYPE_PERSON_CREDENTIAL, 
	TYPE_TERMINATION_CREDENTIAL 
} from '../../src/constants/verifiableCredentialConstants';
import { styles } from '../styles';

/**
 * CredentialDetail credential detail renders all the credential subject data of a verifiable credential.
 * @param param0 a verifiable credential object.
 * @returns a view with the credential subject details of a specific credential type.
 */
export function CredentialDetail({item}: any){
	if (item.verifiableCredential.type[1] === TYPE_EMPLOYMENT_CREDENTIAL) {
		return (        
			<ScrollView>
				<View style={styles.credentialDetailView}>
			
					<Text style={styles.headingTextBlack}>{item.verifiableCredential.type[1]}</Text>
					<Text style={styles.credentialDetailHeadingText}>Employee info</Text>
					<Text>Employee ID: {item.verifiableCredential.credentialSubject.employment.employee.employeeId}</Text>
					<Text>Job title: {item.verifiableCredential.credentialSubject.employment.employee.jobTitle}</Text>
					<Text>Place of work: {item.verifiableCredential.credentialSubject.employment.employee.placeOfWork}</Text>
					<Text>Hours of work: {item.verifiableCredential.credentialSubject.employment.employee.hoursOfWork}</Text>
					<Text>Start date: {item.verifiableCredential.credentialSubject.employment.employee.startDate}</Text>
					<Text>End date: {item.verifiableCredential.credentialSubject.employment.employee.endDate}</Text>
			
					<Divider style={styles.credentialDetailTextDivider}></Divider>
			
					<Text style={styles.credentialDetailHeadingText}>Employment status</Text>
					<Text>Employment type: {item.verifiableCredential.credentialSubject.employment.employee.employmentStatus.employmentType}</Text>
					<Text>Part time percentage: {item.verifiableCredential.credentialSubject.employment.employee.employmentStatus.partTimePercentage}</Text>
			
					<Divider style={styles.credentialDetailTextDivider}></Divider>
			
					<Text style={styles.credentialDetailHeadingText}>Salary</Text>
					<Text>Monthly salary: {item.verifiableCredential.credentialSubject.employment.employee.salary.monthlySalary}</Text>
					<Text>Work percentage: {item.verifiableCredential.credentialSubject.employment.employee.salary.workPercentage}</Text>
					<Text>Currency: {item.verifiableCredential.credentialSubject.employment.employee.salary.currency}</Text>
			
					<Divider style={styles.credentialDetailTextDivider}></Divider>
			
					<Text>Right for pension: {item.verifiableCredential.credentialSubject.employment.employee.rightForPension.toString()}</Text>
					<Text>Non compete claus: {item.verifiableCredential.credentialSubject.employment.employee.nonCompeteClause.toString()}</Text>
					<Text>Required to work overseas: {item.verifiableCredential.credentialSubject.employment.employee.requirementToWorkOverseas.toString()}</Text>
				</View>
				
				<View>
					<Text>Credential QRCode</Text>
					<QRCode value={item.verifiableCredential.proof.jwt} size={300}></QRCode>
				</View>
				
				
			</ScrollView>
		);
	} else if (item.verifiableCredential.type[1] === TYPE_TERMINATION_CREDENTIAL) {
		return (        
			<ScrollView>
				<View style={styles.credentialDetailView}>
					<Text style={styles.headingTextBlack}>{item.verifiableCredential.type[1]}</Text>
				
					<Text style={styles.credentialDetailHeadingText}>Employee info</Text>
					<Text>Last day at work: {item.verifiableCredential.credentialSubject.termination.employee.lastDayAtWork}</Text>
					<Text>Last payday: {item.verifiableCredential.credentialSubject.termination.employee.lastPayday}</Text>
					<Text>Termination status: {item.verifiableCredential.credentialSubject.termination.employee.terminationStatus}</Text>
					<Text>Terminated during trial period: {item.verifiableCredential.credentialSubject.termination.employee.terminatedDuringTrialPeriod.toString()}</Text>
					<Text>Weekly work hours: {item.verifiableCredential.credentialSubject.termination.employee.WeeklyWorkHours}</Text>
				
				</View>

				<View>
					<Text>Credential QRCode</Text>
					<QRCode value={item.verifiableCredential.proof.jwt} size={300}></QRCode>
				</View>
				
			</ScrollView>
		);
	} else if (item.verifiableCredential.type[1] === TYPE_PERSON_CREDENTIAL) {
		return (
			<ScrollView>
				<View style={styles.credentialDetailView}>
					<Text style={styles.headingTextBlack}>{item.verifiableCredential.type[1]}</Text>
				
					<Text style={styles.credentialDetailHeadingText}>General info</Text>
					<Text>Date of death: {item.verifiableCredential.credentialSubject.person.dateOfdDeath}</Text>
					<Text>Country of death: {item.verifiableCredential.credentialSubject.person.countryOfDeath}</Text>
					<Text>Place of death: {item.verifiableCredential.credentialSubject.person.placeOfDeath}</Text>
					<Text>Country of birth: {item.verifiableCredential.credentialSubject.person.countryOfBirth}</Text>
					<Text>Place of birth: {item.verifiableCredential.credentialSubject.person.placeOfBirth}</Text>
					<Text>Date of birth: {item.verifiableCredential.credentialSubject.person.dateOfBirth}</Text>
					<Text>Gender: {item.verifiableCredential.credentialSubject.person.gender}</Text>
					<Text>Original name: {item.verifiableCredential.credentialSubject.person.originalName}</Text>
					<Text>Marital status: {item.verifiableCredential.credentialSubject.person.maritalStatus}</Text>
					<Text>Citizenship: {item.verifiableCredential.credentialSubject.person.citizenship}</Text>
				
					<Divider style={styles.credentialDetailTextDivider}></Divider>
				
					<Text style={styles.credentialDetailHeadingText}>Name</Text>
					<Text>Last name: {item.verifiableCredential.credentialSubject.person.name.lastName}</Text>
					<Text>First name: {item.verifiableCredential.credentialSubject.person.name.firstName}</Text>
					<Text>Middle name: {item.verifiableCredential.credentialSubject.person.name.middleName}</Text>				
				
					<Divider style={styles.credentialDetailTextDivider}></Divider>
				
					<Text style={styles.credentialDetailHeadingText}>Address</Text>
					<Text>Country code: {item.verifiableCredential.credentialSubject.person.address.countryCode}</Text>
					<Text>City: {item.verifiableCredential.credentialSubject.person.address.city}</Text>
					<Text>Zip: {item.verifiableCredential.credentialSubject.person.address.zipCode}</Text>
					<Text>Street: {item.verifiableCredential.credentialSubject.person.address.streetName}</Text>
					<Text>Street number: {item.verifiableCredential.credentialSubject.person.address.streetNumber}</Text>

				
				</View>

				<View>
					<Text>Credential QRCode</Text>
					<QRCode value={item.verifiableCredential.proof.jwt} size={300}></QRCode>
				</View>
			</ScrollView>
		);
	} else if (item.verifiableCredential.type[1] === TYPE_BUSINESS_CREDENTIAL) {
		return (
			<ScrollView>
				<View style={styles.credentialDetailView}>
					<Text style={styles.headingTextBlack}>{item.verifiableCredential.type[1]}</Text>
				
					<Text style={styles.credentialDetailHeadingText}>Business info</Text>
					<Text>Name: {item.verifiableCredential.credentialSubject.business.name}</Text>
					<Text>Industrial code: {item.verifiableCredential.credentialSubject.business.industrialCode}</Text>
					<Text>Organisation structure: {item.verifiableCredential.credentialSubject.business.organisationStructure}</Text>
					<Text>Organisation number: {item.verifiableCredential.credentialSubject.business.organisationNumber}</Text>
				
					<Divider style={styles.credentialDetailTextDivider}></Divider>

					<Text style={styles.credentialDetailHeadingText}>Address</Text>
					<Text>Country code: {item.verifiableCredential.credentialSubject.business.address.countryCode}</Text>
					<Text>City: {item.verifiableCredential.credentialSubject.business.address.city}</Text>
					<Text>Zip: {item.verifiableCredential.credentialSubject.business.address.zipCode}</Text>
					<Text>Street: {item.verifiableCredential.credentialSubject.business.address.streetName}</Text>
					<Text>Street number: {item.verifiableCredential.credentialSubject.business.address.streetNumber}</Text>
				</View>
				<View>
					<Text>Credential QRCode</Text>
					<QRCode value={item.verifiableCredential.proof.jwt} size={300}></QRCode>
				</View>
			</ScrollView>
		);
	}

	return (
		<View>
			<Text>Invalid VC</Text>
		</View>
	);
	
}