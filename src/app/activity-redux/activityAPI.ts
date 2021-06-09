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

export async function filterActivities(
  startDate: Date,
  endDate: Date
): Promise<any> {
  try {
    let body: any = { startDate, endDate };
    const response = await axios.post(`${baseUrl}activities/filter`, body, {
      headers,
    });
    return response.data;
  } catch (error) {
    return false;
  }
}
