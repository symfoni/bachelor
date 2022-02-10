// Import keys generated by 'npx @veramo/cli config create-secret-key'
import { NAV_KMS_SECRET_KEY, SYMFONI_KMS_SECRET_KEY, USER_KMS_SECRET_KEY, INFURA_PROJECT_ID } from '../../keys'

// Core interfaces
import { createAgent, IDIDManager, IResolver, IDataStore, IKeyManager } from '@veramo/core'

// Core identity manager plugin
import { DIDManager } from '@veramo/did-manager'

// Ethr did identity provider
import { EthrDIDProvider } from '@veramo/did-provider-ethr'

// Web did identity provider
import { WebDIDProvider } from '@veramo/did-provider-web'

// Core key manager plugin
import { KeyManager } from '@veramo/key-manager'

// Custom key management system for RN
import { KeyManagementSystem, SecretBox } from '@veramo/kms-local'

// Custom resolvers
import { DIDResolverPlugin } from '@veramo/did-resolver'
import { Resolver } from 'did-resolver'
import { getResolver as ethrDidResolver } from 'ethr-did-resolver'
import { getResolver as webDidResolver } from 'web-did-resolver'

// Storage plugin using TypeOrm
import { Entities, KeyStore, DIDStore, IDataStoreORM, PrivateKeyStore, migrations } from '@veramo/data-store'

// TypeORM is installed with `@veramo/data-store`
import { createConnection } from 'typeorm'
import { CredentialIssuer, ICredentialIssuer } from '@veramo/credential-w3c'

// Local sqlite database for the different agents
const NAV_DATABASE_FILE: string = 'database/nav-database.sqlite'
const SYMFONI_DATABASE_FILE: string = 'database/symfoni-database.sqlite'
const USER_DATABASE_FILE: string = 'database/user-database.sqlite'

// You will need to get a project ID from infura https://www.infura.io
const INFURA_ID: string = INFURA_PROJECT_ID

const NAV_KEY: string = NAV_KMS_SECRET_KEY
const SYMFONI_KEY: string = SYMFONI_KMS_SECRET_KEY
const USER_KEY: string = USER_KMS_SECRET_KEY

// Nav database
const dbConnectionNAV = createConnection({
    type: 'sqlite',
    database: NAV_DATABASE_FILE,
    synchronize: false,
    migrations,
    migrationsRun: true,
    logging: ['error', 'info', 'warn'],
    entities: Entities,
})

// Symfoni database
const dbConnectionSymfoni = createConnection({
    type: 'sqlite',
    database: SYMFONI_DATABASE_FILE,
    synchronize: false,
    migrations,
    migrationsRun: true,
    logging: ['error', 'info', 'warn'],
    entities: Entities,
})

// User database
const dbConnectionUser = createConnection({
    type: 'sqlite',
    database: USER_DATABASE_FILE,
    synchronize: false,
    migrations,
    migrationsRun: true,
    logging: ['error', 'info', 'warn'],
    entities: Entities,
})

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
                    rpcUrl: 'https://rinkeby.infura.io/v3/' + INFURA_PROJECT_ID,
                }),
                'did:web': new WebDIDProvider({
                    defaultKms: 'local',
                }),
            },
        }),
        new DIDResolverPlugin({
            resolver: new Resolver({
                ...ethrDidResolver({ infuraProjectId: INFURA_PROJECT_ID }),
                ...webDidResolver(),
            }),
        }),
        new CredentialIssuer()
    ],
})

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
                    rpcUrl: 'https://rinkeby.infura.io/v3/' + INFURA_PROJECT_ID,
                }),
                'did:web': new WebDIDProvider({
                    defaultKms: 'local',
                }),
            },
        }),
        new DIDResolverPlugin({
            resolver: new Resolver({
                ...ethrDidResolver({ infuraProjectId: INFURA_PROJECT_ID }),
                ...webDidResolver(),
            }),
        }),
        new CredentialIssuer()
    ],
})

export const agentUser = createAgent<IDIDManager & IKeyManager & IDataStore & IDataStoreORM & IResolver>({
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
                    rpcUrl: 'https://rinkeby.infura.io/v3/' + INFURA_PROJECT_ID,
                }),
                'did:web': new WebDIDProvider({
                    defaultKms: 'local',
                }),
            },
        }),
        new DIDResolverPlugin({
            resolver: new Resolver({
                ...ethrDidResolver({ infuraProjectId: INFURA_PROJECT_ID }),
                ...webDidResolver(),
            }),
        }),
    ],
})