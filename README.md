# bachelor
Bachelor project with NTNU and Symfoni, spring 2022.

# setup
First of all you have to initialize the project by running, ```npm ci```.

To run the demo, make sure to create a new keys.ts (this will be changed to a dotenv.env file later) script and declare 3 constansts, 'NAV_KMS_SECRET_KEY', 'SYMFONI_KMS_SECRET_KEY', and 'USER_KMS_SECRET_KEY', then generate 3 different keys for the script by running the command, '``` npx @veramo/cli config create-secret-key ```', in the terminal. Then assign these 3 keys to the constants created. 

In the "keys.ts" script you also need to declare a constant 'INFURA_PROJECT_ID'. To get a project ID go to infura https://www.infura.io. When you have a project ID, assign it to the 'INFURA_PROJECT_ID' constant. 