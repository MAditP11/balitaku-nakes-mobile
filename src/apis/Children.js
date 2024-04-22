import axios from '../services/Axios';

export const getChildren = async (token) => {
  const res = axios.get('/nakes/children', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  return res;
};

export const updateChildren = async (token, data) => {
  const res = await axios
    .post('/nakes/children/update', data, {
      headers: { Authorization: 'Bearer ' + token },
    })
    .catch((error) => console.log(error));
  return res;
};
