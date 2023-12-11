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

        if (res) {
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

//
const authService = {
    register,
};

export default authService;