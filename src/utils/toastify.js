import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const showToastError = (error) => {
  toast.error(`${error}`, {
    data: {
      title: "Error",
      text: error,
    },
  });
};
export const showToastSuccess = (msg) => {
  toast.success(`${msg}`, {
    data: {
      title: "Success",
      text: msg,
    },
  });
};
