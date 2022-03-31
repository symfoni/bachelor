
import { styles } from '../../styles';
import React, { useEffect, useState } from 'react';
import stateForm from '../../Components/stateForm';
import { Text, FlatList, View, ActivityIndicator, Platform } from 'react-native';
import StateForm from '../../Components/stateForm';
//import { Button } from 'react-native-elements/dist/buttons/Button';

export function StateCreatePersonVCView() {
	
	return (
		<View style={styles.container}>
			<StateForm screenName='RequestCredential'/>
		</View>
	);
}