import { Text, View } from 'react-native';
import { styles } from '../../styles';
import EmploymentForm from '../../components/employmentForm';

export function SymfoniCreateEmploymentVCView() {

	return (
		<View style={styles.container}>
			<EmploymentForm screenName='SymfoniHome'/>
		</View>
	);
}