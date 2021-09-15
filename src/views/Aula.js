import React, { useState, useRef, useEffect } from 'react'
import Form from '../components/UserForm'
import Chat from '../components/Chat'
import io from "socket.io-client"
import immer from 'immer'


const initialMessagesState = {
  Aula: [],
  Exercicios: [],
};

function Aula() {
  const [username, setUsername] = useState("");
  const [connected, setConnected] = useState(false);
  const [currentChat, setCurrentChat] = useState({ isChannel: true, chatName: "Aula", receiverId: "" });
  const [connectedRooms, setConnectedRooms] = useState(["Aula"]);
  const [allUsers, setAllUsers] = useState([]);
  const [messages, setMessages] = useState(initialMessagesState);
  const [message, setMessage] = useState("");
  const socketRef = useRef();
  
  console.log( '%%%', allUsers);
 
  const teacherOnline = allUsers.filter((item) => item.username === "Professor(a)")

  console.log( '@@@', teacherOnline);

  function handleMessageChange(e) {
    setMessage(e.target.value)
  }

  useEffect(() => {
    setMessage("");
  }, [messages]);

  function sendMessage() {
    const payload = {
      content: message,
      to: currentChat.isChannel ? currentChat.chatName : currentChat.receiverId,
      sender: username,
      chatName: currentChat.chatName,
      isChannel: currentChat.isChannel,
    };
    socketRef.current.emit("send.message", payload);
    console.log('###', payload);
    const newMessages = immer(messages, draft => {
      draft[currentChat.chatName].push({
        sender: username,
        content: message
      });
    });
    setMessages(newMessages)
  }

  function roomJoinCallback(incomingMessages, room) {
    const newMessages = immer(messages, draft => {
      draft[room] = incomingMessages;
    });
    setMessages(newMessages)
  }

  function joinRoom(room) {
    const newConnectedRooms = immer(connectedRooms, draft => {
      draft.push(room);
    });
    socketRef.current.emit("join.room", room, (messages) => roomJoinCallback(messages, room));
    setConnectedRooms(newConnectedRooms)
  }

  function toggleChat(currentChat) {
    if (!messages[currentChat.chatName]) {
      const newMessages = immer(messages, draft => {
        draft[currentChat.chatName] = [];
      });
      setMessages(newMessages);
    }
    setCurrentChat(currentChat);
  }

  function handleChange(e) {
    setUsername(e.target.value)
  }

  function connect() {
    setConnected(true);
    socketRef.current = io("http://localhost:3333");
    socketRef.current.emit("join.server", username);
    socketRef.current.on("message", (greeting) => {
      console.log(greeting);
    })
    socketRef.current.emit("join.room", "Exercicios", (messages) => roomJoinCallback(messages, "Exercicios"));
    socketRef.current.on("new.user", allUsers => {
      setAllUsers(allUsers);
    });
    socketRef.current.on("new.message", ({ content, sender, chatName }) => {
      setMessages(messages => {
        const newMessages = immer(messages, draft => {
          if (draft[chatName]) {
            draft[chatName].push({ content, sender });
          } else {
            draft[chatName] = [{ content, sender }]
          }
        });
        return newMessages
      });
    });
  }

  let body;
  
  if (connected) {
    body = (
      <Chat
        message={message}
        handleMessageChange={handleMessageChange}
        sendMessage={sendMessage}
        yourId={socketRef.current ? socketRef.current.id: ""}
        teacher={teacherOnline}
        allUsers={allUsers}
        joinRoom={joinRoom}
        connectedRooms={connectedRooms}
        currentChat={currentChat}
        toggleChat={toggleChat}
        messages={messages[currentChat.chatName]}
      />
    )
  } else {
    body = (
        <Form 
          username={username}
          onChange={handleChange}
          connect={connect} 
        />
    )
  }

  return (
    <div>
      {body}
    </div>
  )
}

export default Aula