import axios from "axios"

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND,
  headers: {
    "Content-Type": "application/json",
  },

  httpAgent: {
    //ignore unauthorized ssl certificate
    rejectUnauthorized: false,
  },
})

export default axiosInstance
