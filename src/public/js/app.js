const socket = io();

const welcome = document.getElementById("welcome");

const form = welcome.querySelector("form");

function backendDone(msg) {
  console.log(`The backend says: ${msg}`);
}

function handleRoomSubmit(event) {
  event.preventDefault();
  const input = form.querySelector("input");

  // 1st parameter: event name, 2nd parameter: can send anything (not only string),
  // you can enter numbers of argument that you want to send, and callback function should be placed on last item.
  socket.emit("enter_room", input.value, backendDone);

  input.value = "";
}

form.addEventListener("submit", handleRoomSubmit);
