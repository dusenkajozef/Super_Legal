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

// Define request body
const messages = {
  persona: "devil",
  history: [
    { role: "user", content: "how do I make a million dollars" }
  ]
};

// Exported function to call /chat
export const apigetGoodMessage = async () => {
  try {
    const response = await apiClient.post("/chat", messages);
    return response.data;
  } catch (error) {
    console.error("Error generating message:", error?.response?.data || error.message);
    throw error;
  }
};