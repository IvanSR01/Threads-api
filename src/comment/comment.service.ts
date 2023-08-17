import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from '@nestjs/common'
import { InjectModel } from 'nestjs-typegoose'
import { CommentModel } from './comment.model'
import { ModelType } from '@typegoose/typegoose/lib/types'
import { CreateCommentDto, UpdateCommentDto } from './dto/comment.dto'
import { UserModel } from 'src/user/user.model'
import { ThreadsModel } from 'src/threads/threads.model'
import { AlertService } from 'src/alert/alert.service'
import { CreateDto } from 'src/alert/dto/alert.dto'

@Injectable()
export class CommentService {
	constructor(
		@InjectModel(CommentModel)
		private readonly CommentModel: ModelType<CommentModel>,
		@InjectModel(UserModel) private readonly UserModel: ModelType<UserModel>,
		@InjectModel(ThreadsModel)
		private readonly ThreadsModel: ModelType<ThreadsModel>,
		private readonly AlertService: AlertService
	) {}

	async create({ _id, threadId, content, imgs, commentId }: CreateCommentDto) {
		const user = await this.UserModel.findById(_id)
		const thread = await this.ThreadsModel.findById(threadId)

		if (!user || !thread)
			throw new NotFoundException('User or thread not found')

		const com = await this.CommentModel.create({
			content,
			imgs,
			user,
		})

		if (!commentId) {
			const dto = await this.createDto(user, 'left a comment on your thread')
			const alert = await this.AlertService.create(dto)
			thread.comment.push(com)
			const author = await this.UserModel.findById(thread.author._id)
			author.alerts.push(alert)
			await author.save()
		} else {
			const comment = await this.CommentModel.findById(commentId)
			const user = await this.UserModel.findById(comment.user._id)
			const dto = await this.createDto(user, 'left a comment on your comment')
			const alert = await this.AlertService.create(dto)
			thread.comment.push(com)
			comment.comment.push(com)
			user.alerts.push(alert)
			await comment.save()
			await user.save()
		}
		await thread.save()
		const doc = await com.save()
		return doc
	}

	async likeComment(_id: string, commentId: string) {
		const user = await this.UserModel.findById(_id)
		const comment = await this.CommentModel.findById(commentId).populate('')
		if (!user || !comment)
			throw new NotFoundException('User or comment not found')
		let isLike = false
		user.likes.forEach((item) => {
			if (String(item._id) === String(commentId)) isLike = true
		})
		if (isLike) {
			comment.like = comment.like - 1
			await comment.save()
			if (user.likes.length > 1) {
				user.likes.filter((item) => {
					return item.id !== comment.id
				})
				const doc = await user.save()
				return doc
			} else {
				user.likes = []
				const doc = await user.save()
				return doc
			}
		}
		const dto = await this.createDto(user, 'put a like on your comment')
		const alert = await this.AlertService.create(dto)
		const author = await this.UserModel.findById(comment.user._id)
		user.likes.push(comment)
		author.alerts.push(alert)
		await author.save()
		const doc = await user.save()
		return doc
	}

	async update({ _id, content, imgs, commentId }: UpdateCommentDto) {
		const comment = await this.CommentModel.findById(commentId)

		if (String(_id) !== String(comment.user._id)) {
			throw new BadRequestException('You don t have a license')
		}

		if (content) {
			comment.content = content
		}
		if (imgs) {
			comment.imgs = imgs
		}
		const doc = await comment.save()
		return doc
	}

	async delete(_id: string, commentId: string) {
		const comment = await this.CommentModel.findById(commentId)
		if (String(_id) !== String(comment.user._id)) {
			throw new BadRequestException('You don t have a license')
		}
		const doc = await this.CommentModel.deleteOne(comment.id)
		return doc
	}

	// Admin

	async adminDeleteComment(commentId: string) {
		return this.CommentModel.findByIdAndDelete(commentId)
	}

	// autp
	async createDto(user: UserModel, content: string): Promise<CreateDto> {
		const dto = {
			title: `New alert from ${user.userName ? user.userName : user.fullName}`,
			content: `${user.userName ? user.userName : user.fullName} ${content}`,
			img: user.img,
		}
		return dto
	}
}
