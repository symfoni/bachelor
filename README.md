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

## Database
The demo is dependent on a Firebase database connection. Start by creating an account on Firebase, then create a project with a Firestore database. Then go to project settings to create and download a service account key JSON document, place it in the root folder, and name it 'serviceAccountKey.json.'  Alternatively, ask one of the developers on this project for access to their Firebase project and generate a service account key from there.