import { employmentVC } from '../types/employmentVCType';
import { terminationVC } from '../types/terminationVCType';
import { db } from './setup';

// the name of the employment contract collection in the database
const EMPLOYMENT_COLLECTION = 'employment-contracts';

// the name of the termination contract collection in the database
const TERMINATION_COLLECTION = 'termination-contracts';

/**
 * dbAddEmploymentContract takes an id and data related to an employment contract, and stores it in a database.
 * @param id this will be the id of the document.
 * @param employmentData this will be the data inside the document.
 * @returns an error if the database insertion failed.
 */
export async function dbAddEmploymentContract(id: string, employmentData: object): Promise<void | Error> {
	try {
		const docRef = db.collection(EMPLOYMENT_COLLECTION).doc(id);
		await docRef.set(employmentData);
	} catch (error) {
		console.error('database insertion failed', error);
		return new Error('database insertion failed');
	}  
}

/**
 * dbAddTerminationContract takes an id and data related to a termination contract, and stores it in a database.
 * @param id this will be the id of the document.
 * @param terminationData this will be the data inside the document.
 * @returns an error if the database insertion failed.
 */
export async function dbAddTerminationContract(id: string, terminationData: object): Promise<void | Error> {
	try {
		const docRef = db.collection(TERMINATION_COLLECTION).doc(id);
		await docRef.set(terminationData);
	} catch (error) {
		console.error('database insertion failed', error);
		return new Error('database insertion failed');
	}
}

/**
 * dbGetEmploymentContract retrieves the employment contract document data related to the id parameter.
 * @param id the id of the document you want to retrieve.
 * @returns the document data.
 */
export async function dbGetEmploymentContract(id:string): Promise<FirebaseFirestore.DocumentData | Error | undefined> {
	try {
		const employmentContractRef = db.collection(EMPLOYMENT_COLLECTION).doc(id);
		const doc = await employmentContractRef.get();
		if (!doc.exists) {
			console.log('No such document!');
		} else {
			console.log('Document data:', doc.data());
			return doc.data();
		}
	} catch (error) {
		console.error();
		return new Error('unable to retrieve document from database');
	}
}

/**
 * dbGetTerminationContract retrieves the termination contract document data related to the id parameter.
 * @param id the id of the document you want to retrieve.
 * @returns the document data.
 */
export async function dbGetTerminationContract(id:string): Promise<FirebaseFirestore.DocumentData | Error | undefined> {
	try {
		const terminationContractRef = db.collection(TERMINATION_COLLECTION).doc(id);
		const doc = await terminationContractRef.get();
		if (!doc.exists) {
			console.log('No such document!');
		} else {
			console.log('Document data:', doc.data());
			return doc.data();
		}
	} catch (error) {
		console.error();
		return new Error('unable to retrieve document from database');
	}
}