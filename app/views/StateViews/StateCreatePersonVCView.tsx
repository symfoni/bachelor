
import { styles } from '../../styles';
import React from 'react';
import { View } from 'react-native';
import StateForm from '../../Components/stateForm';

// A screen with the state form. Takes you to the next page if the form is validated.
export function StateCreatePersonVCView() {
	
	return (
		<View style={styles.container}>
			<StateForm screenName='RequestCredential'/>
		</View>
	);
}