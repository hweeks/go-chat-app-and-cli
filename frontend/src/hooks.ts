import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { Action } from "redux";
import { ThunkDispatch } from "redux-thunk";
import type { root_state } from "./store";

export type root_thunk_dispatch = ThunkDispatch<root_state, void, Action>;
export const use_app_dispatch = () => useDispatch<root_thunk_dispatch>();

export const use_app_selector: TypedUseSelectorHook<root_state> = useSelector;
