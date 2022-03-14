import { IPost, IUser } from "./user";

export interface UsersState {
    users: IUser[];
    feed: any;
    usersFollowingLoaded: number;
}

export enum UsersActionTypes {
    USERS_DATA_STATE_CHANGE = 'USERS_DATA_STATE_CHANGE',
    USERS_POSTS_STATE_CHANGE = 'USERS_POSTS_STATE_CHANGE',
    CLEAR_DATA = 'CLEAR_DATA'
}

interface IUsersDataStateChange {
    type: UsersActionTypes.USERS_DATA_STATE_CHANGE;
    payload: IUser;
};

interface IUsersPostsStateChange {
    type: UsersActionTypes.USERS_POSTS_STATE_CHANGE;
    payload: IPost[];
}

interface IClearData {
    type: UsersActionTypes.CLEAR_DATA;
}

export type UsersAction = IUsersDataStateChange | IUsersPostsStateChange | IClearData;