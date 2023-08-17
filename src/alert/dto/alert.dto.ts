import { IsString } from 'class-validator'

export class DeleteDto {
	@IsString()
	_id: string
	@IsString()
	alertId: string
}

export class CreateDto {
	@IsString()
	title: string
	@IsString()
	content: string
	@IsString()
	img: string
}
