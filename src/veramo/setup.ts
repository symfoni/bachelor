// Secret environmental variables
import dotenv from 'dotenv';
dotenv.config({ path: 'dotenv.env' });

// Core interfaces
import { createAgent, IDIDManager, IResolver, IDataStore, IKeyManager } from '@veramo/core';

// Core identity manager plugin
import { DIDManager } from '@veramo/did-manager';

// Ethr did identity provider
import { EthrDIDProvider } from '@veramo/did-provider-ethr';

// Web did identity provider
import { WebDIDProvider } from '@veramo/did-provider-web';

// Core key manager plugin
import { KeyManager } from '@veramo/key-manager';

// Custom key management system for RN
import { KeyManagementSystem, SecretBox } from '@veramo/kms-local';

// Custom resolvers
import { DIDResolverPlugin } from '@veramo/did-resolver';
import { Resolver } from 'did-resolver';
import { getResolver as ethrDidResolver } from 'ethr-did-resolver';
import { getResolver as webDidResolver } from 'web-did-resolver';

// Storage plugin using TypeOrm
import { Entities, KeyStore, DIDStore, IDataStoreORM, PrivateKeyStore, migrations, DataStore, DataStoreORM } from '@veramo/data-store';

// Message handlers for validating JWT-tokens
import { MessageHandler } from '@veramo/message-handler';
import { JwtMessageHandler } from '@veramo/did-jwt';

// TypeORM is installed with `@veramo/data-store`
import { createConnection } from 'typeorm';
import { CredentialIssuer, ICredentialIssuer, W3cMessageHandler } from '@veramo/credential-w3c';
// Local sqlite database for the different agents
const NAV_DATABASE_FILE = './database/nav-database.sqlite';
const SYMFONI_DATABASE_FILE = './database/symfoni-database.sqlite';
const USER_DATABASE_FILE = './database/user-database.sqlite';
const STATE_DATABASE_FILE = './database/state-database.sqlite';
const TEST_DATABASE_FILE = './database/test-database.sqlite';

// See 'dotenv-template.env' for information about this variable.
// TODO: Find a less hacky way to store infura ID as string
const INFURA_ID: string = process.env.INFURA_PROJECT_ID ?? 'no valid id';

// See 'dotenv-template.env' for information about these variables.
// TODO: Find a less hacky way to store the keys as string
const NAV_KEY: string = process.env.NAV_KMS_SECRET_KEY ?? 'no valid key';
const SYMFONI_KEY: string = process.env.SYMFONI_KMS_SECRET_KEY ?? 'no valid key';
const USER_KEY: string = process.env.USER_KMS_SECRET_KEY ?? 'no valid key';
const STATE_KEY: string = process.env.STATE_KMS_SECRET_KEY ?? 'no valid key';
const TEST_KEY: string = process.env.TEST_KMS_SECRET_KEY ?? 'no valid key';

// Nav database
const dbConnectionNAV = createConnection({
	type: 'sqlite',
	database: NAV_DATABASE_FILE,
	synchronize: false,
	migrations,
	migrationsRun: true,
	logging: ['error', 'info', 'warn'],
	entities: Entities,
});

// Symfoni database
const dbConnectionSymfoni = createConnection({
	type: 'sqlite',
	database: SYMFONI_DATABASE_FILE,
	synchronize: false,
	migrations,
	migrationsRun: true,
	logging: ['error', 'info', 'warn'],
	entities: Entities,
});

// User database
const dbConnectionUser = createConnection({
	type: 'sqlite',
	database: USER_DATABASE_FILE,
	synchronize: false,
	migrations,
	migrationsRun: true,
	logging: ['error', 'info', 'warn'],
	entities: Entities,
});

// User database
const dbConnectionState = createConnection({
	type: 'sqlite',
	database: STATE_DATABASE_FILE,
	synchronize: false,
	migrations,
	migrationsRun: true,
	logging: ['error', 'info', 'warn'],
	entities: Entities,
});

// Test database
export const dbConnectionTest = createConnection({
	type: 'sqlite',
	database: TEST_DATABASE_FILE,
	synchronize: false,
	migrations,
	migrationsRun: true,
	logging: ['error', 'info', 'warn'],
	entities: Entities,
});

export const agentNAV = createAgent<IDIDManager & IKeyManager & IDataStore & IDataStoreORM & IResolver & ICredentialIssuer>({
	plugins: [
		new KeyManager({
			store: new KeyStore(dbConnectionNAV),
			kms: {
				local: new KeyManagementSystem(new PrivateKeyStore(dbConnectionNAV, new SecretBox(NAV_KEY))),
			},
		}),
		new DIDManager({
			store: new DIDStore(dbConnectionNAV),
			defaultProvider: 'did:ethr:rinkeby',
			providers: {
				'did:ethr:rinkeby': new EthrDIDProvider({
					defaultKms: 'local',
					network: 'rinkeby',
					rpcUrl: 'https://rinkeby.infura.io/v3/' + INFURA_ID,
				}),
				'did:web': new WebDIDProvider({
					defaultKms: 'local',
				}),
			},
		}),
		new DIDResolverPlugin({
			resolver: new Resolver({
				...ethrDidResolver({ infuraProjectId: INFURA_ID }),
				...webDidResolver(),
			}),
		}),
		new CredentialIssuer(),
		new MessageHandler({
			messageHandlers: [new JwtMessageHandler(), new W3cMessageHandler()],
		}),
		new DataStore(dbConnectionNAV),
		new DataStoreORM(dbConnectionNAV)
	],
});

