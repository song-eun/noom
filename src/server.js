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

//socket: 연결된 브라우저
wss.on("connection", (socket) => {
  console.log("Connected to Browser");
  socket.on("close", () => console.log("Disconnected frome Browser"));
  socket.send("hello!!!");
});
server.listen(3000, handleListen);
