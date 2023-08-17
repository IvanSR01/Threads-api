import { IsEmail, IsString, MinLength } from "class-validator";



export class AuthDto {
	userName?: string

	@IsString()
	fullName: string

	@IsString()
	@IsEmail()
	email?:string

	img?: string

	@MinLength(6, { message: 'Password cannot be less than 6 characters' })
	@IsString()
	password: string

	dataLogin?: string
}