import axios from "axios";

const url = "https://test-bigio-fs.vercel.app/";

export const fetchPosts = () => axios.get(url);
export const createPost = (newPost) => axios.post(url, newPost);
export const updatePost = (id, updatePost) =>
  axios.patch(`${url}/${id}`, updatePost);
export const deletePost = (id) => axios.delete(`${url}/${id}`);
export const fetchFilteredPosts = async (filters) => {
  try {
    const response = await axios.get(`${url}/filtered`, { params: filters });
    return response.data;
  } catch (error) {
    throw error;
  }
};
