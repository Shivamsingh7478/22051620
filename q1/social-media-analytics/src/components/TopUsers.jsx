import { useEffect, useState } from "react";
import { fetchUsers, fetchUserPosts } from "../api";

const TopUsers = () => {
  const [topUsers, setTopUsers] = useState([]);

  useEffect(() => {
    const getTopUsers = async () => {
      const users = await fetchUsers();
      const userPostCounts = {};

      // Fetch post count for each user
      await Promise.all(
        Object.keys(users).map(async (userId) => {
          const posts = await fetchUserPosts(userId);
          userPostCounts[userId] = posts.length;
        })
      );

      // Sort users by post count and pick top 5
      const sortedUsers = Object.entries(userPostCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([id, count]) => ({ id, name: users[id], count }));

      setTopUsers(sortedUsers);
    };

    getTopUsers();
  }, []);

  return (
    <div className="card">
      <h2>Top Users</h2>
      <ul className="data-list">
        {topUsers.map((user) => (
          <li key={user.id} className="data-item">
            {user.name} - {user.count} posts
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopUsers;