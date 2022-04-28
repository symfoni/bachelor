// just the imports
import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

/**
 * Path to the JSON file that contains the credentials used to access the FireStore database.
 */
const PATH_TO_SERVICE_ACCOUNT_KEY = 'serviceAccountKey.json';

// init
initializeApp({
	credential: cert(PATH_TO_SERVICE_ACCOUNT_KEY)
});

/**
 * dbFireStore is the FireStore database.
 */
export const dbFireStore = getFirestore();