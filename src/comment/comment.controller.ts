import {
	Controller,
	Post,
	Body,
	Put,
	Param,
	HttpCode,
	UsePipes,
	ValidationPipe,
	Delete,
} from '@nestjs/common'
import { CommentService } from './comment.service'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { User } from 'src/user/decorators/user.decorator'
import { CreateCommentDto, UpdateCommentDto } from './dto/comment.dto'

@Controller('comment')
export class CommentController {
	constructor(private readonly CommentService: CommentService) {}

	@HttpCode(200)
	@UsePipes(new ValidationPipe())
	@Auth()
	@Post('')
	async create(@User('_id') _id: string, @Body() dto: CreateCommentDto) {
		return this.CommentService.create({ _id, ...dto })
	}
	@Auth()
	@Put('/:commentId')
	async like(@User('_id') _id: string, @Param('commentId') commentId: string) {
		return this.CommentService.likeComment(_id, commentId)
	}

	@HttpCode(200)
	@UsePipes(new ValidationPipe())
	@Auth()
	@Put('/:commentId')
	async update(
		@User('_id') _id: string,
		@Param('commentId') commentId: string,
		@Body() dto: UpdateCommentDto
	) {
		return this.CommentService.update({ _id, commentId, ...dto })
	}
	@Auth()
	@Delete('/:commentId')
	async delete(
		@User('_id') _id: string,
		@Param('commentId') commentId: string
	) {
		return this.CommentService.update({ _id, commentId })
	}

	@Auth('admin')
	@Delete('/:commentId')
	async deleteAdmin(@Param('commentId') commentId: string) {
		return this.CommentService.adminDeleteComment(commentId)
	}
}
