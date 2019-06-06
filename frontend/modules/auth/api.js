import moment from 'moment';
const url = 'http://192.168.0.10:8000/users';

export const registerApi = async (email, login, password) => {
    const query = {
        method: 'POST',
        headers: {'Content-Type': 'application/json', 'accept': 'application/json'},
        body: JSON.stringify({'email': email, 'login': login, 'password': password}),
    };
       return await fetch(`${url}/register`, query)
};

export const loginApi = async (login, password) => {
    const query = {
        method: 'POST',
        headers: {'Content-Type': 'application/json', 'accept': 'application/json'},
        body: JSON.stringify({'login': login, 'password': password})
    };
        return await fetch(`${url}/authenticate`, query)
};

export const updateApi = async (login, props) => {
    const body = {...props};
    if (body.birthDate) {
        const dateParts = body.birthDate.split('-');
        body.birthDate = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]).toString();
        console.log(body);
    }
    const query = {
        method: 'POST',
        headers: {'Content-Type': 'application/json', 'accept': 'application/json'},
        body: JSON.stringify({'login': login, ...body})
    };
        return await fetch(`${url}/updateUserInfo`, query)
};

export const getUserInfoApi = async (login) => {
    const query = {
        method: 'POST',
        headers: {'Content-Type': 'application/json', 'accept': 'application/json'},
        body: JSON.stringify({login})
    };
        return await fetch(`${url}/getUserInfo`, query)
};