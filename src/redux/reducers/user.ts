import { UserAction, UserActionTypes, UserState, IPost} from "../../type/user";



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
        case UserActionTypes.USER_POSTS_STATE_CHANGE:
            return {...state, posts: action.payload}
        case UserActionTypes.USER_FOLLOWING_STATE_CHANGE:
            return {...state, following: action.payload}
        case UserActionTypes.USER_CHATS_STATE_CHANGE: {
            return {...state, chats: action.payload}
        }
        case UserActionTypes.CLEAR_DATA: {
            return initialState;
        }
        default:
            return state
    }
}