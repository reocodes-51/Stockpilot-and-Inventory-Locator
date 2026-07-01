import API from "./api";

export const generateAIInsights = async () => {
  try {
    const res = await API.post("/ai/insights");
    return res.data.summary;
  } catch (error) {
    console.error(error);
    return "Unable to generate AI insights.";
  }
};