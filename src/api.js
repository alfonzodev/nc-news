import axios from "axios";

const BASE_URL = "https://top-tier-articles.onrender.com/api/";

const api = axios.create({
  baseURL: BASE_URL,
});


export const fetchArticles = (topic, sort_by, order) => {
    return api.get('/articles', {params: {topic, sort_by, order}}).then(({data}) => {
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

export const loginUser = (email, password) => {
    return api.post('/users/login', {email, password}, {withCredentials: true }).then(({data}) => {
        return data;
    }).catch((err) => {
        return Promise.reject(err);
    })
}

export const getTopics = () => {
    return api.get('/topics').then(({data}) => {
        return data;
    })
}