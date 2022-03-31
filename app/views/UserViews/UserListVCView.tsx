import React, { useEffect, useState } from 'react';
import { FlatList, View, ActivityIndicator, Platform, Text } from 'react-native';
import { CredentialCard } from '../../components/credentialCard';
import { styles } from '../../styles';


// TODO: find a way to run the local HTTP from the phone itself. It should not be dependent on a computer to work.
// You have to replace the 'localhost' part in the first string with your IPV4 address.
// You can find it by typing 'ipconfig' in your command line.
const userCredentialEndpoint = Platform.OS === 'android' ? 'http://localhost:6060/user/credentials' : 'http://localhost:6060/user/credentials';

/**
 * UserListVCView is a view that fetches all locally stored credentials and displays them for the user.
 * @returns a view with a list of credentials owned by the user.
 */
export default function UserListVCView({ navigation }: any) {
	const [isLoading, setLoading] = useState(true);
	const [data, setData] = useState([]);

	const getCredentials = async () => {
		try {
			const response = await fetch(userCredentialEndpoint);
			const json = await response.json();
			setData(json.listOfCredentials);
		} catch (error) {
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
			<Text style={styles.headingTextBlack}>Here are all of your credentials!</Text>
			{isLoading ? <ActivityIndicator /> : (
				<FlatList
					data={data}
					keyExtractor={({ id }) => id}
					// eslint-disable-next-line @typescript-eslint/no-explicit-any
					renderItem={({ item }: any) => (
						// TODO: Fix 'each child in list should have a unique key' on mobile build.
						<CredentialCard key={item.hash} item={item} navigation={navigation}></CredentialCard>
					)}
				/>
			)}
		</View>
	);
}