export const agentSymfoni = createAgent<IDIDManager & IKeyManager & IDataStore & IDataStoreORM & IResolver & ICredentialIssuer>({
	plugins: [
		new KeyManager({
			store: new KeyStore(dbConnectionSymfoni),
			kms: {
				local: new KeyManagementSystem(new PrivateKeyStore(dbConnectionSymfoni, new SecretBox(SYMFONI_KEY))),
			},
		}),
		new DIDManager({
			store: new DIDStore(dbConnectionSymfoni),
			defaultProvider: 'did:ethr:rinkeby',
			providers: {
				'did:ethr:rinkeby': new EthrDIDProvider({
					defaultKms: 'local',
					network: 'rinkeby',
					rpcUrl: 'https://rinkeby.infura.io/v3/' + INFURA_ID,
				}),
				'did:web': new WebDIDProvider({
					defaultKms: 'local',
				}),
			},
		}),
		new DIDResolverPlugin({
			resolver: new Resolver({
				...ethrDidResolver({ infuraProjectId: INFURA_ID }),
				...webDidResolver(),
			}),
		}),
		new CredentialIssuer(),
		new MessageHandler({
			messageHandlers: [new JwtMessageHandler(), new W3cMessageHandler()],
		}),
		new DataStore(dbConnectionSymfoni),
		new DataStoreORM(dbConnectionSymfoni)
	],
});

export const agentUser = createAgent<IDIDManager & IKeyManager & IDataStore & IDataStoreORM & IResolver & ICredentialIssuer>({
	plugins: [
		new KeyManager({
			store: new KeyStore(dbConnectionUser),
			kms: {
				local: new KeyManagementSystem(new PrivateKeyStore(dbConnectionUser, new SecretBox(USER_KEY))),
			},
		}),
		new DIDManager({
			store: new DIDStore(dbConnectionUser),
			defaultProvider: 'did:ethr:rinkeby',
			providers: {
				'did:ethr:rinkeby': new EthrDIDProvider({
					defaultKms: 'local',
					network: 'rinkeby',
					rpcUrl: 'https://rinkeby.infura.io/v3/' + INFURA_ID,
				}),
				'did:web': new WebDIDProvider({
					defaultKms: 'local',
				}),
			},
		}),
		new DIDResolverPlugin({
			resolver: new Resolver({
				...ethrDidResolver({ infuraProjectId: INFURA_ID }),
				...webDidResolver(),
			}),
		}),
		new CredentialIssuer(),
		new MessageHandler({
			messageHandlers: [new JwtMessageHandler(), new W3cMessageHandler()],
		}),
		new DataStore(dbConnectionUser),
		new DataStoreORM(dbConnectionUser)
	],
});

export const agentState = createAgent<IDIDManager & IKeyManager & IDataStore & IDataStoreORM & IResolver & ICredentialIssuer>({
	plugins: [
		new KeyManager({
			store: new KeyStore(dbConnectionState),
			kms: {
				local: new KeyManagementSystem(new PrivateKeyStore(dbConnectionState, new SecretBox(STATE_KEY))),
			},
		}),
		new DIDManager({
			store: new DIDStore(dbConnectionState),
			defaultProvider: 'did:ethr:rinkeby',
			providers: {
				'did:ethr:rinkeby': new EthrDIDProvider({
					defaultKms: 'local',
					network: 'rinkeby',
					rpcUrl: 'https://rinkeby.infura.io/v3/' + INFURA_ID,
				}),
				'did:web': new WebDIDProvider({
					defaultKms: 'local',
				}),
			},
		}),
		new DIDResolverPlugin({
			resolver: new Resolver({
				...ethrDidResolver({ infuraProjectId: INFURA_ID }),
				...webDidResolver(),
			}),
		}),
		new CredentialIssuer(),
		new MessageHandler({
			messageHandlers: [new JwtMessageHandler(), new W3cMessageHandler()],
		}),
		new DataStore(dbConnectionState),
		new DataStoreORM(dbConnectionState)
	],
});

export const agentTest = createAgent<IDIDManager & IKeyManager & IDataStore & IDataStoreORM & IResolver & ICredentialIssuer>({
	plugins: [
		new KeyManager({
			store: new KeyStore(dbConnectionTest),
			kms: {
				local: new KeyManagementSystem(new PrivateKeyStore(dbConnectionTest, new SecretBox(TEST_KEY))),
			},
		}),
		new DIDManager({
			store: new DIDStore(dbConnectionTest),
			defaultProvider: 'did:ethr:rinkeby',
			providers: {
				'did:ethr:rinkeby': new EthrDIDProvider({
					defaultKms: 'local',
					network: 'rinkeby',
					rpcUrl: 'https://rinkeby.infura.io/v3/' + INFURA_ID,
				}),
				'did:web': new WebDIDProvider({
					defaultKms: 'local',
				}),
			},
		}),
		new DIDResolverPlugin({
			resolver: new Resolver({
				...ethrDidResolver({ infuraProjectId: INFURA_ID }),
				...webDidResolver(),
			}),
		}),
		new CredentialIssuer(),
		new MessageHandler({
			messageHandlers: [new JwtMessageHandler(), new W3cMessageHandler()],
		}),
		new DataStore(dbConnectionTest),
		new DataStoreORM(dbConnectionTest)
	],
});