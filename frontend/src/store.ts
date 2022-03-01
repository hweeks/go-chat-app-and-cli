import thunkMiddleware from "redux-thunk";
import { createStore, applyMiddleware } from "redux";
import reducers from "./reducers";

export const store = createStore(reducers, applyMiddleware(thunkMiddleware));

export type root_state = ReturnType<typeof store.getState>;

export type app_dispatch = typeof store.dispatch;
