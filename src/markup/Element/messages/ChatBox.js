import React, { useEffect, useState } from 'react';
import { FaTelegram, FaUserCircle, FaPaperclip, FaSmile, FaEllipsisV } from "react-icons/fa";
import SearchBox from './SearchBox';
import styled from 'styled-components';
import ChatboxContactList from './ContactList';
import axios from "axios";
const Container = styled.div`
  display: flex;
  height: 100%;
  background-color: #f0f2f5;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
`;

const Sidebar = styled.div`
  width: 350px;
  background-color: #ffffff;
  border-right: 1px solid #e5e7eb;
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    width: 280px;
  }
`;

const MainChat = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const ChatHeader = styled.div`
  background-color: #ffffff;
  padding: 16px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #e5e7eb;
  height: 72px;
`;

const HeaderInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  color: #64748b;
`;

const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #e5e7eb;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05);
  }
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserName = styled.h2`
  font-size: 16px;
  font-weight: 600;
  color: #1e293b;
  margin: 0;
`;

const UserStatus = styled.p`
  font-size: 13px;
  color: #22c55e;
  margin: 0;
`;

const MessagesContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 24px;
  background-color: #f8fafc;
  display: flex;
  flex-direction: column;
  gap: 16px;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  &::-webkit-scrollbar-thumb {
    background: #c0c0c0;
    border-radius: 3px;
  }
`;

const MessageWrapper = styled.div`
  display: flex;
  justify-content: ${(props) => (props.isSender ? "flex-start" : "flex-end")};
`;

const MessageBubble = styled.div`
  max-width: 65%;
  padding: 12px 16px;
  border-radius: 16px;
  position: relative;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-1px);
  }
`;

const SenderMessage = styled(MessageBubble)`
  background-color: #ffffff;
  color: #1e293b;
  border-bottom-left-radius: 4px;
  border: 1px solid #e5e7eb;
`;

const ReceiverMessage = styled(MessageBubble)`
  background-color: #3b82f6;
  color: #ffffff;
  border-bottom-right-radius: 4px;
`;

const MessageContent = styled.p`
  margin: 0;
  word-break: break-word;
`;

const MessageTime = styled.div`
  font-size: 11px;
  opacity: 0.8;
  margin-top: 4px;
  text-align: right;
`;

const InputContainer = styled.div`
  background-color: #ffffff;
  padding: 16px 24px;
  border-top: 1px solid #e5e7eb;
  display: flex;
  align-items: center;
  gap: 16px;
`;

const InputWrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  background-color: #f1f5f9;
  border-radius: 24px;
  padding: 8px 16px;
  transition: all 0.2s;

  &:focus-within {
    background-color: #ffffff;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.3);
  }
`;

const Input = styled.input`
  flex: 1;
  border: none;
  background: transparent;
  padding: 8px;
  font-size: 14px;
  color: #1e293b;

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: #94a3b8;
  }
`;

const IconButton = styled.button`
  background: transparent;
  border: none;
  color: #64748b;
  padding: 8px;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: #3b82f6;
    background-color: #f1f5f9;
  }
`;

const SendButton = styled(IconButton)`
  background-color: #3b82f6;
  color: #ffffff;
  padding: 10px;

  &:hover {
    background-color: #2563eb;
    color: #ffffff;
    transform: scale(1.05);
  }
