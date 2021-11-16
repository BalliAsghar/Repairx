import axios from 'axios';
const URI = 'http://localhost:8080/user';
const config = {
  headers: {
    'Content-type': 'application/json'
  }
};

const login = async (username, password) => {
  const user = await axios.post(`${URI}/auth`, { username, password }, config);
  if (user.data.authenticated === true) {
    return {
      auth: true,
      token: user.data.token
    };
  } else {
    return {
      auth: false,
      message: user.data.msg
    };
  }
};

const register = async (username, password) => {
  const user = await axios.post(
    `${URI}/register`,
    { username, password },
    config
  );
  if (user.data.authenticated === true) {
    return {
      message: 'User Registered',
      auth: true,
      token: user.data.token
    };
  } else {
    return {
      auth: false,
      message: user.data.message
    };
  }
};

const verify = async (token) => {
  try {
    const user = await axios.get(`${URI}/verify`, {
      headers: { 'x-auth-token': token }
    });
    if (user.data.authenticated === true) {
      return {
        auth: true,
        user: user.data
      };
    } else {
      return {
        auth: false,
        message: user.data.message
      };
    }
  } catch (error) {
    return error.response.data;
  }
};

const obt = {
  login,
  register,
  verify
};

export default obt;
