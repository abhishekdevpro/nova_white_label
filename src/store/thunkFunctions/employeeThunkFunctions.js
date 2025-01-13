import { createAsyncThunk } from "@reduxjs/toolkit";
import { baseUrl, getRequest, postRequest } from "../../utils/apiServices";

export const fetchEmployeeUserChats = createAsyncThunk(
  "message/fetchEmployeeUserChats",
  async ({ userId }) => {
    console.log("user id", userId);
    try {
      const response = await getRequest(
        `${baseUrl}/get-employee-chat/${userId}`
      );
      console.log(response.data.chat, "user id");
      return response.data.chat;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
);

export const fetchEmployeeMessages = createAsyncThunk(
  "message/fetchEmployeeMessages",

  async ({ chatid }) => {
    console.log(chatid);
    try {
      const response = await getRequest(
        `${baseUrl}/get-messages-employee/${chatid}`,
        localStorage.getItem("employeeLoginToken")
      );
      console.log(response, "fetch message function");
      return response.data.data;
    } catch (error) {
      return error;
    }
  }
);

export const sendEmployeeTextMessage = createAsyncThunk(
  "message/sendEmployeeTextMessage",
  async ({ chatid, senderid, textMessage }) => {
    console.log("textmessage", chatid, senderid, textMessage);
    try {
      const response = await postRequest(
        `${baseUrl}/new-message-influencer`,
        {
          chatid: chatid,
          text: textMessage,
          senderid: senderid,
        },
        localStorage.getItem("employeeLoginToken")
      );
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
);

export const createEmployeeChat = createAsyncThunk(
  "message/createEmployeeChat",
  async ({ userId, employeeId }) => {
    console.log("hello");

    try {
      const response = await postRequest(`${baseUrl}/new-chat`, {
        userId,
        employeeId,
      });

      return response;
    } catch (error) {
      return error;
    }
  }
);

export const fetchEmployeeUserData = createAsyncThunk(
  "message/fetchEmployeeUserData",
  async () => {
    try {
      const response = await getRequest(
        `${baseUrl}/get-employee`,
        localStorage.getItem("employeeLoginToken")
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
);

export const fetchUserData = createAsyncThunk(
  "message/fetchUserData",
  async () => {
    try {
      const response = await getRequest(
        `${baseUrl}/get-user`,
        localStorage.getItem("jobSeekerLoginToken")
      );
      console.log(response, "dsadsa");
      return response.data.client;
    } catch (error) {
      console.error(error);
    }
  }
);
