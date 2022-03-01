import React from "react";
import { search_rooms } from "../../actions";
import { use_app_dispatch, use_app_selector } from "../../hooks";
import { root_state } from "../../store";

export const Home = () => {
  const rooms: root_state["rooms"] = use_app_selector(
    (state: root_state) => state.rooms
  );
  const internal_dispatch = use_app_dispatch();
  if (!rooms.rooms) {
    if (!rooms.is_loading) internal_dispatch(search_rooms());
  }
  if (rooms.is_loading) return <>i am loadin here</>;
  if (rooms.rooms) {
    return <pre>{JSON.stringify(rooms.rooms, null, 2)}</pre>;
  }
  return <>hello, world!</>;
};
