import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import NotFound from '../components/static/NotFound';
import NewPost from '../components/static/NewPostForm';
import PostsComponent from '../pages/PostsPage';
import Login from '../components/Users/Login';
import ProtectedRoute from './ProtectedRouter';
import { GoogleCallback } from '../components/Users/handlerGoogleCallback';
import ProfilePage from '../pages/profilePage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: (
          <ProtectedRoute>
            <PostsComponent />
          </ProtectedRoute>
        ),
      },
      {
        path: '/new-post',
        element: (
          <ProtectedRoute>
            <NewPost />
          </ProtectedRoute>
        ),
      },
      {
        path: '/profile',
        element: (
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        ),
      },
      {
        path: '*',
        element: <NotFound />,
      },
      {
        path: '/login',
        element: <Login />,
      },
    ],
  },
  {
    path: '/google-callback',
    element: <GoogleCallback />, // Usa el componente como elemento
  },
]);
