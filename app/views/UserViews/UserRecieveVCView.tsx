import React, {  } from 'react';
import { QRScanner } from '../../components/qrScanner';

/**
 * UserRecieveVCView is the view the user will use to recieve their VC.
 * @returns a view where the user can recieve their VC.
 */
export default function UserRecieveVCView() {
	return (
		<QRScanner />
	);
}