import { combineReducers } from "redux";
import { userReducer } from "./user";
import { usersReducer } from "./users";

export const rootReducer = combineReducers({
    userState: userReducer,
    usersState: usersReducer,
})

export type RootState = ReturnType<typeof rootReducer>