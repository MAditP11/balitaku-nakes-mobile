import axios from '../services/Axios';

export const setImagePenanganan = async (token) => {
  const res = await axios
    .post('/nakes/aksi_penanganan/upload', {
      headers: { Authorization: 'Bearer ' + token },
      'Content-Type': 'multipart/form-data',
    })
    .catch((error) => console.log(error));
  return res;
};

export const setPenanganan = async (token, data) => {
  const res = await axios
    .post('/nakes/aksi_penanganan/create', data, {
      headers: { Authorization: 'Bearer ' + token },
    })
    .catch((error) => console.log(error));
  return res;
};
