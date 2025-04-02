function App() {
  return (
    <Router>
      <div className="app-container">
        <nav className="navbar">
          <ul className="nav-links">
            <li>
              <Link className="nav-link" to="/">Top Users</Link>
            </li>
            <li>
              <Link className="nav-link" to="/trending">Trending Posts</Link>
            </li>
            <li>
              <Link className="nav-link" to="/feed">Live Feed</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<TopUsers />} />
          <Route path="/trending" element={<TrendingPosts />} />
          <Route path="/feed" element={<Feed />} />
        </Routes>
      </div>
    </Router>
  );
}