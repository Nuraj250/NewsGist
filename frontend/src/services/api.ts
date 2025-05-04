import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000'; // your FastAPI backend

export const summarizeText = async (text: string, useMultilang: boolean = false) => {
  const response = await axios.post(`${API_BASE_URL}/summarize`, { text, use_multilang: useMultilang });
  return response.data;
};

