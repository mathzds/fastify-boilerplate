import { IsNotEmpty, IsString, Length } from "class-validator";

export class UserUpdateDTO {
	@IsNotEmpty()
	@IsString()
	username!: string;

	@IsNotEmpty()
	@IsString()
	@Length(6, 20)
	password!: string;
}
