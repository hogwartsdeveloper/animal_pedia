export interface UserState {
    currentUser: IUser | null;
    posts: any[];
    chats: any[];
    following: any[]
}

export enum UserActionTypes {
    USER_STATE_CHANGE = "USER_STATE_CHANGE",
    USER_POSTS_STATE_CHANGE = "USER_POSTS_STATE_CHANGE",
    USER_FOLLOWING_STATE_CHANGE = "USER_FOLLOWING_STATE_CHANGE",
    USER_CHATS_STATE_CHANGE = "USER_CHATS_STATE_CHANGE",
    CLEAR_DATA = "CLEAR_DATA"
}

interface UserStateChangeAction {
    type: UserActionTypes.USER_STATE_CHANGE;
    payload: any;
}

interface UserPostsStateChangeAction {
    type: UserActionTypes.USER_POSTS_STATE_CHANGE;
    payload: any[];
}

interface UserFollowingStateChangeAction {
    type: UserActionTypes.USER_FOLLOWING_STATE_CHANGE;
    payload: any[];
}

interface UserChatsStateChangeAction {
    type: UserActionTypes.USER_CHATS_STATE_CHANGE;
    payload: any;
}

interface ClearDataAction {
    type: UserActionTypes.CLEAR_DATA;
}

export type UserAction = UserStateChangeAction | UserPostsStateChangeAction | UserChatsStateChangeAction | ClearDataAction | UserFollowingStateChangeAction;

export interface IPost {
    caption: string;
    creation: {
        nanoseconds: number;
        seconds: number;
    },
    content: string;
    downloadURL: string;
    id: string;
}

export type IUser = {
    email: string;
    name: string;
    uid: string;
    image: string;
    description: string;
    role: string;
}
