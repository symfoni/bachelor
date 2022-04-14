import { IMessage } from '@veramo/core';
import React from 'react';
import { Pressable, Text } from 'react-native';
import { styles } from '../styles';

// TODO: Make navigation go to a view where you can see the full message
// should be able to delete message, add cred to database if cred available etc..
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function MessageCard({item, navigation}: {item: IMessage, navigation: any}){
	return (
		<Pressable 
			style={styles.credentialCard}
			onPress={()=> navigation.navigate('UserMessageDetail', {
				item: item
			})}
		>
			<Text style={styles.headingText}>{item.type}</Text>
		</Pressable>
	);
}