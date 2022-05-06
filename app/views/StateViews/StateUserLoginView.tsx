
import { buttonStyles, styles } from '../../styles';
import React from 'react';
import { TextInput, View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import { STATE_PERSON_URL } from '../../api.constants';

/**
 * StateUserLoginView is a view where a user can log into their state account with their SSN.
 * @param param0 navigatior.
 * @returns a view where the user can log into their state account using their SSN.
 */
export default function StateUserLoginView({navigation}: any): JSX.Element {
	const [text, setText] = React.useState('');
	const [invalid, setInvalid] = React.useState(false);

	// fetch person data from the database
	const getPersonData = async () => {
		try {
			const response = await fetch(STATE_PERSON_URL + text);
			const json = await response.json();
			
			if (response.ok) {
				navigation.navigate('StateUserPage', {
					item: json
				});
				return;
			}
			setInvalid(true);
		} catch (error) {
			alert('Something went wrong, please try again later.');
			console.error(error);
		}
	};

	return (
		<View style={styles.container}>
			<TextInput 
				onChangeText={text => setText(text)}
				onChange={()=>{setInvalid(false);}}
				keyboardType='numeric' 
				style={styles.textInputField} 
				placeholder='Social security number'
			>

			</TextInput>
			<Button 
				buttonStyle={buttonStyles.stateLoginButton}
				title={'Login'} 
				onPress={getPersonData}
			>

			</Button>

			{invalid ? <Text>Not a valid SSN, please try again</Text> : <></>}
		</View>
	);
}