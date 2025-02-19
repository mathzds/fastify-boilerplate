export default class Errors extends Error {
	public readonly code: string;
	public readonly statusCode: number;

	constructor(code: string, message: string, statusCode: number) {
		super(message);
		this.code = code;
		this.statusCode = statusCode;
		this.name = "AppError";
	}

	static userNotFound() {
		return new Errors("USER_NOT_FOUND", "Usuário não encontrado.", 404);
	}

	static emailAlreadyInUse() {
		return new Errors(
			"EMAIL_ALREADY_IN_USE",
			"O email fornecido já está em uso.",
			400,
		);
	}

	static familyNotFound() {
		return new Errors("FAMILY_NOT_FOUND", "Familia nao encontrada.", 404);
	}

	static unknownError() {
		return new Errors("UNKNOWN_ERROR", "Ocorreu um erro inesperado.", 500);
	}

	static wrongPassword() {
		return new Errors("WRONG_PASSWORD", "Senha incorreta.", 400);
	}

	static wrongToken() {
		return new Errors("WRONG_TOKEN", "Token incorreto.", 400);
	}
}
