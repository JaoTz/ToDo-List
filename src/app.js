const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();
const authRouter = require('./router/auth.router');
const projectRouter = require('./router/project.router');
const taskRouter = require('./router/task.router');
const userRouter = require('./router/user.router');

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(authRouter);
app.use('/user', userRouter);
app.use('/project', projectRouter);
app.use('/task', taskRouter);

module.exports = app;
