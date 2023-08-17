import { IsString } from "class-validator"

export class CreateCommentDto {
	_id:string

	@IsString()
	threadId:string

	@IsString()
	content: string

	commentId?: string

	imgs?: string[]
}
export class UpdateCommentDto {
	_id: string

	content?:string

	imgs?: string[]

	commentId: string
}