import Validator from './Validator';
import BaseValidator from './BaseValidator';
import { CheckedPropertyOptions } from '../CheckedObject';

// tslint:disable-next-line:no-any
function ArrayValidator(value: any, options: CheckedPropertyOptions) {
	return Array.isArray(value) || BaseValidator(value, options);
}

namespace ArrayValidator {
	export const of = (elementType: Validator, elementOptions: CheckedPropertyOptions = {}): Validator =>
		(value, options) =>
			(Array.isArray(value) && value.every(element => elementType(element, elementOptions)))
			|| BaseValidator(value, options);
}

export default ArrayValidator as Validator & { of: (elementType: Validator, elementOptions?: CheckedPropertyOptions) => Validator };
