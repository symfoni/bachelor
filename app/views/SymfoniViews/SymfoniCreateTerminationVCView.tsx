
import { Text, View } from 'react-native';
import { styles } from '../../styles';
import TerminationForm from '../../Components/terminationForm';

export function SymfoniCreateTerminationVCView() {
	return (
		<View style={styles.container}>
			<TerminationForm />
		</View>
	);
}