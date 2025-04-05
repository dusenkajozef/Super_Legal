import axios from "axios";

// Replace with your actual backend URL
const BASE_URL = "3.137.151.60";

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const apigetGoodMessage = async (token) => {
  try {
    const response = await apiClient.post("/chat", {});
    return response.data;
  } catch (error) {
    console.error("Error generating good message code:", error);
    throw error;
  }
};
