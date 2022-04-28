import { View } from 'react-native';
import { styles } from '../../styles';
import EmploymentForm from '../../components/employmentForm';
import React from 'react';

/**
 * SymfoniCreateEmploymentVCView is a view where the employer can add a new employee to their database by filling out a form.
 * @returns a view with an employment contract form.
 */
export default function SymfoniCreateEmploymentVCView(): JSX.Element {
	return (
		<View style={styles.container}>
			<EmploymentForm screenName='SymfoniHome'/>
		</View>
	);
}