`;

const ChatBoxContentField = () => {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [activeChat, setActiveChat] = useState(15);
  const [contacts, setContacts] = useState([
    {
      id: 15,
      name: "John Snow",
      avatar: "https://avatar.iran.liara.run/public/boy?username=Ash",
      lastMessage: "Hello, how are you?",
      time: "4:30 PM",
      unreadCount: 3,
    },
    {
      id: 16,
      name: "Emma Watson",
      avatar: "https://avatar.iran.liara.run/public/girl?username=Emma",
      lastMessage: "See you later",
      time: "3:45 PM",
      unreadCount: 1,
    },
  ]);
  const [userData, setUserData] = useState({
    first_name: "",
    last_name: "",
    photo: "",
  });

  const token = localStorage.getItem("jobSeekerLoginToken");

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const jobSeekerToken = localStorage.getItem("jobSeekerLoginToken");
        const employerToken = localStorage.getItem("employeeLoginToken");

        let apiUrl = "";
        let token = "";

        if (jobSeekerToken) {
          apiUrl = "https://api.novajobs.us/api/jobseeker/user-profile";
          token = jobSeekerToken;
        } else if (employerToken) {
          apiUrl = "https://api.novajobs.us/api/employeer/employeer-profile";
          token = employerToken;
        } else {
          console.error("No valid token found.");
          return;
        }

        const response = await axios({
          method: "GET",
          url: apiUrl,
          headers: {
            Authorization: token,
          },
        });

        const data = response.data.data;

        if (data.employeer_detail) {
          setUserData({
            first_name: data.employeer_detail.first_name,
            last_name: data.employeer_detail.last_name,
            photo: data.employeer_detail.photo || "", // Ensure photo fallback if missing
          });
        } else {
          setUserData({
            first_name: data.first_name,
            last_name: data.last_name,
            photo: data.photo || "", // Ensure photo fallback if missing
          });
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  useEffect(() => {
    const ws = new WebSocket("wss://api.sentryspot.co.uk/ws");

    ws.onopen = () => {
      console.log("WebSocket connection opened");
    };

    ws.onmessage = (event) => {
      const incomingMessage = JSON.parse(event.data);
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          content: incomingMessage.message,
          time: incomingMessage.timestamp || new Date().toLocaleTimeString(),
          sender: incomingMessage.sender || "John",
        },
      ]);
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed");
    };

    setSocket(ws);

    return () => {
      ws.close();
    };
  }, []);

  const sendMessage = () => {
    if (inputValue.trim() === "") return;

    const data = {
      message: inputValue,
      receiver_id: activeChat,
      sender_id: 29,
    };

    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify(data));
      setInputValue("");
    } else {
      console.error("WebSocket is not open");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <Container>
      <Sidebar>
        <SearchBox />
        <ChatboxContactList contacts={contacts} setActiveChat={setActiveChat} />
      </Sidebar>

      <MainChat>
        <ChatHeader>
          <HeaderInfo>
            <Avatar
              src={
                userData.photo ||
                "https://avatar.iran.liara.run/public/boy?username=Ash"
              }
              alt={`${userData.first_name} ${userData.last_name}`}
            />
            <UserInfo>
              <UserName>{`${userData.first_name} ${userData.last_name}`}</UserName>
              <UserStatus>Online</UserStatus>
            </UserInfo>
          </HeaderInfo>
          <HeaderActions>
            <IconButton>
              <FaUserCircle size={20} />
            </IconButton>
            <IconButton>
              <FaEllipsisV size={20} />
            </IconButton>
          </HeaderActions>
        </ChatHeader>

        <MessagesContainer>
          {messages.map((msg, index) => (
            <MessageWrapper key={index} isSender={msg.sender === "John"}>
              {msg.sender === "John" ? (
                <SenderMessage>
                  <MessageContent>{msg.content}</MessageContent>
                  <MessageTime>{msg.time}</MessageTime>
                </SenderMessage>
              ) : (
                <ReceiverMessage>
                  <MessageContent>{msg.content}</MessageContent>
                  <MessageTime>{msg.time}</MessageTime>
                </ReceiverMessage>
              )}
            </MessageWrapper>
          ))}
        </MessagesContainer>

        <InputContainer>
          <IconButton>
            <FaPaperclip size={20} />
          </IconButton>
          <InputWrapper>
            <Input
              type="text"
              placeholder="Type a message..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <IconButton>
              <FaSmile size={20} />
            </IconButton>
          </InputWrapper>
          <SendButton onClick={sendMessage}>
            <FaTelegram size={20} />
          </SendButton>
        </InputContainer>
      </MainChat>
    </Container>
  );
};

export default ChatBoxContentField;