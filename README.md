  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

This is the backend part of my full-stack application.
## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run dev

# production mode
$ npm run start:prod
```

## Requests

### Login - /auth/login

Request example:

```typescript
axios({
	url: `${baseUrl}/auth/login`,
	method: 'post',
	data: {
		dataLogin: 'emal@email.ru',
		password: '1234256',
	},
})
```

Response example

```typescript

{
	"user": {
		"_id": "64dcbda634c5002d07741cb1",
		"email": "emal@email.ru",
		"fullName": "ilya N2elson",
		"userName": "sete",
		"isAdmin": false
	},
	"accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGRjYmRhNjM0YzUwMDJkMDc3NDFjYjEiLCJpYXQiOjE2OTIyNzM1MjIsImV4cCI6MTY5MjI3NzEyMn0.Wm_oevdCjdDqG3PvsVcyladETpf8myq6AAmLRnxKC2g",
	"refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGRjYmRhNjM0YzUwMDJkMDc3NDFjYjEiLCJpYXQiOjE2OTIyNzM1MjIsImV4cCI6MTY5MzU2OTUyMn0.0e8hDY2JFJYFqqUIoLf1WcZGecOzvwdR0ANJFLxsN0Y"
}


```

### Register - /auth/register

Request example:

```typescript
axios({
	url: `${baseUrl}/auth/register`,
	method: 'post',
	data: {
		email: 'e2mal@email.ru',
		fullName: 'i22van N2elson',
		userName: 's12ete',
		password: '1234256',
	},
})
```

Response example

```typescript

{
	"user": {
		"_id": "64dcbdcd34c5002d07741cb7",
		"email": "e2mal@email.ru",
		"fullName": "i22van N2elson",
		"userName": "s12ete",
		"isAdmin": false
	},
	"accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGRjYmRjZDM0YzUwMDJkMDc3NDFjYjciLCJpYXQiOjE2OTIxODgxMDksImV4cCI6MTY5MjE5MTcwOX0.acpBOHmI9d4kzuFNtD_zCBDA2y5AvMdmZ9HUHczjOG4",
	"refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGRjYmRjZDM0YzUwMDJkMDc3NDFjYjciLCJpYXQiOjE2OTIxODgxMDksImV4cCI6MTY5MzQ4NDEwOX0.k3RYWyb4O3ipAgMAe83UWFEyFCB5eMl5uUnSQqPlZRI"
}


```

### Get new token - /auth/login/access-token

Request example:

```typescript
axios({
	url: `${baseUrl}/auth/login/access-token`,
	method: 'post',
	data: {
		refreshToken:
			'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGRiNGQ4MmZkZjY3N2YyNTExNjUzZWIiLCJpYXQiOjE2OTIwOTM4MjYsImV4cCI6MTY5MzM4OTgyNn0.5DyHOG0jTUt0zdtZ7gq6BNoQg4fLEY_MHXJrGKL61yc',
	},
})
```

Response example

```typescript

{
	"user": {
		"_id": "64dcbdcd34c5002d07741cb7",
		"email": "e2mal@email.ru",
		"fullName": "i22van N2elson",
		"userName": "s12ete",
		"isAdmin": false
	},
		"accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGRiNGQ4MmZkZjY3N2YyNTExNjUzZWIiLCJpYXQiOjE2OTIwOTQyMzEsImV4cCI6MTY5MjA5NzgzMX0.U2Je0ldGg4FC_vr_g8lHkdofiQPpMVTALurO88R29Hc",
	  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGRiNGQ4MmZkZjY3N2YyNTExNjUzZWIiLCJpYXQiOjE2OTIwOTQyMzEsImV4cCI6MTY5MzM5MDIzMX0.Dawp6EaUw11yqRT2erIApQ966P1oTEVXyFn2OIhKhgg"
}


```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Nelson](https://github.com/zxcivan07)

## License

Nest is [MIT licensed](LICENSE).
