import Nav from "./Nav";
import PostTemplate from "./PostTemplate";
import axios from "axios";
import { useEffect, useState, useRef } from "react";

export default function Home(props) {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [initialLoading, setInitialLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const lastPostRef = useRef(null);

  const fetchData = async () => {
    if (isFetching || !hasMore) return;

    setIsFetching(true);
    try {
      const response = await axios.get(
        `https://tarmeezacademy.com/api/v1/posts?limit=5&page=${page}`
      );
      
      setPosts((prev) => [...prev, ...response.data.data]);
      setPage((prev) => prev + 1);
      setHasMore(
        response.data.meta.current_page < response.data.meta.last_page
      );
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message;
      console.error("Error loading posts:", errorMessage);
    } finally {
      setIsFetching(false);
      setInitialLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (initialLoading || isFetching || !hasMore) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        fetchData();
      }
    });

    const currentRef = lastPostRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) observer.disconnect();
    };
  }, [page, isFetching, hasMore, initialLoading]);

  return (
    <div className="container d-flex flex-column min-vh-100">
      <div>
        <Nav
          loggedIn={props.loggedIn}
          setLoggedIn={props.setLoggedIn}
          setToken={props.setToken}
        />
      </div>

      {initialLoading ? (
        <div className="HomeLoadingDiv">
          <div className="text-center">
            <div
              className="spinner-border text-secondary"
              style={{ width: "3rem", height: "3rem" }}
              role="status"
            >
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      ) : (
        <div id="postsCont" className="mt-5">
          {posts.map((post) => {
            let tagsName = post.tags.map((tag) => tag.name);
            return (
              <PostTemplate
                key={post.id}
                title={post.title || null}
                body={post.body}
                authorUsername={post.author.username}
                image={post.image}
                authorImage={post.author.profile_image}
                created_at={post.created_at}
                comments_count={post.comments_count}
                tagsName={tagsName}
              />
            );
          })}
        </div>
      )}

      <div ref={lastPostRef} style={{ height: "20px" }}></div>

      {isFetching && !initialLoading && (
        <div className="text-center my-3">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading more...</span>
          </div>
        </div>
      )}

      {props.loggedIn && (
        <button
          data-bs-toggle="modal"
          data-bs-target="#addPost"
          id="addPostBtn"
          className="btn bg-primary"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="3.5rem"
            height="3.5rem"
            fill="currentColor"
            className="bi bi-plus-circle"
            viewBox="0 0 16 16"
          >
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
          </svg>
        </button>
      )}

      <div
        className="modal fade"
        id="addPost"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Create New Post
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="post-image" className="col-form-label">
                    Post image
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    id="post-image"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="post-title" className="col-form-label">
                    Post title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="post-title"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="message-text" className="col-form-label">
                    Post body
                  </label>
                  <textarea
                    className="form-control"
                    id="message-text"
                  ></textarea>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Post
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}