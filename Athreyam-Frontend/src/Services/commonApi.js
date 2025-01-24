//importing axios
import axios from 'axios'
//configure the axios
export const commonAPI = async(httpMethod,url,reqBody,reqHeader)=>{
  // Check if reqBody is an instance of FormData
  const isFormData = reqBody instanceof FormData;
    const reqConfig = {
        method:httpMethod,
        url:url,
        data:reqBody,
        headers : reqHeader ? reqHeader :  isFormData ? {} :
         { 'Content-Type': 'application/json'
        }
    }
    try {
      const response = await axios(reqConfig);
      return response;
  } catch (error) {
      if (error.response) {
          console.error('Error Response:', error.response.data);
          throw new Error(error.response.data.message || 'API Error');
      } else if (error.request) {
          console.error('No Response:', error.request);
          throw new Error('No response from server.');
      } else {
          console.error('Unexpected Error:', error.message);
          throw new Error(error.message || 'Unexpected error.');
      }
  }
}