# ToDo

This Project is a simple to do app with auth and other staff

### Built With

- [![PostgreSQL logo](https://www.postgresql.org/logo/logos/postgresql-logo-228x228.png)](https://www.postgresql.org/)

- [![TypeScript logo](https://www.typescriptlang.org/images/typescript-logo-square.svg)](https://www.typescriptlang.org/)

- [![Prisma logo](https://prisma.io/assets/images/prisma-logo-color.svg)](https://prisma.io/)

- [![Node.js logo](https://nodejs.org/static/images/logo.svg)](https://nodejs.org/)

# Prerequisites

1. Clone the repository

```sh
git clone https://github.com/Akmyrat17/Todo.git
```

2. Move to the directory

```sh
cd todo
```

# Installation

```sh
npm i
```

- 1. Run the following command to migrate your Prisma database schema:

```sh
npm run prisma:migrate "any name"
```

- 2.Run the following command to prepare your project for husky:

```sh
npm run prepare
```

- 3.Run the following command to install the Husky commit hook:

```sh
npx husky add .husky/commit-msg "npx --no -- commitlint --edit $1"
```

- 4. Run the project

```sh
npm run dev
```

# Swagger UI

```sh
http://localhost:3030/documentation
```
