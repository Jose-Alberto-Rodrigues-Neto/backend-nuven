# A project using Node with TypeScript

### Install dependencys

    npm install

### Run project

    npm run dev

### Repository Structure

```bash
│   .gitignore
│   package-lock.json
│   package.json
│   README.md
│   tsconfig.json
│
└───src
    | app.ts
    |
    └───controllers
    └───repositories
    └───middlewares
    └───models
    └───routes
```

Next steps:
1. Run prisma dev to start a local Prisma Postgres server.
2. Define models in the schema.prisma file.
3. Run prisma migrate dev to migrate your local Prisma Postgres database.
4. Tip: Explore how you can extend the ORM with scalable connection pooling, global caching, and a managed serverless Postgres database. Read: https://pris.ly/cli/beyond-orm