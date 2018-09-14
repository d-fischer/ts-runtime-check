import Validator from './Validator';
import BaseValidator from './BaseValidator';
import CheckedObject from '../CheckedObject';

/**
 * This validator is intentionally a stub that only tests basic stuff. Nested classes are checked in the converter.
 */

export type ClassValidatorType = Validator & {
	// tslint:disable-next-line:no-any
	class?: typeof CheckedObject;
};

// tslint:disable-next-line:no-any
const ClassValidator = (cls: typeof CheckedObject): Validator => {
	const result: ClassValidatorType = BaseValidator;

	result.class = cls;

	return result;
};

export const isClassValidator = (validator: Validator): validator is ClassValidatorType => 'class' in validator;

export default ClassValidator;
