import { ActionCreator, Action } from "redux";
import { ThunkAction } from "redux-thunk";

export type thunk_builder<
  action_returned = Promise<Action>,
  state_to_mutate = any
> = ActionCreator<
  ThunkAction<action_returned, state_to_mutate, void, Action<any>>
>;

export type chat_author = {
  id: string;
  name: string;
  online: boolean;
};

export type chat_message = {
  id: string;
  content: string;
  author: chat_author;
  posted: Date;
};

export type chat_room = {
  id: string;
  users: chat_author[];
  messages: chat_message[];
};

export enum BACKEND_ROUTES {
  LIST_ROOMS = "/api/rooms/list",
  GET_ROOM = "/api/room/:id",
  CREATE_ROOM = "/api/rooms/create",
}

export type BACKEND_CONFIG = {
  LIST_ROOMS: {
    url: BACKEND_ROUTES.LIST_ROOMS;
    request: null;
    response: chat_room[];
  };
  GET_ROOM: {
    url: BACKEND_ROUTES.GET_ROOM;
    request: { name: string };
    response: chat_room;
  };
  CREATE_ROOM: {
    url: BACKEND_ROUTES.CREATE_ROOM;
    request: { name: string };
    response: chat_room;
  };
};

export const get_url = (
  path_stub: BACKEND_ROUTES,
  optional_replacer?: Record<string, string>
): URL => {
  if (optional_replacer) {
    for (const replacement_value in optional_replacer) {
      path_stub.replace(
        replacement_value,
        optional_replacer[replacement_value]
      );
    }
  }
  const built_url = new URL(path_stub, "http://localhost:3005");
  return built_url;
};
