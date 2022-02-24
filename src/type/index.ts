import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type RootStackParamList = {
    Landing: undefined;
    MainTab: undefined;
    Login: undefined;
    SignUp: undefined;
}

export type landingProps = NativeStackScreenProps<RootStackParamList, 'Landing'>;
export type signUpProps = NativeStackScreenProps<RootStackParamList, 'SignUp'>;
export type loginProps = NativeStackScreenProps<RootStackParamList, 'Login'>;