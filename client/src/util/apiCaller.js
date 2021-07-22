import fetch from 'isomorphic-fetch';
import { Cookies  } from 'react-cookie';

export const API_URL = 'http://localhost:3300/api';

export default async (endpoint, method = 'get', body) => {
  const cookies = new Cookies();
  const token = cookies.get('token');
  const headers = { 'content-type': 'application/json' };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return fetch(`${API_URL}/${endpoint}`, {
    headers,
    method,
    body: JSON.stringify(body),
  })
  .then(response => response.json().then(json => ({ json, response })))
  .then(({ json, response }) => {
    return { data: json, res: response };
  })
  .then(
    response => response,
    error => error
  );
}
