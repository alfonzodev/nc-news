import axios from "axios";

const BASE_URL = "https://top-tier-articles.onrender.com/api/";

const api = axios.create({
  baseURL: BASE_URL,
});


export const fetchArticles = () => {
    return api.get('/articles').then(({data}) => {
        return data;
    })
}