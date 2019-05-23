const url = 'http://192.168.0.10:8000/users';

export const registerApi = async (email, login, password) => {
    const query = {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: JSON.stringify({email, login, password}),
    }
    try {
        const res = await fetch(`${url}/register`, query)
            .then(response => {
                if (response.ok) {
                    return response;
                }
            })
        return res;
    }
    catch (err) {
        return Promise.resolve(err);
    }
}

export const loginApi = async (login, password) => {
    const query = {
        method: 'POST',
        headers: 'application/x-www-form-urlencoded',
        body: {login, password}
    }
    try {
        const res = await fetch(`${url}/authenticate`, query);
        if (res.ok) {
            return res;
        }
    }
    catch (err) {
        return Promise.resolve(err);
    }
}