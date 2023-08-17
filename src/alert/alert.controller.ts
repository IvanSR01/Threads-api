import { Controller, Post, UsePipes, ValidationPipe, Body } from '@nestjs/common'
import { AlertService } from './alert.service'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { CreateDto } from './dto/alert.dto'

@Controller('alert')
export class AlertController {
	constructor(private readonly AlertService: AlertService) {}

	@UsePipes(new ValidationPipe())
	@Post('')
	@Auth('admin')
	async create(@Body() dto: CreateDto){
		return this.AlertService.create(dto)
	}
}
