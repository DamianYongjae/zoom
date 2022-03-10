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

function handleMessageSubmit(event) {
  event.preventDefault();
  const input = room.querySelector("#msg input");
  const value = input.value;
  socket.emit("new_message", input.value, roomName, () => {
    addMessage(`You: ${value}`);
  });
  input.value = "";
}

function handleNicknameSubmit(event) {
  event.preventDefault();
  const input = room.querySelector("#name input");
  const value = input.value;
  socket.emit("nickname", input.value);
}

function showRoom() {
  welcome.hidden = true;
  room.hidden = false;
  const h3 = room.querySelector("h3");
  h3.innerText = `Room ${roomName}`;
  const msgForm = room.querySelector("#msg");
  // const nameForm = room.querySelector("#name");
  msgForm.addEventListener("submit", handleMessageSubmit);
  // nameForm.addEventListener("submit", handleNicknameSubmit);
}

function handleRoomSubmit(event) {
  event.preventDefault();
  const room = form.querySelector("#roomname");
  // const nick = form.querySelector("#username");

  // 1st parameter: event name, 2nd parameter: can send anything (not only string),
  // you can enter numbers of argument that you want to send, and callback function should be placed on last item.
  // socket.emit("enter_room", room.value, nick.value, showRoom);
  socket.emit("enter_room", room.value, showRoom);
  // socket.emit("nickname", nick.value);
  roomName = room.value;

  room.value = "";
}

form.addEventListener("submit", handleRoomSubmit);

socket.on("welcome", (user, newCount) => {
  const h3 = room.querySelector("h3");
  h3.innerText = `Room ${roomName} (${newCount})`;
  addMessage(`${user} joined!`);
});

socket.on("bye", (left, newCount) => {
  const h3 = room.querySelector("h3");
  h3.innerText = `Room ${roomName} (${newCount})`;
  addMessage(`${left} left!`);
});

socket.on("new_message", addMessage);

socket.on("room_change", (rooms) => {
  const roomList = welcome.querySelector("ul");
  roomList.innerHTML = "";
  if (rooms.length === 0) {
    return;
  }
  rooms.forEach((room) => {
    const li = document.createElement("li");
    li.innerText = room;
    roomList.append(li);
  });
});
