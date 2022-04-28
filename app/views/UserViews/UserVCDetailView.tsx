import React from 'react';
import { Alert, Button, View } from 'react-native';
import { USER_CREDENTIAL_URL } from '../../api.constants';
import { CredentialDetail } from '../../components/credentialDetail';
import { styles } from '../../styles';

/**
 * UserVCDetailView is a view that renders the details of a selcted VC.
 * @param param0 a verifiable credential object.
 * @returns the details within the verifiable credential that was passed from the parameter.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function UserVCDetailView({route, navigation}:any) {
	const {item} = route.params;

	// deletes a credential
	const deleteCredential = async () => {
		//
		await fetch(USER_CREDENTIAL_URL + '/' + `${item.hash}`, {
			method: 'DELETE'
		});
		navigation.navigate('UserListVCs');
		return Alert.alert('Deleted', 'The credential was deleted');
	};

	// displays an alert before you actually delete the credential
	const deleteAlert = () => {
		return (
			Alert.alert('Delete', 'Are you sure you want to delete this credential?', [
				{
					text: 'cancel',
					onPress: () => {return;}
				},
				{
					text: 'delete',
					onPress: deleteCredential
				}
			])
		);
	};

	return (  
		<View style={styles.container}>
			<CredentialDetail item={item}></CredentialDetail>	
			<View style={{margin: 10}}>
				<Button title='Delete' onPress={deleteAlert}></Button>
			</View>
		</View>  
	);
}