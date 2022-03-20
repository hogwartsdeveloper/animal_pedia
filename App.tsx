import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { onAuthStateChanged } from "firebase/auth";
import React, { FC, useEffect, useState } from "react";
import { Provider } from "react-redux";
import { auth } from "./firebase";
import { store } from "./src/redux";
import { 
    LandingScreen, 
    LoginScreen, 
    SignUpScreen, 
    SaveScreen, 
    ProfileScreen, 
    EditProfileScreen, 
    PostScreen, 
    DashboardScreen 
} from "./src/screens";
import MainTab from "./src/screens/MainTab";
import { RootStackParamList } from "./src/type/screens";
import { LogBox, View, ActivityIndicator } from "react-native";
import Loader from "./src/components/Loader";

LogBox.ignoreLogs(['AsyncStorage has been extracted from react-native core', 'Setting a timer for a long period of time'])

const Stack = createNativeStackNavigator<RootStackParamList>()

const App: FC = () => {
    const [loaded, setLoaded] = useState<boolean>(false);
    const [loggedIn, setLoggedId] = useState<boolean>(false);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if(!user) {
                setLoggedId(false);
                setLoaded(true);
            } else {
                setLoggedId(true)
                setLoaded(true)
            }
        })
    })

    if(!loaded) {
        return (
            <View style={{ height: '100%', justifyContent: 'center', margin: 'auto'}}>
                <ActivityIndicator style={{ alignSelf: 'center', marginBottom: 20 }} size="large" color="#ffdb3e" />
            </View>
        )
    }

    if(!loggedIn) {
        return (
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Landing">
                    <Stack.Screen name="Landing" component={LandingScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="Login" component={LoginScreen} />
                    <Stack.Screen name="SignUp" component={SignUpScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        )
    }

    return (
        <Provider store={store}>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="MainTab">
                    <Stack.Screen name="MainTab" component={MainTab}/>
                    <Stack.Screen name='Save' component={SaveScreen} />
                    <Stack.Screen name='Profile' component={ProfileScreen} />
                    <Stack.Screen name='Edit' component={EditProfileScreen} />
                    <Stack.Screen name='Post' component={PostScreen} />
                    <Stack.Screen name="Dashboard" component={DashboardScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    )
}

export default App;
