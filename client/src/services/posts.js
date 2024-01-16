import {
  CREATE,
  UPDATE,
  DELETE,
  FETCH_ALL,
  FETCH_FILTERED,
} from "../utils/actionTypes";
import * as api from "../services/api";

export const getPosts = () => async (dispatch) => {
  try {
    const { data } = await api.fetchPosts();
    dispatch({ type: FETCH_ALL, payload: data });
  } catch (error) {
    console.log("Get Post Error: " + error);
  }
};

export const createPost = (post) => async (dispatch) => {
  try {
    const { data } = await api.createPost(post);
    dispatch({ type: CREATE, payload: data });
  } catch (error) {
    console.log("Create Post Error: " + error);
  }
};

export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post);
    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log("Update Post Error: " + error);
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);
    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log("Delete Post Error: " + error);
  }
};

export const getFilteredPosts = (filters) => async (dispatch) => {
  try {
    const { data } = await api.fetchFilteredPosts(filters);
    dispatch({ type: FETCH_FILTERED, payload: data });
  } catch (error) {
    console.log("Get Filtered Posts Error: " + error);
  }
};
