import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type RootStackParamList = {
    Landing: undefined;
    MainTab: undefined;
    Login: undefined;
    SignUp: undefined;
}

export type Props = NativeStackScreenProps<RootStackParamList, 'Landing'>;