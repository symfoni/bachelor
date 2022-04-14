/**
 * This file contains all the API URLs used for the application.
 */

// TODO: Find a way to get environment variables in react-native.

// Secret environmental variables
import { Platform } from 'react-native';

// platform dependent host
const host = Platform.OS === 'android' ? '192.168.10.166' : 'localhost';

// optional port
const PORT: string | number = 6060;

// user
export const USER_GET_CREDENTIAL_ON_TYPE_URL =  `http://${host}:${PORT}/user/credential/`;
export const USER_CREATE_PRESENTATION_URL = `http://${host}:${PORT}/user/presentation`;
export const USER_SEND_MESSAGE_URL = `http://${host}:${PORT}/user/sendMessage`;
export const USER_GET_ALL_CREDENTIALS_URL = `http://${host}:${PORT}/user/credentials`;
export const USER_GET_MAIN_IDENTIFIER = `http://${host}:${PORT}/user/mainIdentifier`;

// nav
export const NAV_GET_MAIN_IDENTIFIER_URL = `http://${host}:${PORT}/nav/mainIdentifier`;

// symfoni
export const SYMFONI_GET_MAIN_IDENTIFIER_URL = `http://${host}:${PORT}/symfoni/mainIdentifier`;