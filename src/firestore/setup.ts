// just the imports
import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

// the credential file is neccessary for the database connection
const PATH_TO_SERVICE_ACCOUNT_KEY = 'serviceAccountKey.json';

// init
initializeApp({
	credential: cert(PATH_TO_SERVICE_ACCOUNT_KEY)
});

export const db = getFirestore();