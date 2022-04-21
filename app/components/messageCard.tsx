import { IMessage } from '@veramo/core';
import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { styles } from '../styles';
import verifiableRegistry from '../../verifiableRegistry.json';
import { IVerifiableRegistry } from '../interfaces/IVerifiableRegistry';

// should be able to delete message, add cred to database if cred available etc..
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function MessageCard({item, navigation}: {item: IMessage, navigation: any}){
	const [verifiedIssuer, setVerifiedIssuer] = useState<string>('unknown');

	// check if the did that sent the message is a verified issuer.
	const checkForVerifiedIssuer = ()=>{
		for (const key in verifiableRegistry) {
			if (verifiableRegistry[key as keyof IVerifiableRegistry] === item.from) {
				setVerifiedIssuer(key);
			}
		}
		return;
	};

	useEffect(()=>{
		checkForVerifiedIssuer();
	},[]);

	return (
		<TouchableOpacity 
			style={styles.credentialCard}
			onPress={()=> navigation.navigate('UserMessageDetail', {
				item: item
			})}
		>
			<Text style={styles.headingText}>Subject: {item.type}</Text>
			<Text style={styles.defaultText}>From: {verifiedIssuer}</Text>
		</TouchableOpacity>
	);
}