import axios from "axios";

// Add http:// and ensure it's the full URL
const BASE_URL = "http://3.137.151.60"; // include port if needed (e.g. :5000)

// Configure Axios instance
const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Exported function to call /chat
export const apiGetInitialGoodMessage = async (prompt) => {
  try {
    // Define request body
    const messages = {
      persona: "angel",
      history: [{ role: "user", content: prompt }],
    };
    const response = await apiClient.post("/chat", messages);
    return response.data;
  } catch (error) {
    console.error(
      "Error generating message:",
      error?.response?.data || error.message
    );
    throw error;
  }
};

export const apiGetBattleGoodMessage = async (
  initialPrompt,
  goodMessages,
  badMessages
) => {
  try {
    if (goodMessages.length === 0) {
      throw new Error("No good messages found");
    }
    const history = [];

    // First add the user's initial prompt
    history.push({ role: "user", content: initialPrompt });

    // Then, alternate between the assistant's (good) messages and user's (bad) responses
    for (let i = 0; i < goodMessages.length; i++) {
      // First, add the assistant's (good) message
      history.push({ role: "assistant", content: goodMessages[i] });
      history.push({ role: "user", content: badMessages[i] });
    }

    const body = {
      persona: "angel",
      history,
    };

    // Make the API request
    const response = await apiClient.post("/chat", body);
    return response.data;
  } catch (error) {
    console.error(
      "Error generating good battle message:",
      error?.response?.data || error.message
    );
    throw error;
  }
};
