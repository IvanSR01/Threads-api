import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { UserModule } from './user/user.module'
import { TypegooseModule } from 'nestjs-typegoose'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { getMongoConfig } from './config/mongo.config'
import { AlertModule } from './alert/alert.module';
import { ThreadsModule } from './threads/threads.module';
import { CommentModule } from './comment/comment.module';

@Module({
	imports: [
		AuthModule,
		UserModule,
		ConfigModule.forRoot(),
		TypegooseModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getMongoConfig,
		}),
		AlertModule,
		ThreadsModule,
		CommentModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
