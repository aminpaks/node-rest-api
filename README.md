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

### Transpile to ES5 for Node.JS

```sh
$ npm run build
```

## Development

We encourage you to use VSCode as your editor and install its Prettier extension.

### Environment variables

It's very simple to keep configuration values in a project. But it won't scale, we offer using `.env` files for your local
development. It's `KEY=VALUE` file and once you start your project it will load them up. In production you just skip
this file and set the variables manually.

### Start debug server

Make sure you have Nodemon globally installed

```sh
$ npm install --globally nodemon
```

First run babel watch:

```sh
$ npm run watch
```

Then run the server:

```sh
$ npm run debug
```

And at the end attach the debugger by starting VSCode attach debug.
