import axios from "axios";
const baseUrl = "/api/users/login";

const login = async (credentials) => {
  const response = await axios.post(baseUrl, credentials);
  console.log(response.data);
  return response.data;
};

export default  login ;
