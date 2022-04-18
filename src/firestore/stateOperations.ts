import { db } from './setup';

const PERSON_DATA_COLLECTION = 'person-data';

/**
 * dbAddPersonData adds person data to the database.
 * @param id the id of the document.
 * @param personData the data of the person.
 * @returns an error if it was unsuccessful in adding data to the database.
 */
export async function dbAddPersonData(id: string, personData: object): Promise<void | Error> {
	try {
		const docRef = db.collection(PERSON_DATA_COLLECTION).doc(id);
		await docRef.set(personData);
	} catch (error) {
		console.error('database insertion failed', error);
		return new Error('database insertion failed');
	}
}

/**
 * dbGetPersonData retrieves person data from the database based on the document id.
 * @param id the id of the document you want to retrieve.
 * @returns the document data.
 */
export async function dbGetPersonData(id: string): Promise<FirebaseFirestore.DocumentData | Error | undefined> {
	try {
		const docRef = db.collection(PERSON_DATA_COLLECTION).doc(id);
		const doc = await docRef.get();
		if (!doc.exists) {
			console.log('No such document!');
		} else {
			return doc.data();
		}
	} catch (error) {
		console.error('unable to retrieve document from database', error);
		return new Error('unable to retrieve document from database');
	}
}

/**
 * dbDeletePersonData deletes person data from the database.
 * @param id the id of the document that you want to delete.
 * @returns the document that was deleted.
 */
export async function dbDeletePersonData(id:string): Promise<void | Error | FirebaseFirestore.DocumentData> {
	try {
		const docRef = db.collection(PERSON_DATA_COLLECTION).doc(id);
		docRef.delete();
		return (await docRef.get()).data();
	} catch (error) {
		console.error('unable to retrieve document from database', error);
		return new Error('unable to retrieve document from database');
	}
}