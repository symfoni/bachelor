import { QRScanner } from '../../components/qrScanner';

/**
 * UserCreateVPView is the view where the user makes their VP upon scanning a QR code.
 * @returns a view where the user uses their phone to scan a QR code for sending their presentation.
 */
export function UserCreateVPView() {
	return (
		<QRScanner></QRScanner>
	);
}