import { Action, ActionCreator } from "redux";
import { ThunkAction } from "redux-thunk";

export enum ROOM_ACTIONS {
  GET_ROOMS = "GET_ROOMS",
  RECEIVE_ROOMS = "RECEIVE_ROOMS",
  FAIL_ROOMS = "FAIL_ROOMS",
}

const fetching_rooms = () => ({
  type: ROOM_ACTIONS.GET_ROOMS,
});

const fetched_rooms = (payload) => ({
  type: ROOM_ACTIONS.RECEIVE_ROOMS,
  payload,
});

const failed_rooms = (payload) => ({
  type: ROOM_ACTIONS.FAIL_ROOMS,
  payload,
});

export const execute_rooms_search = async (name?: string) => {
  const response = await fetch(
    `http://localhost:3005/rooms?name=${name || "none"}`
  );
  const searchResults = await response.json();
  return searchResults;
};

export const search_rooms: ActionCreator<
  ThunkAction<Promise<Action>, any, void, any>
> = (name?: string) => {
  return (dispatch) => {
    dispatch(fetching_rooms());
    return execute_rooms_search(name)
      .then((res) => dispatch(fetched_rooms(res)))
      .catch((err) => dispatch(failed_rooms(err)));
  };
};
