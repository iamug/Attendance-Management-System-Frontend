import axios from "axios";
import { baseUrl } from "../constants/index";

const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("user-token")}`,
};

interface location {
  lat: number;
  long: number;
}

export async function clockoutUserHomepage(
  email: string,
  location: location
): Promise<any> {
  try {
    let body = { email, location };
    const response = await axios.post(`${baseUrl}clockout/homepage`, body);
    return response;
  } catch (error) {
    return error.response;
  }
}
