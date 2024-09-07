import axios from "axios";
const baseURL = "http://localhost:3001/persons/";

// GET ALL PERSONS
const getAll = () => {
  const request = axios.get(baseURL);
  return request.then((response) => response.data);
};

// ADD PERSONS
const createObj = (newObject) => {
  const request = axios.post(baseURL, newObject);
  return request.then((response) => response.data);
};

const updateObj = (newObject, id) => {
  const request = axios.put(`${baseURL}${id}`, newObject);
  return request.then((response) => response.data);
};

// DELETE PERSON
const deleteObj = (id) => {
  const request = axios.delete(`${baseURL}${id}`);
  return request.then((response) => response.data);
};

export default { getAll, createObj, deleteObj, updateObj };
