import { IsString } from "class-validator";


export class CreateThreadDto {
	_id: string

	@IsString()
	content: string

	imgs?: string[]
}

export class UpdateThreadDto {
	_id: string

	content?: string

	imgs?: string[]

	@IsString()
	threadId: string
}

export class LikeThreadDto {
	@IsString()
	_id: string

	@IsString()
	threadId: string
}