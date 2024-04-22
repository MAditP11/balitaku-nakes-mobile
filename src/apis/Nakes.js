import axios from '../services/Axios';

// export const getUser = async (token) => {
//   let data = {
//     phone: phone,
//   };
//   const res = await axios.get("/auth/login",(
//     header
//   ));
//   return res;
// };

export const getUser = async (token) => {
  const res = await axios
    .get('/nakes/me', {
      headers: { Authorization: 'Bearer ' + token },
    })
    .catch((error) => console.log(error));
  return res;
};

export const updateUser = async (token, data) => {
  const res = await axios
    .post('/nakes/me/update', data, {
      headers: { Authorization: 'Bearer ' + token },
    })
    .catch((error) => console.log(error));
  return res;
};

export const setImage = async (token, data) => {
  const res = await axios
    .post('/nakes/me/set-image', data, {
      headers: { Authorization: 'Bearer ' + token },
    })
    .catch((error) => console.log(error));
  return res;
};

export const deleteImage = async (token, data) => {
  const res = await axios
    .post('/nakes/me/delete_photos', data, {
      headers: { Authorization: 'Bearer ' + token },
    })
    .catch((error) => console.log(error));
  return res;
};

export const deleteUser = async (token, id) => {
  const res = await axios
    .get(`/nakes/me/delete/${id}`, {
      headers: { Authorization: 'Bearer ' + token },
    })
    .catch((error) => console.log(error));
  return res;
};
