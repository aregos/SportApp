const url = 'http://10.203.65.126:8000/users';

export const registerApi = async (email, login, password) => {
    try {
    const query = {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded', 'accept': 'application/json'},
        body: JSON.stringify({'email': email, 'name': login, 'password': password}),
    };
        await fetch(`${url}/register`, query)
            .then(response => {
                if (response.ok) {
                    return response;
                }
            },
                response => {
                    return response;
                });
    }
    catch (err) {
        return Promise.resolve(err);
    }
};

export const loginApi = async (login, password) => {
    try {
    const query = {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: JSON.stringify({'name': login, 'password': password})
    };
        const res = await fetch(`${url}/authenticate`, query)
            .then(response => {
                if (response.ok) {
                    return res;
                }
            })
        return res;
    }
    catch (err) {
        return Promise.resolve(err);
    }
};