import { ButtonProps, Pressable, Text } from 'react-native';
import { styles } from '../styles';


export default function NavigationButton(props: ButtonProps): JSX.Element{
	const {onPress, title} = props;
	return (
		<Pressable style={styles.navigationButton} onPress={onPress}>
			<Text style={styles.navigationButtonText}>{title}</Text>
		</Pressable>
	);
}