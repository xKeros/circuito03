/* eslint-disable @typescript-eslint/no-unused-vars -- conditional for fetch*/
import React, { useEffect, useState } from 'react';
import { getPosts } from '../helpers/fectAPI'; // Asegúrate de que esta ruta sea correcta según la estructura de tu proyecto
import { Post } from '../interface/posts';
import PostCard from '../components/postCard';
import Box from '@mui/material/Box';

const PostsComponent: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const result = await getPosts('https://localhost:7128/api/Posts');
        setPosts(result);
      } catch (err) {
        setError('Failed to fetch posts');
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: 2,
        bgcolor: 'background.default',
        color: 'text.primary',
      }}
    >
      <h1 style={{ marginBottom: '20px' }}>Posts</h1>
      <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
        {posts.map((post) => (
          <li key={post.id} style={{ marginBottom: '16px', width: '100%', display: 'flex', justifyContent: 'center' }}>
            <PostCard post={post} />
          </li>
        ))}
      </ul>
    </Box>
  );
};

export default PostsComponent;
