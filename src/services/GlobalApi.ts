const BASE_URL = 'http://localhost:3000/api/gemini-api';

const getGeminiApi = (userMsg: string) => {
  return fetch(BASE_URL + "?question=" + userMsg)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      return data;
    })
    .catch((error) => {
      console.log('Error while fetching Gemini Api', error);
      throw error; 
    });
}

export default getGeminiApi;
