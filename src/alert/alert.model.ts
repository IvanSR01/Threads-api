import { Ref, prop } from '@typegoose/typegoose'
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'

export interface AlertModel extends Base {}

export class AlertModel extends TimeStamps {
	@prop()
	title: string

	@prop()
	content: string

	@prop()
	img: string

}