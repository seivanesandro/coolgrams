import {api, requestConfig } from '../utils/config';

//services vao ter as requisiçoes e os dados que elas precisam de fornecer para o backend e acessar a api

//register an user
const register = async (data) => {
    const config = requestConfig('POST', data);

    try {
        const res = await fetch(
            api + '/users/register',
            config
        )
            .then((res) => res.json())
            .catch((err) => err);

        if (res._id) {
            localStorage.setItem(
                'user',
                JSON.stringify(res)
            );
        }

        return res;
    } catch (error) {
        //show error if register faild
        console.log(error);
    }
}; 

// Logout a user
const logout = () => {
  localStorage.removeItem("user");
};


// Sign in a user
const login = async (data) => {
  const config = requestConfig("POST", data);

  try {
    const res = await fetch(api + "/users/login", config)
      .then((res) => res.json())
      .catch((err) => err);

    if (res._id) {
      localStorage.setItem("user", JSON.stringify(res));
    }

    return res;

  } catch (error) {
      //show error if login faild
      console.log(error);
  }
};

const authService = {
    register,
    logout,
    login
};

export default authService;