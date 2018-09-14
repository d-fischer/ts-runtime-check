import 'reflect-metadata';
import CheckedObject, { CheckedProperty, CheckedPropertyOptions } from './CheckedObject';
import Validator from './Type/Validator';
import NumberValidator from './Type/NumberValidator';
import StringValidator from './Type/StringValidator';
import ArrayValidator from './Type/ArrayValidator';
import ClassValidator from './Type/ClassValidator';

interface OptionsWithType extends CheckedPropertyOptions {
	type?: Validator;
}

// tslint:disable-next-line:only-arrow-functions
const Check = (type?: Validator, options: OptionsWithType = {}): PropertyDecorator => function <T>(target: CheckedObject<T>, propertyKey: string) {
	if (!type) {
		const inferredType = Reflect.getMetadata('design:type', target, propertyKey);
		if (inferredType === undefined) {
			throw new Error(`\`ts-runtime-check\` requires you to enable the \`emitDecoratorMetadata\` TypeScript compiler option in order to use design-time types.
Please enable it or specify explicit types for every property.`);
		}
		switch (inferredType) {
			case Number: {
				type = NumberValidator;
				break;
			}
			case String: {
				type = StringValidator;
				break;
			}
			case Array: {
				console.warn(`Warning: Property '${propertyKey}' has been determined as an untyped array.
If you want to validate the array elements, please specify the type manually using \`Type.Array.of()\`.`);
				type = ArrayValidator;
				break;
			}
			case Object: {
				throw new Error(`Type of property '${propertyKey}' can't be determined, please specify it manually`);
			}
			case Symbol: {
				throw new Error('Symbols are not supported yet in `ts-runtime-check`');
			}
			default: {
				type = ClassValidator(inferredType);
			}
		}
	}
	const propOptions: CheckedProperty = { ...options, name: propertyKey, type };
	(target.constructor as typeof CheckedObject).addCheckedProperty(propOptions);
};

export default Check;
