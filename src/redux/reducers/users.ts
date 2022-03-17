import { UsersAction, UsersActionTypes, UsersState } from "../../type/users";

const initialState: UsersState = {
    uid: [],
    posts: []
}

export const usersReducer = (state: UsersState = initialState, action: UsersAction): UsersState => {
    switch(action.type) {
        case UsersActionTypes.FETCH_USERS_UID:
            return {...state, uid: action.payload}
        case UsersActionTypes.FETCH_USERS_POSTS:
            return {...state, posts: action.payload}
        default:
            return state;
    }
}
