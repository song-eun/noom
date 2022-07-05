const socket = io();

const welcome = document.getElementById("welcome");
const form = welcome.querySelector("form");

function handleRoomSubmit(event) {
  event.preventDefault();
  const input = document.querySelector("input");
  //socket.emit("원하는 이벤트 이름", 보낼 내용(object도 보낼 수 있음), 서버에서 호출하는 function)
  socket.emit("enter_room", { payload: input.value }, () => {
    console.log("server is done");
  });
  input.value = "";
}

form.addEventListener("submit", handleRoomSubmit);
