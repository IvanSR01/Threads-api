import { Ref, prop } from '@typegoose/typegoose'
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'
import { ThreadsModel } from 'src/threads/threads.model'
import { UserModel } from 'src/user/user.model'

export interface CommentModel extends Base {}

export class CommentModel extends TimeStamps {
	@prop()
	user: Ref<UserModel>

	@prop()
	thread: Ref<ThreadsModel>

	@prop()
	imgs?: string[]

	@prop({ default: [] })
	comment: Ref<CommentModel>[]

	@prop()
	content: string

	@prop({ default: 0 })
	like: number
}
