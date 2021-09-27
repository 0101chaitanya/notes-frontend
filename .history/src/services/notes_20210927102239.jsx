import axios from "axios";

const baseUrl = "/api/notes" ;//"https://hidden-reef-53498.herokuapp.com/api/notes"; "http://localhost:3001/api/notes"

let token = null;

const setToken = newToken =>{
  console.log("new token: " + newToken);
  token = newToken;
}
const getAll = () => {
  const request = axios.get(baseUrl);
  const nonExisting = {
    id: 10000,
    content: "This note is not saved to server",
    date: "2019-05-30T17:30:31.098Z",
    important: true,
  };
  return request.then((res) => res.data.concat(nonExisting));
};

const create = (newObject) => {
  const config = {
    headers: {
      Authorization: token
    } 
  }
  const request = axios.post(baseUrl, newObject , config);
  return request.then((res) => res.data);
};

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then((res) => res.data);
};

export { getAll, create, update ,setToken };
