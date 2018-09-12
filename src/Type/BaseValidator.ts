import { CheckedPropertyOptions } from '../CheckedObject';
import Validator from './Validator';

// tslint:disable-next-line:no-any
const BaseValidator: Validator = (value: any, { optional = false, nullable = false }: CheckedPropertyOptions) =>
	(value === undefined && optional) || (value === null && nullable);

export default BaseValidator;
