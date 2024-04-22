import axios from '../services/Axios';

export const getMaster = async (token) => {
  const res = await axios
    .get('/nakes/master', {
      headers: { Authorization: 'Bearer ' + token },
    })
    .catch((error) => console.log(error));
  return res;
};
