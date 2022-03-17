export interface UsersState {
    uid: string[]
}

export enum UsersActionTypes {
    FETCH_USERS_UID = 'FETCH_USERS_UID'
}

interface IFetchUsersUID {
    type: UsersActionTypes.FETCH_USERS_UID;
    payload: string[]
}

export type UsersAction = IFetchUsersUID