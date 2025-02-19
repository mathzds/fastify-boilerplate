import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

export class UserDTO {
	@IsNotEmpty()
	@IsString()
	username!: string;

	@IsNotEmpty()
	@IsString()
	@Length(6, 20)
	password!: string;

	@IsNotEmpty()
	@IsEmail()
	email!: string;
}
