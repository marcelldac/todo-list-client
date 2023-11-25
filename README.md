# How to install and configure the project?

## Client

```bash
npm install
```
``` bash
npm run dev
```

## Server

 - Add a '.env' file to your environment (root directory).

 - Configure your database using the command bellow. (using PostgreSQL):

```prisma
DATABASE_URL="postgresql://<username (default: postgres)>:<password>@<host (default:localhost)>:<port (default:5432)>/todos?schema=<schema (default:public)>"
```
