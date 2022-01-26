import axios from "axios";
import { baseUrl } from "../constants/index";

// const headers = {
//   "Content-Type": "application/json",
//   Authorization: `Bearer ${localStorage.getItem("user-token")}`,
// }

interface location {
  lat: number;
  long: number;
}

export async function clockinUserHomepage(
  email: string,
  location: location
): Promise<any> {
  try {
    let body = { email, location };
    const response = await axios.post(`${baseUrl}clockin/homepage`, body);
    return response;
  } catch (error) {
    return error.response;
  }
}

export async function clockinUserDashboard(
  location:{
    lat:number,   
    long:number
  },
  type:string,
  token:string,
  openCi?:boolean
): Promise<any> {
  try {
    const clock = openCi ? 'clockin' : 'clockout'

    let body = {
      location
    };

    const response = await axios.post(`${baseUrl}${clock}`, body, {headers:{
      "Content-Type": type,
       Authorization: token,
    }} );
    return response;
  } catch (error) {
    return error.response;
  }
}


