This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed at [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## FaunaDB

This project uses [FaunaDB](https://fauna.com/) as a database. You can create a free account [here](https://dashboard.fauna.com/accounts/register).

to run the next scripts you need to have [Docker](https://www.docker.com) installed.

`npm run start-local-db` to start a local FaunaDB instance, with ephemeral data. That means everytime the container is stopped, all data will be lost.
this is useful for testing

`npm run start-local-db-persist` to start a local FaunaDB instance, with persistent data. That means everytime the container is stopped, all data will be persisted.

`npm run setup-local-db` to create the collections in FaunaDB. This script will also create the indexes and functions.

if it is the first time you ar gong to run the project, read [this](/fauna/)

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Test Github actions locally

install [act](https://github.com/nektos/act)

then run

```bash
  act --container-architecture linux/amd64 -s GITHUB_TOKEN=your_token

  # --pull=false to use the local image
```
