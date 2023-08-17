import { Module } from '@nestjs/common'
import { AlertService } from './alert.service'
import { AlertController } from './alert.controller'
import { TypegooseModule } from 'nestjs-typegoose'
import { AlertModel } from './alert.model'
import { UserModule } from '../user/user.module'
import { UserModel } from '../user/user.model'

@Module({
	imports: [
		TypegooseModule.forFeature([
			{
				typegooseClass: AlertModel,
				schemaOptions: {
					collection: 'Alert',
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
		UserModule,
		UserModel
	],
	providers: [AlertService],
	controllers: [AlertController],
	exports: [AlertService]
})
export class AlertModule {}
