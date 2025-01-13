import { createSlice } from "@reduxjs/toolkit";
import {
  createEmployeeChat,
  fetchEmployeeMessages,
  fetchEmployeeUserChats,
  sendEmployeeTextMessage,
} from "../thunkFunctions/employeeThunkFunctions";
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
const employeeMessageSlice = createSlice({
  name: "employeeMessageSlice",
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
      .addCase(createEmployeeChat.pending, (state) => {
        state.isUserChatsLoading = true;
      })
      .addCase(createEmployeeChat.fulfilled, (state) => {
        state.isUserChatsLoading = false;
      })
      .addCase(createEmployeeChat.rejected, (state, action) => {
        state.isUserChatsLoading = false;
        state.userChatsError = action.payload || "Failed to create a chat";
      })
      .addCase(fetchEmployeeMessages.pending, (state) => {
        state.isMessageLoading = true;
      })
      .addCase(fetchEmployeeMessages.rejected, (state, action) => {
        state.isMessageLoading = false;
        state.messageError = action.payload || "Failed to fetch the messages";
      })
      .addCase(fetchEmployeeMessages.fulfilled, (state, action) => {
        state.isMessageLoading = false;
        state.messages = action.payload;
      })
      .addCase(fetchEmployeeUserChats.pending, (state) => {
        state.isUserChatsLoading = true;
      })
      .addCase(fetchEmployeeUserChats.rejected, (state, action) => {
        state.isUserChatsLoading = false;
        state.userChatsError =
          action.payload || "Failed to fetch the user Chats";
      })
      .addCase(fetchEmployeeUserChats.fulfilled, (state, action) => {
        state.isUserChatsLoading = false;
        state.chatId = action.payload[0].chatid;
        console.log(action.payload[0].chatid, "hey");
        state.userChats = action.payload;
      })
      .addCase(sendEmployeeTextMessage.fulfilled, (state, action) => {
        state.isMessageLoading = false;
        state.newMessage = action.payload;
        console.log(state.messages, "helog");
      })

      .addCase(sendEmployeeTextMessage.pending, (state, action) => {
        state.isMessageLoading = true;
        state.sendTextMessageError = null;
      })
      .addCase(sendEmployeeTextMessage.rejected, (state, action) => {
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
} = employeeMessageSlice.actions;
export default employeeMessageSlice.reducer;
