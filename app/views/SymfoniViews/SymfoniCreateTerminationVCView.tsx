
import { Text, View } from 'react-native';
import { styles } from '../../styles';
import TerminationForm from '../../components/terminationForm';

export function SymfoniCreateTerminationVCView() {
	return (
		<View style={styles.container}>
			<TerminationForm screenName='SymfoniHome'/>
		</View>
	);
}