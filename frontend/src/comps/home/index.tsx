import React from "react";
import { search_rooms } from "../../actions";
import { use_app_dispatch, use_app_selector } from "../../store";

export const Home = () => {
  const rooms = use_app_selector((state) => state.rooms);
  const internal_dispatch = use_app_dispatch();
  if (!rooms.rooms) {
    if (!rooms.is_loading) internal_dispatch(search_rooms());
  }
  if (rooms.is_loading) return <>i am loadin here</>;
  if (rooms.rooms) {
    return <pre>{JSON.stringify(rooms.rooms, null, 2)}</pre>;
  }
  return <>hello, error state! {rooms.error}</>;
};
