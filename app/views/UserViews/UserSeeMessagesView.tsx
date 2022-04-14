import React from 'react';
import { View, Text } from 'react-native';
import { styles } from '../../styles';

export default function UserSeeMessagesView(){
	return (
		<View style={styles.container}>
			<Text style={styles.headingTextBlack}>Messages</Text>
		</View>
	);
}