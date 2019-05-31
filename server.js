const express = require("express");

const HubsRouter = require("./hubs/hubs-router.js");

const server = express();

server.use(express.json());
server.use("/api/posts", HubsRouter);

// server.get("/", (req, res) => {
//   res.send(`<h1>This is the SERVER.JS file</h1>`);
// });

module.exports = server;
