import { IsString } from "class-validator";


export class CreateThreadDto {
	@IsString()
	_id: string

	@IsString()
	title:string

	@IsString()
	content: string

	imgs?: string[]
}

export class UpdateThreadDto {
	_id: string

	title?:string

	content?: string

	imgs?: string[]

	threadId: string
}

export class LikeThreadDto {
	@IsString()
	_id: string

	@IsString()
	threadId: string
}