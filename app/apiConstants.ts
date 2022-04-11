/**
 * This file contains all the API URLs used for the application.
 */

// Secret environmental variables
import dotenv from 'dotenv';
dotenv.config({ path: '../../dotenv.env' });
import { Platform } from 'react-native';

// platform dependent host
const host = Platform.OS === 'android' ? process.env.IPV4 : 'localhost';

// optional port
const PORT: string | number = process.env.PORT ?? 6060;

// user
export const USER_GET_CREDENTIAL_ON_TYPE_URL =  `http://${host}:${PORT}/user/credential/`;
export const USER_CREATE_PRESENTATION_URL = `http://${host}:${PORT}/user/presentation`;
export const USER_SEND_MESSAGE_URL = `http://${host}:${PORT}/user/sendMessage`;
export const USER_GET_ALL_CREDENTIALS_URL = `http://${host}:${PORT}/user/credentials`;

// nav
export const NAV_GET_MAIN_IDENTIFIER_URL = `http://${host}:${PORT}/nav/mainIdentifier`;