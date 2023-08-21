
export class UpdateDto {
	email?: string

	fullName?: string

	userName?: string

	password?: string

	isAdmin?: boolean

	description?: string

	img?: string

	links?: ILinks[]
}
interface ILinks {
	img: string

	title: string

	link: string
}
