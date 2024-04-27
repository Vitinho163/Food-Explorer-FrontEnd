import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://food-explorer-bhyu.onrender.com',
  withCredentials: true,
})
