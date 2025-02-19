import { validate } from "class-validator";
import type { UserDTO } from "../models/dto/create-user";
import userEntity from "../models/entities/user";
import type { UserUpdateDTO } from "../models/dto/update-user";

export async function mapDtoToEntity(dto: UserDTO): Promise<userEntity> {
	const errors = await validate(dto);
	if (errors.length > 0) {
		throw new Error("Validation failed");
	}

	const user = new userEntity();
	user.username = dto.username;
	user.password = dto.password;
	user.email = dto.email;

	return user;
}

export async function mapUpdateDtoToEntity(dto: UserUpdateDTO): Promise<userEntity> {
	const errors = await validate(dto);
	if (errors.length > 0) {
		throw new Error("Validation failed");
	}

	const user = new userEntity();
	user.username = dto.username;
	user.password = dto.password;

	return user;
}
