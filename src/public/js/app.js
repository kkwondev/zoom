const socket = new WebSocket(`ws://${window.location.host}`);

const messageList = document.querySelector("ul");
const messageForm = document.querySelector("#message");
const nickForm = document.querySelector("#nickname");
const handleOpen = () => console.log("Connected to Server ✅");
const handleMessage = (message) => {
  const li = document.createElement("li");
  li.innerText = message.data;
  messageList.append(li);
};
const handleClose = () => console.log("Disconnected from Server ❌");
const handleSendMessage = (message) => socket.send(message);

socket.addEventListener("open", handleOpen);

socket.addEventListener("message", handleMessage);

socket.addEventListener("close", handleClose);

const handleSubmit = (event) => {
  event.preventDefault();
  const input = messageForm.querySelector("input");
  if (input.value !== "") {
    handleSendMessage(makeMessage("new_message", input.value));
    const li = document.createElement("li");
    li.innerText = `You : ${input.value}`;
    messageList.append(li);
    input.value = "";
  } else {
    alert("메세지를 입력하세요");
  }
};

const handleNickSubmit = (event) => {
  event.preventDefault();
  const input = nickForm.querySelector("input");
  handleSendMessage(makeMessage("nickname", input.value));
  input.value = "";
};

const makeMessage = (type, payload) => {
  const msg = { type, payload };
  return JSON.stringify(msg);
};

messageForm.addEventListener("submit", handleSubmit);

nickForm.addEventListener("submit", handleNickSubmit);
