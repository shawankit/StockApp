import axios from 'axios';

const url = `http://${window.location.hostname}:8000`;
const API = axios.create({ baseURL : url});

export const getAllConsigment = (filter) => API.get(`/consigments?${filter ? `consignmentNo=${filter}` : ""}`);
export const createConsignment = (consigment) => API.post("/consigments", consigment);
export const getConsignment  = (id) => API.get(`/consigments/${id}`);
export const updateConsignment = (id, updatedConsigment) => API.put(`/consigments/${id}`, updatedConsigment);
export const deleteConsignment= (id) => API.delete(`/consigments/${id}`);

export const changeConsignmentLocation = (id,data) => API.post(`/consigments/${id}/godowns`,data);

export const getAllGodowns = () => API.get("/godowns");
export const createGodown = (godown) => API.post("/godowns", godown);
export const updateGodown = (id,godown) => API.put(`/godowns/${id}`, godown);
export const deleteGodown = (id) => API.delete(`/godowns/${id}`);

export const getAllItems = () => API.get("/items");
export const createItem = (item) => API.post("/items", item);
export const updateItem = (id,item) => API.put(`/items/${id}`, item);
export const deleteItem = (id) => API.delete(`/items/${id}`);

export const getAllSuppliers = () => API.get("/suppliers");
export const createSupplier = (supplier) => API.post("/suppliers", supplier);
export const updateSupplier = (id,supplier) => API.put(`/suppliers/${id}`, supplier);
export const deleteSupplier = (id) => API.delete(`/suppliers/${id}`);

export const getAllTransporters = () => API.get("/transporters");
export const getAllStats = () => API.get("/stats");

export const getAllConsigmentWithFilter = (filter) => API.get(`/consigments?consignmentNo=${filter}`);
