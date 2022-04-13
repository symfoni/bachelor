# bachelor
Bachelor project with NTNU and Symfoni, spring 2022.

# setup
First of all you have to initialize the project by running, ```npm ci```.

To run the demo, make sure to create a new 'dotenv.env' file, and follow the instruction given in 'dotenv-template.env'.

## test
To run the tests in this project, simply run, ```npm run test```.

## API
To run the api, type ```npm run dev```.

## App
To run the application, use ```npm start```, and follow the instructions in the terminal.

## Build
To build the application for the web, run ```expo build:web```. For android and ios, run ```eas build```. Ensure that you have the respective client installed by typing either ```npm install -g expo-cli``` or  ```npm install -g eas-cli```.

## Database
The demo is dependent on a Firebase database connection. Start by creating an account on Firebase, then create a project with a Firestore database. Then go to project settings to create and download a service account key JSON document, place it in the root folder, and name it 'serviceAccountKey.json.'  Alternatively, ask one of the developers on this project for access to their Firebase project and generate a service account key from there.

## Messaging
The application uses DIDComm to send messages between agents/wallets. If you want to use this feature, you have to gas up the main did of each agent, then add a service key and service endpoints to the did document.

To gas up the DID, you have to compute its did address and fill it with gas by going to a website like 
[Rinkeby Faucet](https://rinkebyfaucet.com/). After giving the did gas, you have to update the did document on the blockchain with a service key and service endpoints. We recommend using the veramo library for this. 