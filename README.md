## Example

```ts
import 'reflect-metadata';
import { BaseValidator, Check, CheckedObject, Type, Validator } from 'ts-runtime-check';

const ColorValidator: Validator = (value, options) =>
	(typeof value === 'string' && /^#(?:[0-9a-f]{3}){1,2}$/i.test(value)) || BaseValidator(value, options);

export default class User extends CheckedObject<User> {
	@Check() id: number;
	@Check() name: string;
	@Check(Type.Array.of(ColorValidator)) colors: string[];
}

console.log(User.fromPlainObject({ id: 1, name: 'foo', colors: ['#ff0000'] }));
console.log(User.fromPlainObject({ id: 2, name: 1337 }));  // TypeError
```
