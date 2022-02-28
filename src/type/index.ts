import { ParamListBase, RouteProp } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type RootStackParamList = {
    Landing: undefined;
    MainTab: undefined;
    Login: undefined;
    SignUp: undefined;
    Save: SaveRoute;
    AddPost: undefined;
}

type SaveRoute = {
    source: string | undefined;
    imageSource: string | undefined | null;
    type: number;
}

export type landingProps = NativeStackScreenProps<RootStackParamList, 'Landing'>;
export type signUpProps = NativeStackScreenProps<RootStackParamList, 'SignUp'>;
export type loginProps = NativeStackScreenProps<RootStackParamList, 'Login'>;
export type addPostProps = NativeStackScreenProps<RootStackParamList, 'AddPost'>;
export type saveProps = NativeStackScreenProps<RootStackParamList, 'Save'>;