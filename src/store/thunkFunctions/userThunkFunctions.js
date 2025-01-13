import { createAsyncThunk } from "@reduxjs/toolkit";
import { baseUrl, getRequest, postRequest } from "../../utils/apiServices";

export const fetchUserChats = createAsyncThunk(
  "message/fetchUserChats",
  async ({ userId }) => {
    try {
      const response = await getRequest(`${baseUrl}/get-client-chat/${userId}`);
      console.log(response);

      return response.data.chat;
    } catch (error) {
      return error;
    }
  }
);

export const fetchMessages = createAsyncThunk(
  "message/fetchMessages",

  async ({ chatid }) => {
    try {
      const response = await getRequest(
        `${baseUrl}/get-messages/${chatid}`,
        localStorage.getItem("jobSeekerLoginToken")
      );
      return response.data.data;
    } catch (error) {
      return error;
    }
  }
);

export const sendTextMessage = createAsyncThunk(
  "message/sendTextMessage",
  async ({ chatid, senderid, textMessage }) => {
    try {
      const response = await postRequest(
        `${baseUrl}/new-message`,
        {
          chatid: chatid,
          text: textMessage,
          senderid: senderid,
        },
        localStorage.getItem("jobSeekerLoginToken")
      );
      return response;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
);

export const createChat = createAsyncThunk(
  "message/createChat",
  async ({ userId, employeeId }) => {
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
      return response.data.employee;
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
        `${baseUrl}/get-client`,
        localStorage.getItem("jobSeekerLoginToken")
      );
      return response.data.client;
    } catch (error) {
      console.error(error);
    }
  }
);
