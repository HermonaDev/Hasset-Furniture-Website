import axios from "axios"
const newRequest = axios.create({
    baseURL: "hasset-backend.vercel.app/"
})

export default newRequest;