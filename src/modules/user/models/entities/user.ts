import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("users")
export default class userEntity {
	@PrimaryGeneratedColumn("uuid")
	id!: string;

	@Column({ type: "varchar" })
	username!: string;

	@Column({ type: "varchar" })
	password!: string;

	@Column({ type: "varchar", unique: true })
	email!: string;
}
