# union-react

## Customizing

union-react comes with default settings, like API path. You can either go with default settings and use pre-built
bundles, or customize them and build the app by yourself.

Just drop a file named `build.json` at the root of union-react and add fields you want to update. Then just run
`npm run prod` or `yarn run prod` to build the app. (Don't forget to install dependencies before)

*Note*: We're using dot notation, meaning that your json will look like `{ "api": { "path": ... } }`

| Key         | Description                                                                                                  | Default  |
|-------------|--------------------------------------------------------------------------------------------------------------|----------|
| api.path    | Path where is located the api. Can be relative (/api) or absolute (https://api.union.chat, //api.union.chat) | /api     |
| api.staging | Same as `api.path`, but for staging environment (`npm run stg`)                                              | /stg/api |
