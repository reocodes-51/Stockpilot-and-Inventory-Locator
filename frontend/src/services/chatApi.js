import API from "./api";

export const sendMessage = async (message) => {
  try {
    const res = await API.post("/chat", {
      message,
    });

    return res.data.reply;
  } catch (error) {
    console.error(error);
    return "Something went wrong.";
  }
};