import {
	Injectable,
	NotFoundException,
	BadRequestException,
} from '@nestjs/common'
import { InjectModel } from 'nestjs-typegoose'
import { ThreadsModel } from './threads.model'
import { ModelType } from '@typegoose/typegoose/lib/types'
import { UserModel } from 'src/user/user.model'
import {
	CreateThreadDto,
	LikeThreadDto,
	UpdateThreadDto,
} from './dto/thread.dto'
import { AlertService } from 'src/alert/alert.service'

@Injectable()
export class ThreadsService {
	constructor(
		@InjectModel(ThreadsModel)
		private readonly ThreadsModel: ModelType<ThreadsModel>,
		@InjectModel(UserModel) private readonly UserModel: ModelType<UserModel>,
		private readonly AlertService: AlertService
	) {}

	async getAll() {
		return this.ThreadsModel.find().sort({ createAt: -1 })
	}

	async byAuthor(_id: string) {
		const threads = await this.ThreadsModel.find().populate('')
		threads.filter((item) => {
			item.author.id === _id
		})
		return threads
	}

	async byId(threadId: string) {
		const thread = await this.ThreadsModel.findByIdAndUpdate(
			threadId,
			{ $inc: { views: +1 } },
			{ new: true }
		)
		if (!thread) throw new NotFoundException('Thread not found')
		console.log(thread)
		return thread
	}

	async create({ _id, content, imgs }: CreateThreadDto) {
		const user = await this.UserModel.findById(_id).populate('')
		const thread = new this.ThreadsModel({
			author: user,
			content,
			imgs,
		})
		const doc = await thread.save()
		const dto = {
			title: `New alert from ${user.userName ? user.userName : user.fullName}`,
			content: `${
				user.userName ? user.userName : user.fullName
			} Published a new thread`,
			img: user.img,
		}
		const alert = await this.AlertService.create(dto)
		const users = await this.UserModel.find()
		users.forEach(async (item) => {
			let isSub = false
			item.sub.forEach((doc) => {
				if (String(user._id) === String(doc._id)) isSub = true
			})
			if (isSub) {
				item.alerts.push(alert)
			}
			await item.save()
		})
		return doc
	}

	async update({ _id, content, imgs, threadId }: UpdateThreadDto) {
		const thread = await this.ThreadsModel.findById(threadId)

		if (String(_id) !== String(thread.author._id)) {
			throw new BadRequestException('You don t have a license')
		}

		if (content) {
			thread.content = content
		}
		if (imgs) {
			thread.imgs = imgs
		}

		thread.status = 'update'
		const doc = await thread.save()
		return doc
	}

	async delete(_id: string, threadId: string) {
		const thread = await this.ThreadsModel.findById(threadId)
		const user = await this.UserModel.findById(_id)
		if (String(_id) !== String(thread.author._id)) {
			throw new BadRequestException('You don t have a license')
		}
		await this.ThreadsModel.deleteOne(thread.id)
		return thread
	}

	async adminDeleteThread(threadId: string) {
		const doc = await this.ThreadsModel.findByIdAndDelete(threadId)
		const user = await this.UserModel.findById(doc.author._id)
		const dto = {
			title: `New alert from admin`,
			content: `Your thread was deleted for violation`,
			img: '/uploads/Avatar/defaultAvatar.jpg',
		}
		const alert = await this.AlertService.create(dto)
		user.alerts.push(alert)
		await user.save()
		return doc
	}

	async toggleLikeUser({ _id, threadId }: LikeThreadDto) {
		const user = await this.UserModel.findById(_id)

		if (!user) throw new NotFoundException('User not found')
		const thread = await this.ThreadsModel.findById(threadId).populate('')

		if (!thread) throw new NotFoundException('Thread not found')

		let isLike = false
		user.likes.forEach((item) => {
			if (String(item._id) === String(threadId)) isLike = true
		})

		if (isLike) {
			thread.like = thread.like - 1
			await thread.save()
			if (user.likes.length > 1) {
				user.likes.filter((item) => {
					return item.id !== thread.id
				})
				const doc = await user.save()
				return doc
			} else {
				user.likes = []
				const doc = await user.save()
				return doc
			}
		}
		const dto = {
			title: `New alert from ${user.userName ? user.userName : user.fullName}`,
			content: `${
				user.userName ? user.userName : user.fullName
			} put a like on your threadd`,
			img: user.img,
		}
		const alert = await this.AlertService.create(dto)
		const author = await this.UserModel.findById(thread.author._id)
		author.alerts.push(alert)
		user.likes.push(thread)
		thread.like = thread.like + 1
		await author.save()
		const doc = await user.save()
		await thread.save()
		return doc
	}
}
