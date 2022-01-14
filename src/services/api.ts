import axios from 'axios';

// Exemplo

const api = axios.create({
  baseURL: 'http://localhost:3333',
});

export default api;
