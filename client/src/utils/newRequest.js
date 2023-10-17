import axios from "axios"
const newRequest = axios.create({
    baseURL: "hasset-backend.vercel.app/api"
})

export default newRequest;