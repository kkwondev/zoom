const socket = new WebSocket(`ws://${window.location.host}`);

const handleOpen = () => console.log("Connected to Server ✅");
const handleMessage = (message) => console.log("New message: ", message.data);
const handleClose = () => console.log("Disconnected from Server ❌");
const handleSendMessage = (message) => socket.send(message);

socket.addEventListener("open", handleOpen);

socket.addEventListener("message", handleMessage);

socket.addEventListener("close", handleClose);

setTimeout(() => {
  handleSendMessage("123123123");
}, 10000);
