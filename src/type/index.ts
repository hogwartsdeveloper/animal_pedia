import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {IPost, IUser} from "./user";

export type RootStackParamList = {
    Landing: undefined;
    MainTab: undefined;
    Login: undefined;
    SignUp: undefined;
    Save: SaveRoute;
    AddPost: undefined;
    Profile: ProfileRoute;
    Search: undefined;
    Edit: undefined;
    Post: PostRoute;
    Feed: undefined;
}

type SaveRoute = {
    imageSource: string | undefined;
}

type ProfileRoute = {
    uid: string;
}

type PostRoute = {
    item: IPost;
}

export type landingProps = NativeStackScreenProps<RootStackParamList, 'Landing'>;
export type signUpProps = NativeStackScreenProps<RootStackParamList, 'SignUp'>;
export type loginProps = NativeStackScreenProps<RootStackParamList, 'Login'>;
export type addPostProps = NativeStackScreenProps<RootStackParamList, 'AddPost'>;
export type saveProps = NativeStackScreenProps<RootStackParamList, 'Save'>;
export type profileProps = NativeStackScreenProps<RootStackParamList, 'Profile'>;
export type searchProps = NativeStackScreenProps<RootStackParamList, 'Search'>;
export type editProfileProps = NativeStackScreenProps<RootStackParamList, 'Edit'>;
export type postProps = NativeStackScreenProps<RootStackParamList, 'Post'>;
export type feedProps = NativeStackScreenProps<RootStackParamList, 'Feed'>;
