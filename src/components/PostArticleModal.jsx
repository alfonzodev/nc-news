import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/User";

import { FaX, FaChevronDown, FaRegImage } from "react-icons/fa6";

import { fetchImages, postArticle } from "../api";
import { ClipLoader } from "react-spinners";
import ErrorPage from "../pages/ErrorPage";
import AutoResizeTextArea from "./AutoResizeTextArea";

const PostArticleModal = ({ closeModal, topics, setMyArticles }) => {
  const [error, setError] = useState(null);
  const [formError, setFormError] = useState(null);
  const { user } = useContext(UserContext);
  const [isSending, setIsSending] = useState(false);
  const [isCoverImageModalOpen, setIsCoverImageModalOpen] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState(null);
  const [galleryImages, setGalleryImages] = useState(null);
  const [isTopicsDropDownOpen, setIsTopicsDropDownOpen] = useState(false);
  const [article, setArticle] = useState({
    author: user.username,
    body: "",
    title: "",
    topic: "",
    img_id: 1,
  });

  // Get Galllery Images to Use on Article
  useEffect(() => {
    fetchImages()
      .then((data) => {
        setGalleryImages(data.images);
      })
      .catch((err) => setError(err));
  }, []);

  const handleTopicSelect = (topic) => {
    formError === "topic" && setFormError(null);
    setIsTopicsDropDownOpen(false);
    setArticle((article) => {
      return { ...article, topic };
    });
  };

  const handleImageSelect = (imageId, imageUrl) => {
    setIsCoverImageModalOpen(!isCoverImageModalOpen);
    setSelectedImageUrl(imageUrl);
    setArticle((article) => {
      return { ...article, img_id: imageId };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Check aticle form has been filled out
    if (!article.topic) {
      setFormError("topic");
      return;
    } else if (!article.title) {
      setFormError("title");
      return;
    } else if (!article.body) {
      setFormError("body");
      return;
    }

    setIsSending(true);
    postArticle(article)
      .then(({ article }) => {
        setIsSending(false);
        closeModal();
        setMyArticles((articles) => [article, ...articles]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (error) return <ErrorPage error={error} />;

  return (
    <div className="fixed flex items-center justify-center w-screen h-screen bg-black/40 z-50 top-0 left-0">
      {/* Modal Content */}
      <div className="relative flex flex-col justify-between bg-white border border-slate-600 rounded-md w-[95%] max-w-screen-lg h-[90vh]">
        {/* Close Modal Button */}
        <FaX
          className="absolute top-4 right-4 text-xl cursor-pointer hover:text-red-600"
          onClick={closeModal}
        />
        {/* Modal Header */}
        <div className="flex justify-start items-center gap-3 py-3 px-5 ">
          <img
            src={user.avatar_img_url}
            alt="user profile"
            className="w-10 h-10 object-cover border border-gray-400 rounded-full"
          />
          <div className="flex flex-col gap-1">
            <span className="font-medium leading-none">{user.name}</span>
            <span className="font-extralight leading-none">New Article</span>
          </div>
        </div>
        <div className="flex flex-col p-6 h-full overflow-auto ">
          {/* Article Form */}
          <form id="article-form" className="flex flex-col grow gap-4" onSubmit={handleSubmit}>
            {/* Topics Dropdown */}
            <div className="select-non relative w-full max-w-52">
              <div
                className="flex items-center border-b-2 justify-between cursor-pointer  hover:border-highlight group"
                onClick={() => setIsTopicsDropDownOpen(!isTopicsDropDownOpen)}
              >
                <span className="text-lg text-gray-400 px-1">
                  {article.topic ? article.topic : "Article topic"}
                </span>
                <FaChevronDown className="mr-1 group-hover:text-highlight" />
              </div>
              {isTopicsDropDownOpen && (
                <ul className="absolute mt-1 w-full max-h-28 overflow-y-auto bg-white border border-slate-200 rounded-md">
                  {topics.map((topic) => (
                    <li
                      key={topic.slug}
                      className="py-1 px-2 hover:bg-blue-100 cursor-pointer"
                      onClick={() => handleTopicSelect(topic.slug)}
                    >
                      {topic.slug}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            {formError && formError === "topic" && (
              <span className="text-sm font-semibold text-red-600 py-0 my-0">
                Please choose a topic
              </span>
            )}
            {/* Cover Image */}
            {selectedImageUrl && (
              <div className="my-2">
                <img
                  className="w-full h-auto object-cover rounded-sm"
                  src={selectedImageUrl}
                  alt={`${article.topic}`}
                />
              </div>
            )}
            {/* Article Title */}
            {formError && formError === "title" && (
              <span className="text-sm font-semibold text-red-600 py-0 my-0">
                Please provide a title
              </span>
            )}
            <input
              type="text"
              maxLength={100}
              className="w-full focus:outline-none p-1 text-2xl font-medium"
              value={article.title}
              onChange={(e) => {
                formError === "title" && setFormError(null);
                setArticle((article) => {
                  return { ...article, title: e.target.value };
                });
              }}
              placeholder="Add title"
            />
            {/* Article Body */}
            {formError && formError === "body" && (
              <span className="text-sm font-semibold text-red-600 py-0 my-0">
                Please fill in this field
              </span>
            )}
            <AutoResizeTextArea
              value={article.body}
              onChange={(value) => {
                formError === "body" && setFormError(null);
                setArticle((article) => {
                  return { ...article, body: value };
                });
              }}
            />
          </form>
        </div>
        {/* Modal Footer */}
        <div className="border-t border-gray-400 py-4 px-5 flex justify-between">
          <div className="relative">
            {/* Add Cover Image Button */}
            <button
              className="bg-white border border-primary py-1 px-4  rounded-sm flex items-center gap-2 hover:bg-gray-100"
              onClick={() => setIsCoverImageModalOpen(!isCoverImageModalOpen)}
            >
              <FaRegImage />
              Add cover
            </button>

            {/* Add Cover Image Modal */}
            {isCoverImageModalOpen && (
              <div className="absolute bottom-full mb-1 w-80 bg-white border border-gray-400 rounded-md overflow-hidden z-10 h-96 flex flex-col">
                {/* Header */}
                <div className="sticky top-0 bg-white border-b border-gray-400 px-3 z-20">
                  <div className="w-fit">
                    <h2 className="text-sm font-medium mt-2 mb-1">Gallery</h2>
                    {/* Underline */}
                    <div className="w-10/12 border-b border-2 border-black"></div>
                  </div>
                </div>

                {/* Images Grid */}
                <div className="overflow-auto flex-grow grid grid-cols-3 gap-1 py-3 px-3">
                  {galleryImages.map((image) => (
                    <img
                      key={image.img_id}
                      className="object-cover w-full h-full hover:opacity-80 cursor-pointer rounded-md"
                      src={image.img_url}
                      alt="article cover selection"
                      onClick={() => {
                        handleImageSelect(image.img_id, image.img_url);
                      }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Form Submit Button */}
          <input
            className="py-2 px-4 border-transparent bg-blue-600 hover:bg-blue-800 text-sm text-white font-medium rounded-sm cursor-pointer"
            type="submit"
            form="article-form"
            value="Post Article"
            disabled={isSending}
          />
        </div>
      </div>
      {/* Sending Article Loading Spinner */}
      {isSending && (
        <div className="absolute flex items-center justify-center bg-black/10 w-screen h-screen">
          <ClipLoader className="" size={100} />
        </div>
      )}
    </div>
  );
};

export default PostArticleModal;
