import { Link } from 'react-router-dom';
//import CallToAction from '../components/CallToAction';
import { useEffect, useState } from 'react';
import PostCard from '../components/PostCard';

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch('/api/post/getPosts');
      const data = await res.json();
      setPosts(data.posts);
    };
    fetchPosts();
  }, []);

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <div className="flex flex-col items-center gap-6 p-16 bg-gradient-to-r from-teal-400 to-blue-500 text-white text-center">
        <h1 className="text-4xl font-bold lg:text-6xl">Welcome to my Blog</h1>
        <p className="text-base sm:text-lg max-w-2xl">
          Explore a variety of articles and tutorials on web development, software engineering, and programming languages.
        </p>
        <Link
          to="/search"
          className="text-sm sm:text-base bg-white text-teal-500 font-bold py-2 px-4 rounded-full hover:bg-gray-200"
        >
          View all posts
        </Link>
      </div>

      {/* Recent Posts Section */}
      <div className="max-w-6xl mx-auto p-6 sm:p-12 flex flex-col gap-8">
        {posts && posts.length > 0 ? (
          <div className="flex flex-col gap-6">
            <h2 className="text-3xl font-semibold text-center">Recent Posts</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
            <Link
              to="/search"
              className="text-lg text-teal-500 hover:underline text-center"
            >
              View all posts
            </Link>
          </div>
        ) : (
          <p className="text-center text-gray-500">No posts available.</p>
        )}
      </div>
    </div>
  );
}
