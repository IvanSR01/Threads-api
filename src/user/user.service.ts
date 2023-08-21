import { genSalt, hash } from 'bcryptjs'
import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from 'nestjs-typegoose'
import { UserModel } from './user.model'
import { ModelType } from '@typegoose/typegoose/lib/types'
import { UpdateDto } from './dto/user.dto'
import { IIds } from './user-interface'
import { ThreadsService } from 'src/threads/threads.service'

@Injectable()
export class UserService {
	constructor(
		@InjectModel(UserModel) private readonly UserModel: ModelType<UserModel>
	) {}

	async getPopularUser() {
		return this.UserModel.find().sort({ sub: -1 }).exec()
	}

	async byId(id: string) {
		const user = await this.UserModel.findById(id)
		if (user) return user
		throw new NotFoundException('User not found')
	}

	async updateProfile(_id: string, dto: UpdateDto) {
		const user = await this.UserModel.findById(_id)
		const isSameUser =
			(await this.UserModel.findOne({ email: dto.email })) ||
			(await this.UserModel.findOne({ userName: dto.userName }))

		if (isSameUser && String(_id) !== String(isSameUser._id))
			throw new NotFoundException('Email or username busy')

		if (user) {
			if (dto.password) {
				const salt = await genSalt(10)
				user.password = await hash(dto.password, salt)
			}
			if (dto.email) {
				user.email = dto.email
			}
			if (dto.isAdmin || dto.isAdmin === false) user.isAdmin = dto.isAdmin

			if (dto.userName) user.userName = dto.userName

			if (dto.fullName) user.fullName = dto.fullName

			if (dto.description) user.description = dto.description

			if (dto.img) user.img = dto.img

			await user.save()
			return { success: true }
		}
		throw new NotFoundException('User not found')
	}

	async toggleSub({ _id, subId }: IIds) {
		const user = await this.UserModel.findById(_id)
		const subUser = await this.UserModel.findById(subId)
		if (!user || !subUser) throw new NotFoundException('Users not found')
		let isSub = false
		user.sub.forEach((item) => {
			if (String(item._id) === String(subId)) isSub = true
		})
		if (isSub) {
			subUser.subCount = subUser.subCount - 1
			if (user.sub.length > 1) {
				user.sub.filter((item) => {
					return item.id !== subUser.id
				})
				await subUser.save()
				const doc = await user.save()
				return doc
			} else {
				user.sub = []
				await subUser.save()
				const doc = await user.save()
				return doc
			}
		}
		await subUser.save()
		subUser.subCount = subUser.subCount + 1
		user.sub.push(subUser)
		const doc = await user.save()
		return doc
	}

	// Admin

	async userToAdmin(_id: string) {
		const user = await this.UserModel.findById(_id)

		if (!user) throw new NotFoundException('User not found')

		user.isAdmin = true

		await user.save()
		return
	}

	async delete(id: string) {
		return this.UserModel.findByIdAndDelete(id).exec()
	}

	async getCount() {
		return this.UserModel.find().count().exec()
	}
}
