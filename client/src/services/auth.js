import api from './api';

export const register = async (username, password, email) => {
  const res = await api.post('/users/register', { username, password, email });
  if (res.data.token) {
    localStorage.setItem('token', res.data.token);
  }
  return res.data;
};

export const login = async (username, password) => {
  try {
    const res = await api.post('/users/login', { username, password });
    if (res.data.token) {
      localStorage.setItem('token', res.data.token);
    }
    return res.data;
  } catch (error) {
    console.error('Login failed:', error);
    throw error; // Re-throw to be caught by the component
  }
};

export const logout = () => {
  localStorage.removeItem('token');
};

export const getCurrentUser = () => {
  return localStorage.getItem('token');
};