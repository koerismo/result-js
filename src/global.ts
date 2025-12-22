import { Ok as _Ok, Err as _Err, type OkResult, type ErrResult } from './index.js';

declare global {
	var Ok: typeof _Ok;
	var Err: typeof _Err;
}

globalThis.Ok = _Ok;
globalThis.Err = _Err;
