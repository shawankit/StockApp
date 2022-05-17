import axios from 'axios';

const url = `http://${window.location.hostname}:8000`;
const API = axios.create({ baseURL : url});

export const getAllConsigment = () => API.get("/consigments");
export const createConsignment = (consigment) => API.post("/consigments", consigment);
export const getConsignment  = (id) => API.get(`/consigments/${id}`);
export const updateConsignment = (id, updatedConsigment) => API.put(`/consigments/${id}`, updatedConsigment);
export const deleteConsignment= (id) => API.delete(`/consigments/${id}`);

export const changeConsignmentLocation = (id,data) => API.post(`/consigments/${id}/godowns`,data);

export const getAllGodowns = () => API.get("/godowns");
export const createGodown = (godown) => API.post("/godowns", godown);
export const updateGodown = (id,godown) => API.put(`/godowns/${id}`, godown);

export const getAllItems = () => API.get("/items");
export const createItem = (item) => API.post("/items", item);
export const updateItem = (id,item) => API.put(`/items/${id}`, item);

export const getAllSuppliers = () => API.get("/suppliers");
export const getAllTransporters = () => API.get("/transporters");
export const getAllStats = () => API.get("/stats");
