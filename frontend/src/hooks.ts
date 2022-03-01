import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { root_state, app_dispatch } from "./store";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const use_app_dispatch = () => useDispatch<app_dispatch>();
export const use_app_selector: TypedUseSelectorHook<root_state> = useSelector;
