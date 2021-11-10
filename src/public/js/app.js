const socket = io();

const welcome = document.getElementById("welcome");

const room = document.getElementById("room");

room.hidden = true;
let roomName;

const form = welcome.querySelector("form");

function addMessage(message) {
  const ul = room.querySelector("ul");

  const li = document.createElement("li");
  li.innerText = message;
  ul.appendChild(li);
}

function showRoom() {
  welcome.hidden = true;
  room.hidden = false;
  const h3 = room.querySelector("h3");
  h3.innerText = `Room ${roomName}`;
}

function handleRoomSubmit(event) {
  event.preventDefault();
  const input = form.querySelector("input");

  // 1st parameter: event name, 2nd parameter: can send anything (not only string),
  // you can enter numbers of argument that you want to send, and callback function should be placed on last item.
  socket.emit("enter_room", input.value, showRoom);
  roomName = input.value;

  input.value = "";
}

form.addEventListener("submit", handleRoomSubmit);

socket.on("welcome", () => {
  addMessage("someone joined!");
});
