## Description

Travel Website... (for now)

## Needed Programs
- postgres (pgAdmin4) for local db
- Postman (for endpoint testing)

## Installation

```bash
$ npm install
```

## Building the app
1. Build the app ( in `./travel-buddy` )
```bash
$ npm run build
```

2. Go to `./travel-buddy/packages/web` and create a symlink between the node_modules (maybe unnecessary in the future)
```bash
$ ln -s ../../node_modules node_modules  
```

3. If there are further errors rebuild the app (Step 1)

## Running the app

```bash
# server
$ npm run server start

## in watch mode (hot realoading)
$ npm run server start:dev

# web
$ npm run web start

# both in one (not working currently) (even when working not recommended)
$ npm run start
```

## Test
Note that there are currently not tests.
```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support & Contact
##### Official channels
- Discord Server - [Link](https://discord.gg/f3wWhnH2Hy)

##### Developers
- Author - [Tim Fuchs](https://github.com/FixFaxt)
- More - [No One :(]()
