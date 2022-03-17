export interface UsersState {
    uid: string[],
    posts: any[],
}

export enum UsersActionTypes {
    FETCH_USERS_UID = 'FETCH_USERS_UID',
    FETCH_USERS_POSTS = 'FETCH_USERS_POSTS'
}

interface IFetchUsersUID {
    type: UsersActionTypes.FETCH_USERS_UID;
    payload: string[];
}

interface IFetchUsersPosts {
    type: UsersActionTypes.FETCH_USERS_POSTS;
    payload: any[];
}

export type UsersAction = IFetchUsersUID | IFetchUsersPosts