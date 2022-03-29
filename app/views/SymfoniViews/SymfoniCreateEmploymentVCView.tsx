import { Text, View } from 'react-native';
import { styles } from '../../styles';
import EmploymentForm from '../../Components/employmentForm';

export function SymfoniCreateEmploymentVCView() {

	return (
		<View style={styles.container}>
			<EmploymentForm />
		</View>
	);
}