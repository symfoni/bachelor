import { VerifiableCredential } from '@veramo/core';
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { TYPE_BUSINESS_CREDENTIAL, TYPE_EMPLOYMENT_CREDENTIAL, TYPE_PERSON_CREDENTIAL, TYPE_TERMINATION_CREDENTIAL } from '../../src/constants/verifiableCredentialConstants';
import { styles } from '../styles';

/**
 * CredentialCard is a component that returns a CredentialCard based on the credential type that it is fed.
 * @param param0 takes in verifiable credential data.
 * @returns a credential card for a specific credential type.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function CredentialCard({item, navigation}: {item: VerifiableCredential, navigation: any}) {
	if (item.verifiableCredential.type[1] === TYPE_EMPLOYMENT_CREDENTIAL) {
		return (
			<TouchableOpacity style={styles.credentialCard}
				onPress={()=> navigation.navigate('UserVCDetail', {
					item: item
				})}
			>
				<Text style={styles.headingText}>{item.verifiableCredential.type[1]}</Text>
				<Text style={styles.defaultText}>Job title: {item.verifiableCredential.credentialSubject.employment.employee.jobTitle}</Text>
				<Text style={styles.defaultText}>Work place: {item.verifiableCredential.credentialSubject.employment.employee.placeofWork}</Text>
				<Text style={styles.defaultText}>Start date: {item.verifiableCredential.credentialSubject.employment.employee.startDate}</Text>
			</TouchableOpacity>
		);
	} else if (item.verifiableCredential.type[1] === TYPE_TERMINATION_CREDENTIAL) {
		return (
			<TouchableOpacity style={styles.credentialCard}
				onPress={()=> navigation.navigate('UserVCDetail', {
					item: item
				})}
			>
				<Text style={styles.headingText}>{item.verifiableCredential.type[1]}</Text>
				<Text style={styles.defaultText}>Last day at work: {item.verifiableCredential.credentialSubject.termination.employee.lastDayAtWork}</Text>
				<Text style={styles.defaultText}>Last payday: {item.verifiableCredential.credentialSubject.termination.employee.lastPayday}</Text>
				<Text style={styles.defaultText}>Termination status: {item.verifiableCredential.credentialSubject.termination.employee.terminationStatus}</Text>
			</TouchableOpacity>
		);
	} else if (item.verifiableCredential.type[1] === TYPE_PERSON_CREDENTIAL) {
		return (
			<TouchableOpacity style={styles.credentialCard}
				onPress={()=> navigation.navigate('UserVCDetail', {
					item: item
				})}
			>
				<Text style={styles.headingText}>{item.verifiableCredential.type[1]}</Text>
				<Text style={styles.defaultText}>Name: {item.verifiableCredential.credentialSubject.person.name.firstName}</Text>
				<Text style={styles.defaultText}>Date of birth: {item.verifiableCredential.credentialSubject.person.dateOfBirth}</Text>
			</TouchableOpacity>
		);
	} else if (item.verifiableCredential.type[1] === TYPE_BUSINESS_CREDENTIAL) {
		return (
			<TouchableOpacity style={styles.credentialCard}
				onPress={()=> navigation.navigate('UserVCDetail', {
					item: item
				})}
			>
				<Text style={styles.headingText}>{item.verifiableCredential.type[1]}</Text>
				<Text style={styles.defaultText}>Name: {item.verifiableCredential.credentialSubject.business.name}</Text>
				<Text style={styles.defaultText}>
					Address: {item.verifiableCredential.credentialSubject.business.address.city}, {item.verifiableCredential.credentialSubject.business.address.streetName}, {item.verifiableCredential.credentialSubject.business.address.streetNumber}
				</Text>
			</TouchableOpacity>
		);
	}
	return null;
}