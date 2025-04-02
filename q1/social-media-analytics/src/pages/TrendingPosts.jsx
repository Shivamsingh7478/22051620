import { useEffect, useState } from "react";
import { fetchUsers, fetchUserPosts, fetchPostComments } from "../api";

const TrendingPosts = () => {
  const [trendingPosts, setTrendingPosts] = useState([]);

  useEffect(() => {
    const getTrendingPosts = async () => {
      const users = await fetchUsers();
      let posts = [];

      await Promise.all(
        Object.keys(users).map(async (userId) => {
          const userPosts = await fetchUserPosts(userId);
          posts = posts.concat(userPosts);
        })
      );

      const postCommentCounts = {};

      await Promise.all(
        posts.map(async (post) => {
          const comments = await fetchPostComments(post.id);
          postCommentCounts[post.id] = comments.length;
        })
      );

      const maxComments = Math.max(...Object.values(postCommentCounts));
      const trending = posts.filter(
        (post) => postCommentCounts[post.id] === maxComments
      );

      setTrendingPosts(trending);
    };

    getTrendingPosts();
  }, []);

  return (
    <div className="card">
      <h2>Trending Posts</h2>
      <ul className="data-list">
        {trendingPosts.map((post) => (
          <li key={post.id} className="data-item">
            {post.content}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TrendingPosts;
