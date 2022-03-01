import { Action } from "redux";
import {
  BACKEND_CONFIG,
  BACKEND_ROUTES,
  get_url,
  thunk_builder,
} from "../constants";

export enum ROOM_ACTIONS {
  GET_ROOMS = "GET_ROOMS",
  RECEIVE_ROOMS = "RECEIVE_ROOMS",
  FAIL_ROOMS = "FAIL_ROOMS",
}

export type GET_ROOM_ACTION = Action<ROOM_ACTIONS.GET_ROOMS>;

export type RECEIVE_ROOMS_ACTION = Action<ROOM_ACTIONS.RECEIVE_ROOMS> & {
  payload: BACKEND_CONFIG["LIST_ROOMS"]["response"];
};

export type FAIL_ROOMS_ACTION = Action<ROOM_ACTIONS.FAIL_ROOMS> & {
  payload: string;
};

const fetching_rooms = (): GET_ROOM_ACTION => ({
  type: ROOM_ACTIONS.GET_ROOMS,
});

const fetched_rooms = (payload): RECEIVE_ROOMS_ACTION => ({
  type: ROOM_ACTIONS.RECEIVE_ROOMS,
  payload,
});

const failed_rooms = (payload: string): FAIL_ROOMS_ACTION => ({
  type: ROOM_ACTIONS.FAIL_ROOMS,
  payload,
});

export const execute_rooms_search = async () => {
  const fetch_url = get_url(BACKEND_ROUTES.LIST_ROOMS);
  const response = await fetch(fetch_url.toString());
  const searchResults: BACKEND_CONFIG["LIST_ROOMS"]["response"] =
    await response.json();
  return searchResults;
};

export const search_rooms: thunk_builder = () => {
  return (dispatch) => {
    dispatch(fetching_rooms());
    return execute_rooms_search()
      .then((res) => dispatch(fetched_rooms(res)))
      .catch((err) => dispatch(failed_rooms(err)));
  };
};
