import moment from 'moment';
const url = 'http://10.203.65.126:8000/users';

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
    if (props.birthDate) {
        props.birthDate = moment(props.birthDate, 'YYYY-MM-DD');
        console.log(props);
    }
    const query = {
        method: 'POST',
        headers: {'Content-Type': 'application/json', 'accept': 'application/json'},
        body: JSON.stringify({'login': login, ...props})
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