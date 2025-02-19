import Errors from "../client/error";

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export default function databaseError(error: any): Errors {
	if (error.code === "SQLITE_CONSTRAINT") {
		return Errors.emailAlreadyInUse();
	}

	if (error.code === "SQLITE_NOT_FOUND") {
		return Errors.userNotFound();
	}

	return Errors.unknownError();
}
