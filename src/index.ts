export type OkResult<T> = Result<true, T, T>;
export type ErrResult<T> = Result<false, T, T>;

export const Ok = <T>(value: T): OkResult<T> => {
	return new Result(true, value);
}

export const Err = <E>(error: E): ErrResult<E> => {
	return new Result(false, error); 
}

export class Result<O extends boolean, T, E> {
	constructor(
		public readonly ok: O,
		public readonly value: O extends true ? T : E
		) { }

	unwrap(): T | never {
		if (this.ok) return this.value as T;
		throw this.value;
	}

	unwrapOr<X = undefined>(value?: X): T | X {
		return this.ok ? this.value as T : value!;
	}

	unwrapOrElse<X>(value: (err: E) => X): T | X {
		return this.ok ? this.value as T : value(this.value as E);
	}
}
