import express from "express";
import http from "http";
import WebSocket from "ws";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));

app.get("/", (_, res) => res.render("home"));
app.get("/*", (_, res) => res.redirect("/"));

const handleListen = () =>
  console.log(`Listening on http://localhost:3000 ws://localhost:3000`);

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const onSocketClose = () => console.log("Disconnected from the Browser");

const sockets = [];

wss.on("connection", (socket) => {
  sockets.push(socket);
  socket["nickname"] = "Ano";
  console.log("Connected to Browser!");
  socket.on("close", onSocketClose);
  socket.on("message", (msg) => {
    const message = JSON.parse(msg.toString());

    switch (message.type) {
      case "new_message": {
        sockets.forEach((aSocket) => {
          aSocket.send(`${socket.nickname} : ${message.payload}`);
        });
      }
      case "nickname": {
        socket["nickname"] = message.payload;
      }
    }
  });
});

server.listen(3000, handleListen);
