import axios from "axios"

const BASE_URL = 'http://localhost:3000/api/gemini-api'

const getGeminiApi = (userMsg: string) => axios.get(BASE_URL+"?question="+userMsg)

export default getGeminiApi;
