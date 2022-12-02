import axios from "axios";

const API = axios.create({baseURL: "http://localhost:5000"})

export const getTimelinePosts = (id) => API.get(`/posts/${id}/timeline`)