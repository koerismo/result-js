export type OkResult<T> = Result<T, any, true>;
export type ErrResult<T> = Result<any, T, false>;

export const Ok = <V>(value: V): OkResult<V> => {
	return new Result(true, value);
}

export const Err = <E>(error: E): ErrResult<E> => {
	return new Result(false, error); 
}

export class Result<V, E = V, O extends boolean = boolean> {
	constructor(
		public readonly ok: O,
		public readonly value: O extends true ? V : E
		) { }

	unwrap(): V | never {
		if (this.ok) return this.value as V;
		throw this.value;
	}

	or(): V | undefined;
	or<T>(value: T): V | T;
	or<T>(value?: T): V | T {
		return this.ok ? this.value as V : value!;
	}

	orElse<T>(value: (err: E) => T): V | T {
		return this.ok ? this.value as V : value(this.value as E);
	}
}
