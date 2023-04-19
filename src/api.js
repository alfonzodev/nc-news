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
export const fetchArticleById = (article_id) => {
    return api.get(`/articles/${article_id}`).then(({data}) => {
        return data;
    })
}

export const fetchArticleComments = (article_id) => {
    return api.get(`/articles/${article_id}/comments`).then(({data}) => {
        return data;
    })
}

export const incrementArticleVotes = (article_id, inc_votes) => {
  return api.patch(`/articles/${article_id}`, {inc_votes}).then(({data}) => {
      return data;
  })
}

export const postComment = (article_id, username, body) => {
return api.post(`/articles/${article_id}/comments`, {username, body}).then(({data}) => {
    return data;
})
}