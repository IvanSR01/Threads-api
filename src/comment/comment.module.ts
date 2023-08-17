import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { UserModel } from 'src/user/user.model';
import { AlertModule } from 'src/alert/alert.module';
import { CommentModel } from './comment.model';
import { ThreadsModel } from 'src/threads/threads.model';

@Module({
	imports: [
		TypegooseModule.forFeature([
			{
				typegooseClass: CommentModel,
				schemaOptions: {
					collection: 'Comment',
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
  providers: [CommentService],
  controllers: [CommentController]
})
export class CommentModule {}
