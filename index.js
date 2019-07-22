const express = require('express');
const userRouter = require("./routes/user-router");
const server = express();

server.use(express.json());

server.use("/api", userRouter);


const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`)
});