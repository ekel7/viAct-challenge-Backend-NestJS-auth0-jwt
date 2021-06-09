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

Alternatively, these values can be used for testing:

```
AUTH0_DOMAIN=dev-v3piv5-6.us.auth0.com
AUTH0_CLIENT_ID=wlZiBS99sonkg0aaCof1WSNZ19wvTxDs
AUTH0_CLIENT_SECRET=6SxL9mmKGFJi_u4DSoKaP-24NfCguDz6bSVhOB6kYBPTnMxR_SuaHZ0oZyYmfFQ3
AUTH0_AUDIENCE=http://localhost:3000
AUTH0_CONNECTION=Username-Password-Authentication

```



## Installation

```bash
$ npm install
```

## Running the app

```bash


# watch mode
$ npm run start:dev

```

#### In case you have this error:

```bash
[4:18:00 AM] Starting compilation in watch mode...

node_modules/@nestjs/platform-express/adapters/express-adapter.d.ts:2:23 - error TS2305: Module '"../../common/interfaces/external/cors-options.interface"' has no exported member 'CorsOptionsDelegate'.

2 import { CorsOptions, CorsOptionsDelegate } from '@nestjs/common/interfaces/external/cors-options.interface';
                        ~~~~~~~~~~~~~~~~~~~

[4:18:09 AM] Found 1 error. Watching for file changes.




```

You need to edit a broken import in this directory: `node_modules\@nestjs\platform-express\adapters\express-adapter.d.ts`

In line 2, please delete the `CorsOptionsDelegate`

The imports should look like this:

```
import { RequestMethod } from '@nestjs/common';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { NestApplicationOptions } from '@nestjs/common/interfaces/nest-application-options.interface';
import { AbstractHttpAdapter } from '@nestjs/core/adapters/http-adapter';
import { ServeStaticOptions } from '../interfaces/serve-static-options.interface';
export declare class ExpressAdapter extends AbstractHttpAdapter {
    private readonly routerMethodFactory;
    constructor(instance?: any);
    
    ...........
```


And in line 29:

```
    enableCors(options: CorsOptions ): any;
    createMiddlewareFactory(requestMethod: RequestMethod): (path: string, callback: Function) => any;
    initHttpServer(options: NestApplicationOptions): void;
    registerParserMiddleware(): void;

```


Now the API will run normally.


## Explanation

### Login

To login, once the project is running, you must enter the following URL in the browser:

```
http://localhost:3000/auth/login

```

Once you are logged in, you'll get your token and you can use it to make requests through Postman.

### Registration

To register a user, you can do so by sending an object through Postman with this structure:

URL: `http://localhost:3000/auth/register`


```
{
	"email":"elema4@gmail.com",
	"password":"Password_11",  //Must contain Uppercase letter, lowercase letter, special symbol and a number(8+ digits)!
	"name":"ema",
	"nickname":"what"
}

```


Users are saved in the Auth0 database and in a local database(mongoDB)

### User Information (token verification)

Now, to see the user info, you need to use your token as an authentication header with the Bearer prefix in Postman. 
Then make a GET request to `http://localhost:3000/users/profile`.

You should get an object similar to this:

```
{
  "created_at": "2021-06-09T04:54:19.745Z",
  "email": "elema4@gmail.com",
  "email_verified": false,
  "identities": [
    {
      "user_id": "60c0497bed6fcb0069482aae",
      "provider": "auth0",
      "connection": "Username-Password-Authentication",
      "isSocial": false
    }
  ],
  "name": "ema",
  "nickname": "what",
  "picture": "https://s.gravatar.com/avatar/34a4149cbd50109961777000ff8889c2?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fem.png",
  "updated_at": "2021-06-09T04:56:43.890Z",
  "user_id": "auth0|60c0497bed6fcb0069482aae",
  "last_ip": "181.25.134.115",
  "last_login": "2021-06-09T04:56:43.890Z",
  "logins_count": 1
}

```

Please bear in mind that you will need the `user_id` value to access your profile photo later.


### Upload profile picture

To achieve this, you must use your token in Postman again, and then use a Multipart Form to send an image using the `image` value and then choosing a image file from your computer. It will only accept PNG or JPG formats. The files will be saved at `./files` directory, and the file name will be the userID.


### See profile picture

To see the profile picture, open your browser and go to the following route:
The file extension will depend on the file you have uploaded.

```
http://localhost:3000/users/images/{USERID}.jpg
```
