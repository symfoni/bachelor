import React from 'react';
import { View } from 'react-native';
import { CredentialDetail } from '../../components/credentialDetail';
import { styles } from '../../styles';

/**
 * UserVCDetailView is a view that renders the details of a selcted VC.
 * @param param0 a verifiable credential object.
 * @returns the details within the verifiable credential that was passed from the parameter.
 */
export function UserVCDetailView({route}:any) {
	const {item} = route.params;

	return (  
		<View style={styles.container}>
			<CredentialDetail item={item}></CredentialDetail>
		</View>      
	
	);
}