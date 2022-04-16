import React from 'react';
import { Text, View } from 'react-native';
import { styles } from '../../styles';

/**
 * StateUserPageView a dynamic page for a user that logs into their state account.
 * @param param0 person data passed from the login page.
 * @returns a view with a custom user page at the state site.
 */
export default function StateUserPageView({route}: any) {
	const {item} = route.params;

	return (
		<View style={styles.container}>
			<Text>Hello, {item.personData.person.name.firstName}</Text>
		</View>
	);
}