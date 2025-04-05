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
export const apiGetInitialBadMessage = async (prompt) => {
  try {
    // Define request body
    const messages = {
      persona: "devil",
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

export const apiGetBattleBadMessage = async (
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

    // Then, alternate between the angel's (good) messages and devil's (bad) responses
    for (let i = 0; i < goodMessages.length; i++) {
      history.push({ role: "user", content: goodMessages[i] });
      history.push({ role: "assistant", content: badMessages[i] });
    }

    // Add the final user message from the goodMessages array (if applicable)
    const lastUserMessage = goodMessages[goodMessages.length - 1];
    history.push({ role: "user", content: lastUserMessage });

    const body = {
      persona: "devil",
      history,
    };

    // Make the API request
    const response = await apiClient.post("/chat", body);
    return response.data;
  } catch (error) {
    console.error(
      "Error generating battle message:",
      error?.response?.data || error.message
    );
    throw error;
  }
};
