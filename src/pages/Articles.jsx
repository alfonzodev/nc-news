import { useSearchParams } from "react-router-dom";
import { useState } from "react";

import { capitalizeString } from "../utils/utils";

import ArticlesList from "../components/ArticlesList";

import ErrorPage from "./ErrorPage";

const Articles = ({ topics }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [error, setError] = useState(null);

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

  if (error) return <ErrorPage error={error} />;

  return (
    <main className="min-h-[calc(100vh-4rem) py-10 max-w-screen-lg w-[95%] m-auto">
      <h1 className="text-3xl font-extralight mb-4">{capitalizeString(topic)} </h1>
      <div className="mb-4 p-2 flex items-center">
        <label className="font-medium mr-4" htmlFor="sort_by">
          Sort By
        </label>
        <select name="sort_by" id="sorting" onChange={handleChange}>
          <option value="created_at-desc">Date - Descending</option>
          <option value="created_at-asc">Date - Ascending</option>
          <option value="comment_count-desc">Most Comments</option>
          <option value="comment_count-asc">Least Comments</option>
          <option value="votes-desc">Most Voted</option>
          <option value="votes-asc">Least Voted</option>
        </select>
      </div>
      <ArticlesList setError={setError} />
    </main>
  );
};

export default Articles;
