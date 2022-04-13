export interface IMainIdentifier {
    did: string
    controllerKeyId: string
    provider: string
    services: Service[]
    keys: Key[]
    alias: string
  }
  
export interface Service {
    id: string
    type: string
    serviceEndpoint: string
    description: string
  }
  
export interface Key {
    kid: string
    type: string
    kms: string
    publicKeyHex: string
    meta: Meta
  }
  
export interface Meta {
    algorithms: string[]
  }