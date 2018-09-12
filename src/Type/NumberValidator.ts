import Validator from './Validator';
import BaseValidator from './BaseValidator';

const NumberValidator: Validator = (value, options) =>
	typeof value === 'number' || BaseValidator(value, options);

export default NumberValidator;
