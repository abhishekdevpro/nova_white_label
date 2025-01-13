import { createSlice } from "@reduxjs/toolkit";
import {
  createChat,
  fetchMessages,
  fetchUserChats,
  sendTextMessage,
} from "../thunkFunctions/userThunkFunctions";
const initialState = {
  messages: null,
  isMessageLoading: false,
  messageError: null,
  userChats: null,
  isUserChatsLoading: false,
  userChatsError: null,
  chatId: null,
  isChatIdLoading: false,
  chatIdError: false,
  sendTextMessageError: null,
  newMessage: null,
  currentChat: null,
};
const userMessageSlice = createSlice({
  name: "userMessageSlice",
  initialState,
  reducers: {
    setUserChats: (state, action) => {
      state.userChats = action.payload;
    },
    setIsUserChatsLoading: (state, action) => {
      state.isUserChatsLoading = action.payload;
    },
    setUserChatsError: (state, action) => {
      state.userChatsError = action.payload;
    },
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
    setChatId: (state, action) => {
      state.chatId = action.payload;
    },
    setIsMessageLoading: (state, action) => {
      state.isMessageLoading = action.payload;
    },
    setMessageError: (state, action) => {
      state.messageError = action.payload;
    },
    setSendTextMessageError: (state, action) => {
      state.sendTextMessageError = action.payload;
    },
    setNewMessage: (state, action) => {
      state.newMessage = action.payload;
      state.messages = [...state.messages, action.payload];
    },
    setTextMessage: (state, action) => {
      state.textMessage = action.payload;
    },
    setCurrentChat: (state, action) => {
      state.currentChat = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createChat.pending, (state) => {
        state.isUserChatsLoading = true;
      })
      .addCase(createChat.fulfilled, (state) => {
        state.isUserChatsLoading = false;
      })
      .addCase(createChat.rejected, (state, action) => {
        state.isUserChatsLoading = false;
        state.userChatsError = action.payload || "Failed to create a chat";
      })
      .addCase(fetchMessages.pending, (state) => {
        state.isMessageLoading = true;
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.isMessageLoading = false;
        state.messageError = action.payload || "Failed to fetch the messages";
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.isMessageLoading = false;
        state.messages = action.payload;
      })
      .addCase(fetchUserChats.pending, (state) => {
        state.isUserChatsLoading = true;
      })
      .addCase(fetchUserChats.rejected, (state, action) => {
        state.isUserChatsLoading = false;
        state.userChatsError =
          action.payload || "Failed to fetch the user Chats";
      })
      .addCase(fetchUserChats.fulfilled, (state, action) => {
        state.isUserChatsLoading = false;
        state.chatId = action.payload[0].chatid;
        console.log(action.payload[0].chatid, "hey");
        state.userChats = action.payload;
      })
      .addCase(sendTextMessage.fulfilled, (state, action) => {
        state.isMessageLoading = false;
        state.newMessage = action.payload;
        console.log(state.messages, "helog");
      })

      .addCase(sendTextMessage.pending, (state, action) => {
        state.isMessageLoading = true;
        state.sendTextMessageError = null;
      })
      .addCase(sendTextMessage.rejected, (state, action) => {
        state.isMessageLoading = false;
        state.sendTextMessageError = action.payload || "Failed to send message";
      });
  },
});

export const {
  setUserChats,
  setIsUserChatsLoading,
  setUserChatsError,
  setMessages,
  setChatId,
  setIsMessageLoading,
  setMessageError,
  setSendTextMessageError,
  setNewMessage,
  setTextMessage,
  setCurrentChat,
} = userMessageSlice.actions;
export default userMessageSlice.reducer;
