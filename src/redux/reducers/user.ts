import { UserAction, UserActionTypes, UserState } from "../../type/user";

const initialState: UserState = {
    currentUser: null,
    posts: [],
    chats: [],
    following: []
}

export const userReducer = ( state: UserState = initialState, action: UserAction): UserState => {
    switch(action.type) {
        case UserActionTypes.USER_STATE_CHANGE:
            return {...state, currentUser: action.payload}
        default:
            return state
    }
}