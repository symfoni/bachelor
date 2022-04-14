import assert from 'assert';
import { describe, it } from 'mocha';
import { IVCMessageData } from '../src/interfaces/messages.interface';
import { issuers, verifyIssuer, verifySchema } from '../src/utils/verifyPresentation';


describe('verifyPresentation utility script', async () => {
	describe('the verify schema function',  async () => {
		it('should return true if the schema matches the credential subject data', async ()=>{
			const result = await verifySchema(credentialMessage);
			assert.equal(result, true);
		});

		it('should not return true if the schema does not match the credential subject data', async ()=>{
			const result = await verifySchema(badCredentialMessage);
			assert.notEqual(result, true);
		});
	});

	describe('the verify issuer function', async ()=>{
		it('should return true if the expected issuer is in the verifiable data registry', async () => {
			const result = await verifyIssuer(credentialMessage, issuers.symfoni);
			assert.equal(result, true);
		});

		it('should not return true if the expected issuer is not in the verifiable data registry', async () => {
			const result = await verifyIssuer(badCredentialMessage, issuers.symfoni);
			assert.equal(result, false);
		});
	});
});

/**
 * Mocked credential message.
 */
const credentialMessage: IVCMessageData = {
	'vc': {
		'@context': ['https://www.w3.org/2018/credentials/v1', 'https://raw.githubusercontent.com/symfoni/bachelor/dev/schemas/terminationSchema.json'],
		'credentialSubject': {
			'termination': {
				'employee': {
					'lastDayAtWork': '2021-02-02',
					'lastPayday': '2021-02-02',
					'terminationStatus': 'resigned',
					'terminatedDuringTrialPeriod': true,
					'WeeklyWorkHours': 22,
					'terminationNoticeReceived': '2021-02-02'
				},
				'contractPDF': {
					'URL': 'https://pdfs.com/pdf0.pdf',
					'hash': '8743b52063cd84097a65d1633f5c74f5'
				}

			},
			'id': 'did:ethr:rinkeby:0x0206bc2d719721519fd7e0ac58224688e1c5cc9be5cf3fc67ec4f937db9585eef6'
		},
		'type': [
			'VerifiableCredential',
			'TerminationVC'
		]
	},
	'iss': 'did:ethr:rinkeby:0x0300cd0dfa9f0b5764743f13f21871262f3850647e8e0f013bc10f1a4003615e6a',
	'nbf': 123456,
	'sub': '456745674567'
};

/**
 * An example how it should not look like,
 * the issuer is not in the registry and the credential subject data does not match the schema.
 */
const badCredentialMessage: IVCMessageData = {
	'vc': {
		'@context': ['https://www.w3.org/2018/credentials/v1', 'https://raw.githubusercontent.com/symfoni/bachelor/dev/schemas/terminationSchema.json'],
		'credentialSubject': {
			'termination': {
				'employee': {
					'lastDayAtWork': '2021-02-02'
				},
				'contractPDF': {
					'URL': 'https://pdfs.com/pdf0.pdf',
					'hash': '8743b52063cd84097a65d1633f5c74f5'
				}

			},
			'id': 'did:ethr:rinkeby:0x0206bc2d719721519fd7e0ac58224688e1c5cc9be5cf3fc67ec4f937db9585eef6'
		},
		'type': [
			'VerifiableCredential',
			'TerminationVC'
		]
	},
	'iss': 'did:ethr:rinkeby:0x0300cd0dfa9f0b5764743f13f21871262f3380457e8e0f013bc10f1a4003615e6a',
	'nbf': 123456,
	'sub': '456745674567'
};
