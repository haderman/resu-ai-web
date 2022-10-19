## Create and Configure the database in localhost

make sure you have installed both faunaDB and Docker on your local machine.

sources: https://docs.fauna.com/fauna/current/build/tools/dev

First, you have to download the container. To pull the docker container run the following command

`docker pull fauna/faunadb:latest`
After that, you have to run the container. To run the container run one of the following commands:

* `npm run start-local-db` - it runs the container with ephemeral data, details [here](#npm-run-start-local-db)
* `npm run start-local-db-persisted` - it runs the container with persisted data, details [here](#npm-run-start-local-db-persisted)

then you have to create the database and they secret key
```bash
  fauna add-endpoint http://localhost:8443/ --alias localhost --key secret
  fauna create-database resume-local-dev --endpoint=localhost
  fauna create-key resume-local-dev --endpoint=localhost
```
copy the secret key and set it to the `FAUNA_SECRET` env variable
```
  # FaunaDB connection data - localhost dev
  FAUNA_SECRET=<secret key>
  FAUNA_SCHEME=http
  FAUNA_DOMAIN=localhost
  FAUNA_PORT=8443
```

copy and paste those variables to the ``.env.local` file

# Install fauna extension for VSCode
source: https://github.com/fauna/vscode

create a `.faunarc`. It should look like this
```
  FAUNA_KEY=<secret key>
  FAUNA_DOMAIN=localhost
  FAUNA_SCHEME=http
  FAUNA_PORT=8443
  FAUNA_GRAPHQL_HOST=https://graphql.fauna.com
```
where `FAUNA_KEY` it is the secret key you have created before and the same value than `FAUNA_SECRET`

if everything is ok, you have configurated the databse and you can start to work with it and next time you just have to run
`npm run start-local-db` or `npm run start-local-db-persisted` and that's all


## Details

### `npm run start-local-db`
it runs the container with ephemeral data, which means the data will be lost after you stop the container. This is useful for testing

### `npm run start-local-db-persisted`
use this if you want to persist the data. It means that the data will be saved on your local machine
and the data will be persisted even if you stop the container. I use this for development.



