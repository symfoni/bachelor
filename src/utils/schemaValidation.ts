import fs from 'fs';
import { Schema, Validator } from 'jsonschema';
import axios from 'axios';

/**
 * validateSchema is a function that reads a schema from a file and validates it against a JSON-object.
 * @param schemaFilePath the file path of the schema.
 * @param jsonObject the object you want to validate against.
 * @returns true if the JSON-object matches the schema, and an error message if it doesn't.
 */
export function validateSchema(schemaFilePath: string, jsonObject: object): boolean | object | Error {
	try {
		// create validator instance
		const validator = new Validator();

		// read schema from file
		const rawdata = fs.readFileSync(schemaFilePath).toString();
    
		const schema: Schema = JSON.parse(rawdata);
    
		// validate schema against object
		const result = validator.validate(jsonObject, schema);

		if (!result.valid) {
			return result.errors;
		}

		return result.valid;   
	} catch (error) {
		// TODO: Find a better return statement
		return false;
	}
}

/**
 * validateSchemaWithURL does a fetch request do a url where the schema exists and checks if it validates the object
 * that was passed through the parameters.
 * @param schemaURL the url where the schema is.
 * @param jsonObject the object you want to validate the schema against.
 * @returns a boolean stating whether the json object was valid against the schema or not.
 */
export async function validateSchemaWithURL(schemaURL: string, jsonObject: object): Promise<boolean | Error> {
	try {
		const validator = new Validator();

		// fetch schema from url
		const res = await axios.get(schemaURL);
		const schema: Schema = res.data;
		
		const result = validator.validate(jsonObject, schema);

		if (!result.valid) {
			return false;
		}
		
		return true;

	} catch (error) {
		console.error(error);
		return new Error('unable to validate against schema');
	}
}