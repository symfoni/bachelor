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
		'id': 'did:ethr:rinkeby:0x0206bc2d719721519fd7e0ac58224688e1c5cc9be5cf3fc67ec4f937db9585eef6',
		'termination': {
			'employee': {
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