import {createError} from "@directus/errors";

interface UnexpectedException {
    message: string
}

const unexpectedExceptionMessageConstructor = (extensions: UnexpectedException) => extensions.message;
export const UNEXPECTED = createError<UnexpectedException>('UNEXPECTED', unexpectedExceptionMessageConstructor, 403)
