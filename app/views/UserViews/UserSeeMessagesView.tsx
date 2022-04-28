import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { USER_GET_ALL_MESSAGES } from '../../api.constants';
import { MessageCard } from '../../components/messageCard';
import { styles } from '../../styles';

export default function UserSeeMessagesView({navigation}: any){
	const [isLoading, setLoading] = useState<boolean>(true);
	const [data, setData] = useState([]);

	const getMessages = async () => {
		try {
			const rawdata = await fetch(USER_GET_ALL_MESSAGES);
			const json = await rawdata.json();
			setData(json.messages);
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(()=>{
		getMessages();
	},[]);

	return (
		<View style={styles.container}>
			<Text style={styles.headingTextBlack}>Messages</Text>
			<Text>Total: {data.length}</Text>
			{isLoading ? <ActivityIndicator /> : (
				<>
					{data.length === 0 ? <Text>No messages found</Text> : (
						<FlatList
							data={data}
							keyExtractor={({ id }) => id}
							// eslint-disable-next-line @typescript-eslint/no-explicit-any
							renderItem={({ item }: any) => (
								<MessageCard item={item} navigation={navigation}></MessageCard>
							)}
						/>
					)}
				</>
			)}
		</View>
	);
}