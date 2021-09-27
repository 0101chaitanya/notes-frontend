import axios from "axios";

const baseUrl = "http://localhost:3001/api/notes" ;//"https://hidden-reef-53498.herokuapp.com/api/notes"; "http://localhost:3001/api/notes"

let token = null;

const setToken = newToken =>{

  console.log("new token: " + newToken);
  token = "Bearer " + newToken.split(" ")[1];
  
}
const getAll = async() => {
  const config = {
    headers: {
      Authorization: token,
    },
  };
  console.log(config);
  const request = await axios.get(baseUrl, config);
  return await request.res.data;
};

const create = async(newObject) => {
  const config = {
    headers: {
      Authorization: token
    } 
  }
  const request = await axios.post(baseUrl, newObject , config);
  return await request.data;
};

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then((res) => res.data);
};

export { getAll, create, update ,setToken };
