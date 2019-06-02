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

export const updateApi = async (name) => {
    const query = {
        method: 'POST',
        headers: {'Content-Type': 'application/json', 'accept': 'application/json'},
        body: JSON.stringify({'name': name})
    };
        return await fetch(`${url}/update`, query)
};