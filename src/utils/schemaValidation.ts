import fs from 'fs';
import { Schema, Validator } from 'jsonschema';

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