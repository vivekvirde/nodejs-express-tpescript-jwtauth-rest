`NodeJS using Typescript and Express Framework`

`MySQL DATABSE`

`REST API`

`JWT tokens`

`Delete book end point authenticated by JWT tokens`


# Topic covered
. Login / Register for Authors

. CRUD operations for managing Books

. Endpoints should have authentication ie. Only the author that owns the book can delete it

. Books and Authors have a N to 1 relationship ie. One Book has one author, One author has
many books

. Data must pe persisted

# DATABASE MYSQL
- On local machine mysql should be up and running.
- Create database name `BookManagement`.
- Inside database load BookManagement_Tb_Authors.sql and  BookManagement_Tb_Books.sql file placed on project(repository) root.

# NODE SERVER SETUP
- Take a project clone `git clone https://github.com/vivekvirde/nodejs-express-tpescript-jwtauth-rest.git`. 
- Open terminal / command prompt.
- Navigate to project root folder.
- On project root run command `npm install`.
- Now open .env file on code editor and change DB settings Your mysql DB_HOST-DB_USER-DB_PWD.
- Then run `nodemon index.ts`
- Your server code will be up => `⚡️[server]: Server is running at http://localhost:3000`

NOTE : You can find .env file on project root, I have comment out .env from .gitignore. Easy access for you. 




