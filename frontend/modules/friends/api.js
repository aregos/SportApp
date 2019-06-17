const url = 'http://localhost:8000/users';

export const searchFriendsApi = async name => {
    const query = {
        method: 'POST',
        headers: {'Content-Type': 'application/json', 'accept': 'application/json'},
        body: JSON.stringify({name})
    };
    return await fetch(`${url}/searchFriends`, query)
};