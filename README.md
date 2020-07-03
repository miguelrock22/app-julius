# Technical test for Julius2Grow By Miguel Montoya
```
Clone the repository and follow the instructions, this is the restfull app

## Install

```bash
> npm install

```

## Database
Run mongo or configure Atlas

## Configure .env

Copy .env.example file and rename to .env, add the asked values to the .env vars, next, run the aplication.

```bash
> $ route/to/app-julius nodemon
```

## Routes

the routes in the application

```bash
USER:
POST /api/login -> login user

POST /api/user -> Register user

GET /api/user/check -> Check JWT token

POST:

GET /api/post -> Get all posts

POST /api/post -> Insert a post

DELETE /api/post/:id -> Delete a post

```