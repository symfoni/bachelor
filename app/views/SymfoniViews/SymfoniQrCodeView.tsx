import { Text, View } from 'react-native';
import { styles } from '../../styles';

export function SymfoniQrCodeView() {
	return (
		<View style={styles.container}>
			<Text>This is where Symfoni creates the QR code.</Text>
		</View>
	);
}