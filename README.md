# Bachelor

Bachelor project with NTNU and Symfoni, spring 2022.

## Installation

### Prerequisites

Make sure that you have the Node.js runtime environment with support for typescript, see [Node.js](https://nodejs.org/en/). Then install the Veramo client by typing,

```bash
npm install @veramo/cli -g
```

Lastly, make sure that you have installed the Expo client by typing,

```bash
npm install -g expo-cli
```

, and the EAS client,

```bash
npm install -g eas-cli
```

### Dependencies

Install all required dependencies by running,

```bash
npm ci
```

If this does not work you can try,

```bash
npm i
```

However, keep in mind that this updates the dependencies.

### Generate database keys and link to infura project

The local databases handled by the veramo API requires secret keys. The project also requires a link to a infura project to run. Both the keys and the infura project id must be set in a ```dotenv.env``` file, see ```dotenv-template.env``` for further guidance.

### Test

To run the tests in this project, simply run,

```bash
npm run test
```

### API

To run the api, type,

```bash
npm run dev
```

For API documentation, please refer to our [published API documentation](https://documenter.getpostman.com/view/14505624/UyrAEwgK).

### App

To run the application, use,

```bash
npm start
```

Follow the instructions given in the terminal.

### Build

To build the application for the web, run,

```bash
expo build:web
```

For android and ios, run,

```bash
eas build
```

Again, ensure that you have the respective client installed by typing either,

```bash
npm install -g expo-cli
```

or  

```bash
npm install -g eas-cli
```

### Database

The demo is dependent on a Firebase database connection. Start by creating an account on Firebase, then create a project with a Firestore database. Then go to project settings to create and download a service account key JSON document, place it in the root folder, and name it ```serviceAccountKey.json.```  Alternatively, ask one of the developers on this project for access to their Firebase project and generate a service account key from there.

### Messaging

The application uses DIDComm to send messages between agents/wallets. If you want to use this feature, you have to gas up the main did of each agent, then add a service key and service endpoints to the did document.

To gas up the DID, you have to compute its did address and fill it with gas by going to a website like
[Rinkeby Faucet](https://rinkebyfaucet.com/). After giving the did gas, you have to update the did document on the blockchain with a service key and service endpoints. We recommend using the veramo library for this.

### Verifiable registry

The demo is dependent on a verifiable registry, which for simplicity is a json file called ```verifiableRegistry.json```. It consists of key-value pair where the key is the name of the agent and the value is its main DID address. See, ```verifiableRegistry.template.json```, for further help. To gather the main DID addresses, use the APIs endpoints for fetching each agents main identifier, e.g, ```/symfoni/mainIdentifier/```.

### Starting the demo

Start the demo by opening two terminals and typing,

```bash
npm start
```

, in both terminals. Choose the web build option in one terminal, and android/IOS in the other. When the project has successfully been built to each device, open a third terminal to spin up the server by typing,

```bash
npm run dev
```

That is it.
