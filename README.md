<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>



## Setup

This project uses MongoDB, so it's advised to install the mongo server before running the project.

You'll need to populate a `.env` file with Auth0 configuration environemt
details.

```dotenv
AUTH0_DOMAIN={your Auth0 domain}
AUTH0_CLIENT_ID={the Auth0 client ID for your app}
AUTH0_CLIENT_SECRET={the Auth0 client secret for your app}
AUTH0_AUDIENCE={http://localhost:3000 or your production domain accordingly}
AUTH0_CONNECTION={your Auth0 database name configured to your client}
```

A template `.env` file can be found at [`.env.example`](.env.example).



## Installation

```bash
$ npm install
```

## Running the app

```bash


# watch mode
$ npm run start:dev

```



## Explanation

### Login

To login, once the project is running, you must enter the following URL in the browser:

```
localhost:3000/auth/login

```

Once you are logged in, you'll get your token and you can use it to make requests through Postman.

### Registration

To register a user, you can do so by sending an object through Postman with this structure:


```
{
	"email":"elema4@gmail.com",
	"password":"Password_11",  //Must contain Uppercase letter, lowercase letter, special symbol and a number!
	"name":"ema",
	"nickname":"what"
}

```


Users are saved in the Auth0 database and in a local database(mongoDB)


