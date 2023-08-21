import {
	Controller,
	Post,
	Body,
	HttpCode,
	UsePipes,
	ValidationPipe,
	Put,
	Param,
	Get,
} from '@nestjs/common'
import { ThreadsService } from './threads.service'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { User } from 'src/user/decorators/user.decorator'
import { CreateThreadDto } from './dto/thread.dto'
import { UserModel } from 'src/user/user.model'

@Controller('threads')
export class ThreadsController {
	constructor(private readonly ThreadsService: ThreadsService) {}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post('')
	@Auth()
	async create(@User('_id') _id: string, @Body() dto: CreateThreadDto) {
		return this.ThreadsService.create({ _id, ...dto })
	}

	@Get('by-author')
	@Auth()
	async byAuthor(@Body('_id') _id:string ){
		return this.ThreadsService.byAuthor(_id)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Put('/:threadId')
	@Auth()
	async like(@User('_id') _id: string, @Param('threadId') threadId: string) {
		return this.ThreadsService.toggleLikeUser({ _id, threadId })
	}

	@Get('')
	@Auth()
	async getAll() {
		return this.ThreadsService.getAll()
	}

	@Get('/:id')
	@Auth()
	async getById(@Param('id') id:string) {
		return this.ThreadsService.byId(id)
	}
}
