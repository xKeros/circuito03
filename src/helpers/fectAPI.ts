import { handleRefreshToken } from "../Auth/RefreshToken";
import { Post } from "../interface/posts";

export const getPosts = async (url: string): Promise<Post[]> => {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data: Post[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};



export const createPost = async (url: string, postData: Post): Promise<Post> => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data: Post = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
};


export const fetchProtectedResource: unknown = async () => {
    const token = localStorage.getItem('token');
  
    const response = await fetch('https://localhost:7128/api/protected-endpoint', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  
    if (response.status === 401) {
      // Si el token ha expirado, intentar refrescarlo
      await handleRefreshToken();
      // Reintentar la solicitud original
      return fetchProtectedResource();
    }
  
    const data = await response.json();
    console.log('Protected data:', data);
  };
  
