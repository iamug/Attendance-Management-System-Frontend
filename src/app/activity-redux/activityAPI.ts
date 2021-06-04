import axios from "axios";
import { baseUrl } from "../../constants/index";

const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("user-token")}`,
};

export async function getActivities(): Promise<any> {
  try {
    const response = await axios.get(`${baseUrl}activities`, { headers });
    return response.data;
  } catch (error) {
    return false;
  }
}
