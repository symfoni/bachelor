import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { FlatList, View, ActivityIndicator, Text } from 'react-native';
import { USER_GET_ALL_CREDENTIALS_URL } from '../../api.constants';
import { CredentialCard } from '../../components/credentialCard';
import { IVerifiableCredentialDataStore } from '../../interfaces/IListCredentials.interface';
import { styles } from '../../styles';

/**
 * UserListVCView is a view that fetches all locally stored credentials and displays them for the user.
 * @returns a view with a list of credentials owned by the user.
 */
export default function UserListVCView({ navigation }: any): JSX.Element {
	const isFocused = useIsFocused();
	const [isLoading, setLoading] = useState<boolean>(true);
	const [data, setData] = useState<IVerifiableCredentialDataStore[]>([]);

	const getCredentials = async () => {
		try {
			const response = await fetch(USER_GET_ALL_CREDENTIALS_URL);
			if (!response.ok) {
				setData([]);
				return;
			} else {
				const json = await response.json();
				setData(json.listOfCredentials);
			}
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		isFocused && getCredentials();
	}, [isFocused]);

	return (
		<View style={styles.container}>
			<Text style={styles.headingTextBlack}>Your credentials are listed below!</Text>
			<Text>Total: {data.length}</Text>
			{isLoading ? <ActivityIndicator /> : (
				<>
					{data.length === 0 ? <Text>No credentials found</Text> : (
						<FlatList
							data={data}
							keyExtractor={({ hash }) => hash}
							// eslint-disable-next-line @typescript-eslint/no-explicit-any
							renderItem={({ item }: any) => (
								// TODO: Fix 'each child in list should have a unique key' on mobile build.
								<CredentialCard key={item.hash} item={item} navigation={navigation}></CredentialCard>
							)}
						/>
					)}
				</>
			)}
		</View>
	);
}