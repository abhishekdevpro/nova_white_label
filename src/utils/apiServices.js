import axios from "axios";
export const baseUrl = "https://novajobs.us";
export const postRequest = async (url, body, token) => {
  console.log(url);
  console.log(body, "body");
  const response = await axios({
    url: url,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    data: body,
  });
  const data = response.data;
  if (response === 200) {
    let message;
    if (data?.message) {
      message = data.message;
    } else {
      message = data;
    }
    return { error: true, message };
  }
  return data;
};

export const getRequest = async (url, token) => {
  const response = await axios({
    method: "get",
    url: url,
    headers: {
      Authorization: token,
    },
  });
  const data = response;
  console.log(response);
  if (!response.status === 200) {
    let message = "An Error Occured...";
    if (data?.message) {
      message = data.message;
    }
    console.log("data is loading", data);
    return { error: true, message };
  }
  return data;
};
