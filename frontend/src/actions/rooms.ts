export enum ROOM_ACTIONS {
  GET_ROOMS = "GET_ROOMS",
  RECEIVE_ROOMS = "RECEIVE_ROOMS",
  FAIL_ROOMS = "FAIL_ROOMS",
}

const fetching_search = () => ({
  type: ROOM_ACTIONS.GET_ROOMS,
});

const fetched_search = (payload) => ({
  type: ROOM_ACTIONS.RECEIVE_ROOMS,
  payload,
});

const failed_search = (payload) => ({
  type: ROOM_ACTIONS.FAIL_ROOMS,
  payload,
});

export const execute_search = async (name?: string) => {
  const response = await fetch(
    `http://localhost:3005/rooms?name=${name || "none"}`
  );
  const searchResults = await response.json();
  return searchResults;
};

export const search_rooms = (name?: string) => {
  return (dispatch) => {
    dispatch(fetching_search());
    return execute_search(name)
      .then((res) => dispatch(fetched_search(res)))
      .catch((err) => dispatch(failed_search(err)));
  };
};
