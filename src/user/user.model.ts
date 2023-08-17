import { Ref, prop } from '@typegoose/typegoose'
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'
import { AlertModel } from '../alert/alert.model'
import { ThreadsModel } from 'src/threads/threads.model'
import { CommentModel } from 'src/comment/comment.model'

export interface UserModel extends Base {}

export class UserModel extends TimeStamps {
	@prop({ unique: true })
	userName: string

	@prop({ required: true })
	fullName: string

	@prop({ unique: true })
	email: string

	@prop()
	password: string

	@prop({ default: 'uploads/Avatar/defaultAvatar.jpg' })
	img: string

	@prop({ default: false })
	isAdmin: boolean

	@prop({ default: [] })
	sub: Ref<UserModel>[]

	@prop({ default: [] })
	alerts: Ref<AlertModel>[]

	@prop({ default: [] })
	likes: Ref<ThreadsModel | CommentModel>[]
}
