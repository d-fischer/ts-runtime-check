import { CheckedPropertyOptions } from '../CheckedObject';

// tslint:disable-next-line:no-any
type Validator = (value: any, options: CheckedPropertyOptions) => boolean;

export default Validator;
