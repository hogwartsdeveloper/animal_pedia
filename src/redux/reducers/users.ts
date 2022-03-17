import { UsersAction, UsersActionTypes, UsersState } from "../../type/users";

const initialState: UsersState = {
    uid: []
}

export const usersReducer = (state: UsersState = initialState, action: UsersAction): UsersState => {
    switch(action.type) {
        case UsersActionTypes.FETCH_USERS_UID:
            return {...state, uid: action.payload}
        default:
            return state;
    }
}
