import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { onAuthStateChanged } from "firebase/auth";
import { FC, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { auth } from "./firebase";
import { LandingScreen, LoginScreen, MainTab, SignUpScreen } from "./src/screens";
import { RootStackParamList } from "./src/type";

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
      <NavigationContainer>
          <Stack.Navigator initialRouteName="MainTab">
              <Stack.Screen name="MainTab" component={MainTab}/>
          </Stack.Navigator>
      </NavigationContainer>
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