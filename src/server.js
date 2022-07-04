import http from "http";
import WebSocket from "ws";
import express from "express";

const app = express();
const port = 3000;

app.set("view engine", "pug");
app.set("views", __dirname + "/views");

app.use("/public", express.static(__dirname + "/public"));

//route 만들기
app.get("/", (req, res) => res.render("home"));
app.get("/*", (req, res) => res.redirect("/"));

const handleListen = () => console.log(`Listening on http://localhost:${port}`);

//app.listen(3000, handleListen);
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const sockets = [];

//socket: 연결된 브라우저
wss.on("connection", (socket) => {
  sockets.push(socket);
  socket["nickname"] = "Anon";
  console.log("Connected to Browser");
  socket.on("close", () => console.log("Disconnected from Browser"));
  socket.on("message", (msg) => {
    //JSON.parse: string -> object으로 만들기
    const message = JSON.parse(msg);
    switch (message.type) {
      case "new_message":
        sockets.forEach((aSocket) => aSocket.send(`${socket.nickname}: ${message.payload}`));
      case "nickname":
        socket["nickname"] = message.payload;
    }
  });
});
server.listen(3000, handleListen);
