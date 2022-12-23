import {
  FETCH_STREAMS,
} from "../actions/types";

import _ from "lodash";

const streamReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_STREAMS:
      return  {...state, ..._.mapKeys(action.payload, 'id')}
    default:
      return state;
  }
};

export default streamReducer;
