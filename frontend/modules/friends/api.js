const url = 'http://localhost:8000/users';

export const searchFriendsApi = async name => {
    const query = {
        method: 'POST',
        headers: {'Content-Type': 'application/json', 'accept': 'application/json'},
        body: JSON.stringify({name})
    };
    return await fetch(`${url}/searchFriends`, query);
};

export const addFriendApi = async (id, friendId) => {
    const query = {
        method: 'POST',
        headers: {'Content-Type': 'application/json', 'accept': 'application/json'},
        body: JSON.stringify({id, friendId})
    };
    return await fetch(`${url}/addFriend`, query);
};

export const getFriendsInRequestsApi = async id => {
    const query = {
        method: 'POST',
        headers: {'Content-Type': 'application/json', 'accept': 'application/json'},
        body: JSON.stringify({id})
    };
    return await fetch(`${url}/getFriendsInRequests`, query);
}