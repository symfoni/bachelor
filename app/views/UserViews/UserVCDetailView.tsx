import React from 'react';
import { View } from 'react-native';
import { CredentialDetail } from '../../components/credentialDetail';
import { styles } from '../../styles';




export function UserVCDetailView({route}:any) {
	const {item} = route.params;

	return (  
		<View style={styles.container}>
			<CredentialDetail item={item}></CredentialDetail>
		</View>      
	
	);
}