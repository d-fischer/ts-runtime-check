import Validator from './Type/Validator';

export interface CheckedPropertyOptions {
	optional?: boolean;
	nullable?: boolean;
}

export interface CheckedProperty extends CheckedPropertyOptions {
	name: string;
	type: Validator;
}

export default class CheckedObject<T> {
	private static readonly _checkedProperties: CheckedProperty[] = [];

	static fromPlainObject(obj: object) {
		const result = Object.create(this.prototype);
		for (const prop of this._checkedProperties) {
			const { type: validate, name, ...options } = prop;

			if (!validate(obj[name], options)) {
				throw new TypeError(`Property '${name}' failed to validate`);
			}

			result[name] = obj[name];
		}

		return result;
	}

	static addCheckedProperty(options: CheckedProperty) {
		this._checkedProperties.push(options);
	}
}
