import axios from "axios";
import { baseUrl } from "../../constants/index";

export async function loginUser(userObj: object) {
  try {
    const response = await axios.post(`${baseUrl}login`, userObj);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

export async function registerUser(userObj: object) {
  try {
    const response = await axios.post(`${baseUrl}register`, userObj);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}
