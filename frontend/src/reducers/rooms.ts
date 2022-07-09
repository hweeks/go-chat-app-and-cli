import { ROOM_ACTIONS } from "../actions";
import type { REDUCER_ROOM_ACTIONS } from "../actions";
import produce from "immer";
import { BACKEND_CONFIG } from "../constants";

export type rooms_state = {
  rooms?: BACKEND_CONFIG["LIST_ROOMS"]["response"];
  is_loading: boolean;
  error?: string;
};

const initial_state: rooms_state = {
  rooms: undefined,
  is_loading: false,
  error: undefined,
};

const rooms_fetching = (state) => {
  state.is_loading = true;
};

const rooms_fetched = (state, payload) => {
  state.is_loading = false;
  state.rooms = payload;
};

const rooms_failed = (state, payload) => {
  state.is_loading = false;
  state.error = payload;
};

export default (state = initial_state, action: REDUCER_ROOM_ACTIONS) =>
  produce(state, (draft) => {
    switch (action.type) {
      case ROOM_ACTIONS.GET_ROOMS:
        return rooms_fetching(draft);
      case ROOM_ACTIONS.RECEIVE_ROOMS:
        return rooms_fetched(draft, action.payload);
      case ROOM_ACTIONS.FAIL_ROOMS:
        return rooms_failed(draft, action.payload);
    }
  });
