var chatroom = new window.Chatroom({
  host: "http://localhost:5005",
  title: "Chat with Mike",
  container: document.querySelector(".chat-container"),
  welcomeMessage: "Hi, I am Mike. How may I help you?",
  speechRecognition: "en-US",
  voiceLang: "en-US",
});
chatroom.openChat();
