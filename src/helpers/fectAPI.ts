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
