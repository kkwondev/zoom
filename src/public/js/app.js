const socket = new WebSocket(`ws://${window.location.host}`);

const messageList = document.querySelector("ul");
const messageForm = document.querySelector("form");

const handleOpen = () => console.log("Connected to Server ✅");
const handleMessage = (message) => console.log("New message: ", message.data);
const handleClose = () => console.log("Disconnected from Server ❌");
const handleSendMessage = (message) => socket.send(message);

socket.addEventListener("open", handleOpen);

socket.addEventListener("message", handleMessage);

socket.addEventListener("close", handleClose);

const handleSubmit = (event) => {
  event.preventDefault();
  const input = messageForm.querySelector("input");
  handleSendMessage(input.value);
  input.value = "";
};

messageForm.addEventListener("submit", handleSubmit);
