const express = require('express');
const userRouter = require("./routes/user-router");
const server = express();
const session = require('express-session');
const KnexSessionStore = require('connect-session-knex')(session)


server.use(express.json());

server.use(session({
  name: 'tiger',
  secret: 'boblawblablawblog',
  cookie: {
    maxAge: 1000 * 60 * 60,
    secure: false,
    httpOnly: true,
  },
  resave: false,
  saveUninitialized: true,
  store: new KnexSessionStore({
    knex: require('../database/dbConfig.js'), // configured instance of knex
    tablename: 'sessions', // table that will store sessions inside the db, name it anything you want
    sidfieldname: 'sid', // column that will hold the session id, name it anything you want
    createtable: true, // if the table does not exist, it will create it automatically
    clearInterval: 1000 * 60 * 60, // time it takes to check for old sessions and remove them from the database to keep it clean and performant
  }),
}))

server.use("/api", userRouter);


const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`)
});