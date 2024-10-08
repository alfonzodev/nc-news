import axios from "axios";

const BASE_URL = "https://top-tier-articles.onrender.com/api";

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export const fetchArticles = ({ topic, sort_by, order, limit, p }) => {
  return api
    .get("/articles", { params: { topic, sort_by, order, limit, p } })
    .then(({ data }) => data);
};

export const fetchImages = () => {
  return api.get("/gallery").then(({ data }) => data);
};

export const fetchArticleById = (article_id) => {
  return api.get(`/articles/${article_id}`).then(({ data }) => data);
};

export const fetchMyArticles = () => {
  return api.get("/my-articles").then(({ data }) => data);
};

export const postArticle = ({ author, body, title, topic, img_id }) => {
  return api.post("/articles", { author, body, title, topic, img_id }).then(({ data }) => data);
};

export const deleteArticleById = (article_id) => {
  return api.delete(`/articles/${article_id}`).then(({ data }) => data);
};

export const fetchArticleComments = (article_id) => {
  return api.get(`/articles/${article_id}/comments`).then(({ data }) => data);
};

export const incrementArticleVotes = (article_id, inc_votes) => {
  return api.patch(`/articles/${article_id}`, { inc_votes }).then(({ data }) => data);
};

export const postComment = (article_id, username, body) => {
  return api.post(`/articles/${article_id}/comments`, { username, body }).then(({ data }) => data);
};

export const loginUser = (email, password) => {
  return api.post("/users/login", { email, password }).then(({ data }) => data);
};

export const logoutUser = () => {
  return api.get("/users/logout");
};

export const registerUser = ({ name, username, email, password }) => {
  return api.post("/users/register", { name, username, email, password }).then(({ data }) => data);
};

export const getTopics = () => {
  return api.get("/topics").then(({ data }) => data);
};

export const deleteCommentById = (commentId) => {
  return api.delete(`/comments/${commentId}`);
};
