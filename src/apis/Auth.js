import axios from '../services/Axios';

export const otp = async (phone) => {
  let data = {
    phone: phone,
  };
  const res = await axios.post('auth/login', data);
  return res;
};

export const authenticate = async (code, phone) => {
  let data = {
    code: code,
    phone: phone,
  };
  const res = await axios.post('/auth/verify', data);
  return res;
};

// export const data_completion = async (data, token) => {
//   let headers = {
//     'Content-Type': 'application/json',
//     Authorization: `Bearer ${token}`,
//   };
//   const res = await axios.post('user/fill-data', data, { headers });
//   return res;
// };
