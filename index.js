const express = require("express");
const app = express();
const port = process.env.PORT || 3001;
const sequelize = require('sequelize');
const Sequelize = require('./src/services/db');
const userRouter = require('./src/router/user.router');
const postsRouter = require('./src/router/posts.router');
const errorMiddleware = require("./src/middleware/error.middleware");

// Middleware to parse incoming JSON and form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/users',userRouter);
app.use('/posts',postsRouter);

// 404 error
app.all('*', (req, res, next) => {
    console.log(req.url);
    console.log('Endpoint not found!')
    let err = new Error('Enpoint not found!');
    err.status = 404
    console.log(err)
    next(err);
});

// Error middleware
app.use(errorMiddleware);

const server = app.listen(port, () => console.log(`App listening on port ${port}!`));
