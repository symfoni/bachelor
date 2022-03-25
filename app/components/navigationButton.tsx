import { GestureResponderEvent, Pressable, StyleProp, Text, ViewStyle } from 'react-native';
import { buttonStyles } from '../styles';

/**
 * The interface for the navigation button props.
 */
interface INavigationButtonProps {
    onPress: (event: GestureResponderEvent) => void
    title: string
    customStyle?: StyleProp<ViewStyle>
}

/**
 * NavigationButton is a customizable navigation button component.
 * @param props consists of an onPress function, a title, and a custom stylesheet.
 * @returns a navigation button component.
 */
export default function NavigationButton(props: INavigationButtonProps): JSX.Element{
	const {onPress, title, customStyle = buttonStyles.navigationButtonDefault} = props;
	return (
		<Pressable style={customStyle} onPress={onPress}>
			<Text style={buttonStyles.navigationButtonText}>{title}</Text>
		</Pressable>
	);
}