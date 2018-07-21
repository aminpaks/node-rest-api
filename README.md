# RESTful API with Express.js

Sample REST API built with TypeScript and Node.JS

## Install your dependencies

First make sure you have at least Node.JS v9 and then install the dependencies.

```sh
$ npm install
```

## Start the server

```sh
$ npm start
```

## Development

We encourage you to use VSCode as your editor and install its Prettier extension.

### Environment variables

It's very simple to keep configuration values in a project. But it won't scale, we offer using `.env` files for your local
development. It's `KEY=VALUE` file and once you start your project it will load them up. In production you just skip
this file and set the variables manually.

Your local `.env` file would look like this:

```json
DEBUG=true
NODE_ENV='development'
SERVER_PORT=5000
MONGODB_URI='mongodb://username:password@domain:port/path'
```

It's worth mentioning all these variables should be available for the production too either by an `.env` file or defining them directly in the shell.

### Debugging

Make sure you have Nodemon globally installed:

```sh
$ npm install --globally nodemon
```

Then start dev script:

```sh
$ npm run dev
```

And at the end attach the VSCode debugger to "Attach to Debugger" and you should be able to nicely debug the code.
