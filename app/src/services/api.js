import Axios from "axios";
import { API_URL } from "../config";

class api {
  constructor() {
    this.token = "";
  }

  getToken() {
    return this.token;
  }

  setToken(token) {
    this.token = token;
  }

  async get(path, params) {
    try {
      const response = await Axios.get(`${API_URL}${path}`, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${this.token}`,
        },
        params: params ? params : {},
      });
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async put(path, body) {
    try {
      const response = await Axios.put(`${API_URL}${path}`, body, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${this.token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async delete(path) {
    try {
      const response = await Axios.delete(`${API_URL}${path}`, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${this.token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async post(path, body) {
    try {
      const response = await Axios.post(`${API_URL}${path}`, body, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${this.token}`,
        },
      });

      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

const API = new api();
export default API;
