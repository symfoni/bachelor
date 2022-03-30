import { useWalletConnect } from '@walletconnect/react-native-dapp';
import * as React from 'react';
import { Button, View } from 'react-native';
import { styles } from '../../styles';

export function NAVRecieveVPView() {
	const connector = useWalletConnect();
	if (!connector.connected) {
		return (
			<View style={styles.container}>
				<Button title="Connect" onPress={() => connector.connect()} />
			</View>
		);
	}
	return <Button title="Kill Session" onPress={() => connector.killSession()} />;
}