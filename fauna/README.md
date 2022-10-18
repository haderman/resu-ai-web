# Create a database in localhost
to achieve this, you need to install faunaDB on your local machine, there is a docker container for that.
follow the instructions at https://docs.fauna.com/fauna/current/build/tools/dev

run the next command
```
  fauna add-endpoint http://localhost:8443/ --alias localhost --key secret
  fauna create-database resume-local-dev --endpoint=localhost
  fauna create-key resume-local-dev --endpoint=localhost
```

then copy the **secret key** into the `.env.local` file. This is how it should look like:
```
  # FaunaDB connection data - localhost dev
  FAUNA_SECRET=<secret key>
  FAUNA_SCHEME=http
  FAUNA_DOMAIN=localhost
  FAUNA_PORT=8443
```

# Install fauna extension for VSCode
follow the instructions here: https://github.com/fauna/vscode
if you want t create a `.faunarc` file it should look like this:
```
  FAUNA_KEY=<secret key>
  FAUNA_DOMAIN=localhost
  FAUNA_SCHEME=http
  FAUNA_PORT=8443
  FAUNA_GRAPHQL_HOST=https://graphql.fauna.com
```


