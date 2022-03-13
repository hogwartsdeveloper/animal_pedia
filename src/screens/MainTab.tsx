import { auth } from "../../firebase";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { PhotographicScreen, ProfileScreen, FeedScreen } from "./index";
import { useEffect } from "react";
import { useActions } from "../hooks/useActions";


const Tab = createMaterialBottomTabNavigator();

const MainTab = () => {
    const { fetchUser, fetchUserPosts, clearData } = useActions();

    const logout = () => {
        auth.signOut();
    }

    useEffect(() => {
        clearData();
        fetchUser();
        fetchUserPosts();
    }, [])

    return (
        <Tab.Navigator
            activeColor='#111'
            barStyle={{ backgroundColor: '#ffdb3e' }}
        >
            <Tab.Screen 
                name="Лента" 
                component={FeedScreen}
                options={{
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="home" color={color} size={26} />
                    )
                }}
            />
            <Tab.Screen 
                name="Добавить статию" 
                component={PhotographicScreen}
                options={{
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="plus-box" color={color} size={26} />
                    )
                }}
            />
            <Tab.Screen
                name="Профиль" 
                component={ProfileScreen}
                listeners={({ navigation }) => ({
                    tabPress: event => {
                        event.preventDefault();
                        navigation.navigate("Profile", {uid: auth.currentUser?.uid})
                    }
                })}
                options={{
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="account" color={color} size={26} />
                    )
                }} 
            />
        </Tab.Navigator>
    )
}

export default MainTab;