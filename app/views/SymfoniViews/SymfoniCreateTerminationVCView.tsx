
import { View } from 'react-native';
import { styles } from '../../styles';
import TerminationForm from '../../components/terminationForm';
import React from 'react';

/**
 * SymfoniCreateTerminationVCView is a view where the employer can terminate an employee and add the termination data to a database by filling out a form.
 * @returns a view with a termination contract form.
 */
export default function SymfoniCreateTerminationVCView(): JSX.Element {
	return (
		<View style={styles.container}>
			<TerminationForm screenName='SymfoniHome'/>
		</View>
	);
}