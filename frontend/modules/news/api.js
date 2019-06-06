const url = 'https://newsapi.org/v2/top-headlines?country=ru&category=sports&apiKey=c895b81fae6e4bfc9544bb84ea18588d';

export const fetchNewsApi = async () => {
    const query = {
        method: 'GET',
        headers: {'Content-Type': 'application/json', 'accept': 'application/json'},
    }
    return await fetch(url, query);
};