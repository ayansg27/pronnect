import axios from "axios";
import {
  ADD_POST,
  GET_ERRORS,
  POST_LOADING,
  GET_POST,
  GET_POSTS,
  DELETE_POST,
  CLEAR_ERRORS
} from "./types";

//Add post
export const addPost = postData => dispatch => {
  dispatch(clearErrors());
  axios
    .post("/posts", postData)
    .then(res =>
      dispatch({
        type: ADD_POST,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//get posts
export const getPosts = () => dispatch => {
  dispatch(setPostLoading());
  axios
    .get("/posts")
    .then(res =>
      dispatch({
        type: GET_POSTS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_POSTS,
        payload: null
      })
    );
};

//get post
export const getPost = id => dispatch => {
  dispatch(setPostLoading());
  axios
    .get(`/posts/${id}`)
    .then(res =>
      dispatch({
        type: GET_POST,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_POST,
        payload: null
      })
    );
};

//delete post
export const deletePost = id => dispatch => {
  axios
    .delete(`/posts/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_POST,
        payload: id
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//add like
export const addLike = id => dispatch => {
  axios
    .post(`/posts/like/${id}`)
    .then(res => dispatch(getPosts()))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//remove like
export const removeLike = id => dispatch => {
  axios
    .post(`/posts/unlike/${id}`)
    .then(res => dispatch(getPosts()))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Add comment
export const addComment = (postId, commentData) => dispatch => {
  dispatch(clearErrors());
  axios
    .post(`/posts/comment/${postId}`, commentData)
    .then(res =>
      dispatch({
        type: GET_POST,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Delete comment
export const deleteComment = (postId, commentId) => dispatch => {
  axios
    .delete(`/posts/comment/${postId}/${commentId}`)
    .then(res =>
      dispatch({
        type: GET_POST,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//set loading
export const setPostLoading = () => {
  return {
    type: POST_LOADING
  };
};

//clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
