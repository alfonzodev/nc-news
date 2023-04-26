import { useSearchParams } from "react-router-dom";
import { useState } from "react";

import { capitalizeString } from "../utils/utils";

import ArticlesList from "../components/ArticlesList";
import TopicsSidebar from "../components/TopicsSidebar";

import ErrorPage from "./ErrorPage";

const Articles = ({topics}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [error, setError] = useState(null)

  const topic = searchParams.get("topic");

  const handleChange = (e) => {
    e.preventDefault();
    const [sort_by, order] = e.target.value.split("-");
    setSearchParams((searchParams) => {
      searchParams.set("sort_by", sort_by);
      searchParams.set("order", order);
      return searchParams;
    });
  };

  if(error) return <ErrorPage error={error}/>

  return (
    <div className="articles">
      <TopicsSidebar topics={topics}/>

      <section className="articles-container">
        <h1 className="heading-l">{capitalizeString(topic)} Articles</h1>
        <label htmlFor="sort_by">Sort By</label>
        <select name="sort_by" id="sorting" onChange={handleChange}>
          <option value="created_at-desc">Date - Descending</option>
          <option value="created_at-asc">Date - Ascending</option>
          <option value="comment_count-desc">Most Comments</option>
          <option value="comment_count-asc">Least Comments</option>
          <option value="votes-desc">Most Voted</option>
          <option value="votes-asc">Least Voted</option>
        </select>

        <ArticlesList params={searchParams} setError={setError}/>
      </section>
    </div>
  );
};

export default Articles;
