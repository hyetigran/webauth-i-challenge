const express = require('express')

const server = express();

server.use(express.json());

server.use("/api/", isAuth, someRouter);


const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`)
});