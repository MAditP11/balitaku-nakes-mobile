import axios from '../services/Axios';

export const setImageReport = async (token) => {
  const res = await axios
    .post('/nakes/laporan/upload', {
      headers: { Authorization: 'Bearer ' + token },
      'Content-Type': 'multipart/form-data',
    })
    .catch((error) => console.log(error));
  return res;
};

export const setReport = async (token, data) => {
  const res = await axios
    .post('/nakes/laporan/create', data, {
      headers: { Authorization: 'Bearer ' + token },
    })
    .catch((error) => console.log(error));
  return res;
};

export const getReport = async (token) => {
  const res = await axios
    .get('/nakes/laporan', {
      headers: { Authorization: 'Bearer ' + token },
    })
    .catch((error) => console.log(error));
  return res;
};

export const deleteReport = async (token, id) => {
  const res = await axios
    .get(`/nakes/laporan/delete/${id}`, {
      headers: { Authorization: 'Bearer ' + token },
    })
    .catch((error) => console.log(error));
  return res;
};

export const updateReport = async (token, data) => {
  const res = await axios
    .post('/nakes/laporan/update', data, {
      headers: { Authorization: 'Bearer ' + token },
    })
    .catch((error) => console.log(error));
  return res;
};
