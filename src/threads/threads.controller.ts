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
import { CreateThreadDto, UpdateThreadDto } from './dto/thread.dto'
import { UpdateDto } from 'src/user/dto/user.dto'

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
	@Put('/update')
	@Auth()
	async update(@User('_id') _id: string, @Body() dto: UpdateThreadDto) {
		return this.ThreadsService.update({...dto, _id})
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Put('/:threadId')
	@Auth()
	async like(@User('_id') _id: string, @Param('threadId') threadId: string) {
		return this.ThreadsService.toggleLikeUser({ _id, threadId })
	}

	@Get('')
	async getAll() {
		return this.ThreadsService.getAll()
	}

	@Get('/:id')
	@Auth()
	async getById(@Param('id') id:string) {
		return this.ThreadsService.byId(id)
	}
}
