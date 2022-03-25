import React, { useEffect, useState } from 'react';
import { FlatList, Text, View, ActivityIndicator, Platform } from 'react-native';
import { styles } from '../../styles';


// TODO: find out why the endpoint doesn't work on mobile
const userCredentialEndpoint = Platform.OS === 'android' ? 'http://10.0.2.2:6060/user/credentials' : 'http://localhost:6060/user/credentials';



export default function UserListVCView() {
	const [isLoading, setLoading] = useState(true);
	const [data, setData] = useState([]);

	const getCredentials = async () => {
		try {
			const response = await fetch(userCredentialEndpoint);
			const json = await response.json();
        
			setData(json.listOfCredentials);
		} catch (error) {
			console.log('hello');
            
			console.error(error);
            
		} finally {
			setLoading(false);
		}
    
	};
	

	useEffect(() => {
		getCredentials();
	}, []);

	return (
		<View style={styles.container}>
			{isLoading ? <ActivityIndicator/> : (
				<FlatList
					data={data}
					keyExtractor={({ id }) => id}
					renderItem={({ item }: any ) => (
						<View style={styles.credentialCard}>
							<Text style={styles.defaultText}>{item.verifiableCredential.type.at(1)}</Text>
						</View>
					)}
				/>
			)}
		</View>
	);
}