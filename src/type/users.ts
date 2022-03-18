export interface UsersState {
    uid: string[],
    posts: any[],
    users: any[]
}

export enum UsersActionTypes {
    FETCH_USERS_UID = 'FETCH_USERS_UID',
    FETCH_USERS_POSTS = 'FETCH_USERS_POSTS',
    FETCH_USERS_DATA = 'FETCH_USERS_DATA'
}

interface IFetchUsersUID {
    type: UsersActionTypes.FETCH_USERS_UID;
    payload: string[];
}

interface IFetchUsersPosts {
    type: UsersActionTypes.FETCH_USERS_POSTS;
    payload: any[];
}

interface IFetchUsersData {
    type: UsersActionTypes.FETCH_USERS_DATA;
    payload: any[];
}

export type UsersAction = IFetchUsersUID | IFetchUsersPosts | IFetchUsersData;