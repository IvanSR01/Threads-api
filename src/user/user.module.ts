import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { UserModel } from './user.model';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { ThreadsModel } from 'src/threads/threads.model';

@Module({controllers: [UserController],
	imports: [
		TypegooseModule.forFeature([
			{
				typegooseClass: UserModel,
				schemaOptions: {
					collection: 'User',
				},
			},
		]),
		TypegooseModule.forFeature([
			{
				typegooseClass: ThreadsModel,
				schemaOptions: {
					collection: 'Thread',
				},
			},
		]),
	],
	providers: [UserService],
	exports: [UserService],})
export class UserModule {	}
