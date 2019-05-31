const url = 'http://10.203.65.126:8000/users';

export const registerApi = async (email, login, password) => {
    const query = {
        method: 'POST',
        headers: {'Content-Type': 'application/json', 'accept': 'application/json'},
        body: JSON.stringify({'email': email, 'name': login, 'password': password}),
    };
       return await fetch(`${url}/register`, query)
    };

export const loginApi = async (login, password) => {
    const query = {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: JSON.stringify({'name': login, 'password': password})
    };
        return await fetch(`${url}/authenticate`, query)
};