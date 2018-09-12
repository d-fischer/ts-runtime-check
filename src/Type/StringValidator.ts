import Validator from './Validator';
import BaseValidator from './BaseValidator';

const StringValidator: Validator = (value, options) =>
	typeof value === 'string' || BaseValidator(value, options);

export default StringValidator;
