import streams from "../apis/streams";
import {
  SIGN_IN,
  SIGN_OUT,
  FETCH_STREAMS,
} from "./types";

// USER AUTHENTICATION ACTIONS
// change user status to signed in
export const signIn = (userId) => {
  return {
    type: SIGN_IN,
    payload: userId,
  };
};

// change user status to signed out
export const signOut = () => {
  return {
    type: SIGN_OUT,
  };
};

// STREAMS CRUD REST ACTIONS
// fetch streams
export const fetchStreams = () => async (dispatch) => {
  const {data} = await streams.get("/api/users?per_page=20");
  console.log(data);
  dispatch({ type: FETCH_STREAMS, payload: data.data });
};
