import { Ref, prop } from '@typegoose/typegoose'
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'
import { CommentModel } from 'src/comment/comment.model'
import { UserModel } from 'src/user/user.model'

export interface ThreadsModel extends Base {}

export class ThreadsModel extends TimeStamps {
	@prop()
	author: Ref<UserModel>

	@prop({required: true})
	content: string

	@prop()
	imgs: string[]

	@prop({ default: 0 })
	like: number

	@prop({default: 0})
	views: number

	@prop({default: []})
	comment: Ref<CommentModel>[]

	@prop({ default: 'mount' })
	status: 'mount' | 'update'
}