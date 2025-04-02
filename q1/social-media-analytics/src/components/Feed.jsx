import { useEffect, useState } from "react";
import { fetchUsers, fetchUserPosts } from "../api";

const Feed = () => {
  const [feed, setFeed] = useState([]);

  useEffect(() => {
    const getFeed = async () => {
      const users = await fetchUsers();
      let posts = [];

      await Promise.all(
        Object.keys(users).map(async (userId) => {
          const userPosts = await fetchUserPosts(userId);
          posts = posts.concat(userPosts);
        })
      );

      // Sort posts by latest
      posts.sort((a, b) => b.id - a.id);
      setFeed(posts);
    };

    getFeed();

    const interval = setInterval(getFeed, 10000); // Update every 10 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="card">
      <h2>Live Feed</h2>
      <ul className="data-list">
        {feed.map((post) => (
          <li key={post.id} className="data-item new-feed-item">
            {post.content}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Feed;