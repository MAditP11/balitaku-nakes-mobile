import axios from '../services/Axios';

export const setImageReport = async (token) => {
  const res = await axios
    .post('/nakes/penanganan/upload', {
      headers: { Authorization: 'Bearer ' + token },
      'Content-Type': 'multipart/form-data',
    })
    .catch((error) => console.log(error));
  return res;
};

export const setReport = async (token, data) => {
  const res = await axios
    .post('/nakes/penanganan/create', data, {
      headers: { Authorization: 'Bearer ' + token },
    })
    .catch((error) => console.log(error));
  return res;
};

export const getReport = async (token) => {
  const res = await axios
    .get('/nakes/penanganan', {
      headers: { Authorization: 'Bearer ' + token },
    })
    .catch((error) => console.log(error));
  return res;
};

export const deleteReport = async (token, id) => {
  const res = await axios
    .get(`/nakes/penanganan/delete/${id}`, {
      headers: { Authorization: 'Bearer ' + token },
    })
    .catch((error) => console.log(error));
  return res;
};

export const updateReport = async (token, data) => {
  const res = await axios
    .post('/nakes/penanganan/update', data, {
      headers: { Authorization: 'Bearer ' + token },
    })
    .catch((error) => console.log(error));
  return res;
};
