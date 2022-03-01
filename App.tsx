import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { onAuthStateChanged } from "firebase/auth";
import { FC, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Provider } from "react-redux";
import { auth } from "./firebase";
import { store } from "./src/redux";
import { LandingScreen, LoginScreen, SignUpScreen, SaveScreen } from "./src/screens";
import MainTab from "./src/screens/MainTab";
import { RootStackParamList } from "./src/type";
import { LogBox } from "react-native";

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
            <View style={styles.loadingContainer}>
                <Text>Loading</Text>
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
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    )
}

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default App;