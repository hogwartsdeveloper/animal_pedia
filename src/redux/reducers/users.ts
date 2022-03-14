import { UsersAction, UsersActionTypes, UsersState } from "../../type/users";

const initialState: UsersState = {
    users: [],
    feed: [],
    usersFollowingLoaded: 0
}

export const usersReducer = (state: UsersState = initialState, action: UsersAction): UsersState => {
    switch (action.type) {
        case UsersActionTypes.USERS_DATA_STATE_CHANGE:
            return {...state, users: [...state.users, action.payload]}
        case UsersActionTypes.USERS_POSTS_STATE_CHANGE:
            return {
                ...state,
                usersFollowingLoaded: state.usersFollowingLoaded + 1,
                feed: [...state.feed, ...action.payload]
            }
        case UsersActionTypes.CLEAR_DATA:
            return initialState;
        default:
            return state;
    }
}