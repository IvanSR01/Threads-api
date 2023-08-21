import { Module } from '@nestjs/common'
import { ThreadsService } from './threads.service'
import { ThreadsController } from './threads.controller'
import { TypegooseModule } from 'nestjs-typegoose'
import { UserModel } from 'src/user/user.model'
import { ThreadsModel } from './threads.model'
import { AlertModule } from 'src/alert/alert.module'

@Module({
	imports: [
		TypegooseModule.forFeature([
			{
				typegooseClass: ThreadsModel,
				schemaOptions: {
					collection: 'Thread',
				},
			},
		]),
		TypegooseModule.forFeature([
			{
				typegooseClass: UserModel,
				schemaOptions: {
					collection: 'User',
				},
			},
		]),
		AlertModule
	],
	providers: [ThreadsService],
	controllers: [ThreadsController],
	exports: [ThreadsService]
})
export class ThreadsModule {}
