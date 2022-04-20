import { IMessage } from '@veramo/core';
import React from 'react';
import { Text, View } from 'react-native';

export function MessageDetail({item}: {item: IMessage}){
	return (
		<View style={{margin: 10}}>
			<View style={{margin: 10}}>
				<Text style={{marginVertical: 5}}>From: {item.from}</Text>
				<Text style={{marginVertical: 5}}>To: {item.to}</Text>
				<Text style={{marginVertical: 5}}>Type: {item.type}</Text>
				{item.data == null ? <></> : <Text style={{marginVertical: 5}}>Data: {JSON.stringify(item.data.messageData)}</Text>}
				<Text style={{marginVertical: 5}}>Credential count: {item.credentials?.length}</Text>
				<Text style={{marginVertical: 5}}>Presentation count: {item.presentations?.length}</Text>
			</View>		
		</View>
	);
}