import { FlatList, Text, View } from 'react-native';
import { styles } from '../../styles';
import EmploymentForm from '../../Components/employmentForm';
import React, { useState } from 'react';

export function SymfoniCreateEmploymentVCView() {

	return (
		<View style={styles.container}>
			<Text>This is where Symfoni creates their employmentVC.</Text>
			<EmploymentForm />
		</View>
	);
}