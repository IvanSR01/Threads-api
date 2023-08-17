import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { UserModel } from './user.model';
import { UserService } from './user.service';
import { UserController } from './user.controller';

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
	],
	providers: [UserService],
	exports: [UserService],})
export class UserModule {	}
