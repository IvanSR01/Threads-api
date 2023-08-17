import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateDto, DeleteDto } from './dto/alert.dto'
import { InjectModel } from 'nestjs-typegoose'
import { UserModel } from 'src/user/user.model'
import { AlertModel } from './alert.model'
import { ModelType, DocumentType } from '@typegoose/typegoose/lib/types'
@Injectable()
export class AlertService {
	constructor(
		@InjectModel(UserModel) private readonly UserModel: ModelType<UserModel>,
		@InjectModel(AlertModel) private readonly AlertModel: ModelType<AlertModel>
	) {}

	async delete({ _id, alertId }: DeleteDto) {
		const user = await this.UserModel.findById(_id)
		const alert = await this.AlertModel.findById(alertId)
		if (!user) throw new NotFoundException('User or alert not found')
		user.alerts.filter((item) => {
			return item.id !== alert.id
		})
		const doc = await user.save()
		return doc
	}

	async deleteAll(_id: string) {
		const user = await this.UserModel.findById(_id)
		if (!user) throw new NotFoundException('User not found')

		user.alerts = []
		const doc = await user.save()
		return doc
	}

	// auto

	async create({ title, content, img }: CreateDto) {
		const alert = await this.AlertModel.create({
			title,
			content,
			img,
		})
		const doc = await alert.save()
		return doc
	}
}
