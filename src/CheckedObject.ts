import Validator from './Type/Validator';
import { isClassValidator } from './Type/ClassValidator';
import BaseValidator from './Type/BaseValidator';

export interface CheckedPropertyOptions {
	optional?: boolean;
	nullable?: boolean;
}

export interface CheckedProperty extends CheckedPropertyOptions {
	name: string;
	type: Validator;
}

export default class CheckedObject<T> {
	private static _checkedProperties: CheckedProperty[];

	static fromPlainObject(obj: object) {
		const result = Object.create(this.prototype);
		for (const prop of this._checkedProperties) {
			const { type: validate, name, ...options } = prop;

			const value = obj[name];
			if (isClassValidator(validate)) {
				if (BaseValidator(value, options)) {
					result[name] = value;
				}

				if (typeof value !== 'object') {
					throw new TypeError(`Property '${name}' failed to validate`);
				}

				result[name] = validate.class!.fromPlainObject(value);
				continue;
			}

			if (!validate(value, options)) {
				throw new TypeError(`Property '${name}' failed to validate`);
			}

			result[name] = value;
		}

		return result;
	}

	static addCheckedProperty(options: CheckedProperty) {
		if (!this._checkedProperties) {
			this._checkedProperties = [];
		}
		this._checkedProperties.push(options);
	}
}
