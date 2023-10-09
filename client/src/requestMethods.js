import axios from "axios";

const BASE_URL = "http://localhost:5000/api/";
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZjQ4MTFmNTcwNjg4YTIxZDljOWU5OSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY5NDI5MzQ4MCwiZXhwIjoxNjk0NzI1NDgwfQ.VeYzH4LEJ7CsXak0JoURSNT4MAyoz-A7ZN_Afjh9k8c"
export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  header: { token: `Bearer ${TOKEN}` },
});