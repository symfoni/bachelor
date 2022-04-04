import { describe } from 'mocha';
import assert from 'assert';
import { validateSchema } from '../src/utils/schemaValidation';

const TERMINATION_VC_SCHEMA_FILE_PATH = 'schemas/terminationSchema.json';
const BAD_TERMINATION_VC_SCHEMA_FILE_PATH = 'schemas/terminatioSchema.json';

describe('the schema validation script', ()=>{
	describe('the validateSchema function', ()=>{
		it('should return true if the object matches the schema', ()=>{
			const result = validateSchema(TERMINATION_VC_SCHEMA_FILE_PATH, goodObject);
			assert.equal(result, true);
		});
		
		it('should not return true if a value does not fit its format', ()=>{
			const result = validateSchema(TERMINATION_VC_SCHEMA_FILE_PATH, badFormObject);
			assert.notEqual(result, true);
		});
	
		it('should not return true if one of the keys are misspelled', ()=>{
			const result = validateSchema(TERMINATION_VC_SCHEMA_FILE_PATH, badKeyObject);
			assert.notEqual(result, true);
		});

		it('should throw an error if the file path does not exist', ()=>{
			const result = validateSchema(BAD_TERMINATION_VC_SCHEMA_FILE_PATH, goodObject);
			assert.equal(result, false);
		});

	});
});

const goodObject = {
	'credentialSubject': {
		'id': 'did:ethr:rinkeby:0x026e205a3fefa81f8e51cf7c284ec234fa667280740ca8e394ec608edad3680bfe',
		'termination': {
			'employee': {
				'terminationNoticeReceived': '2021-02-02',
				'terminationReason': 'Employee was browsing internet memes on company time',
				'lastDayAtWork': '2021-02-02',
				'lastPayday': '2021-02-02',
				'terminationStatus': 'resigned',
				'terminatedDuringTrialPeriod': true
			},
			'contractPDF': {
				'URL': 'https://pdfs.com/pdf0.pdf',
				'hash': '8743b52063cd84097a65d1633f5c74f5'
			}
		}
	}
};

const badFormObject = {
	'credentialSubject': {
		'id': 'did:ethr:rinkeby:0x0206bc2d719721519fd7e0ac58224688e1c5cc9be5cf3fc67ec4f937db9585eef6',
		'termination': {
			'employee': {
				'lastDayAtWork': '21-02-02',
				'lastPayday': '2021-02-02',
				'terminationStatus': 'resigned',
				'terminatedDuringTrialPeriod': true,
				'WeeklyWorkHours': 22
			},
			'contractPDF': {
				'URL': 'https://pdfs.com/pdf0.pdf',
				'hash': '8743b52063cd84097a65d1633f5c74f5'
			}
		}
	}
};

const badKeyObject = {
	'credentialSubject': {
		'id': 'did:ethr:rinkeby:0x0206bc2d719721519fd7e0ac58224688e1c5cc9be5cf3fc67ec4f937db9585eef6',
		'termination': {
			'employe': {
				'lastDayAtWork': '2021-02-02',
				'lastPayday': '2021-02-02',
				'terminationStatus': 'resigned',
				'terminatedDuringTrialPeriod': true,
				'WeeklyWorkHours': 22
			},
			'contractPDF': {
				'URL': 'https://pdfs.com/pdf0.pdf',
				'hash': '8743b52063cd84097a65d1633f5c74f5'
			}
		}
	}
};