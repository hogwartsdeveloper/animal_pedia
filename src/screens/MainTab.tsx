import { auth } from "../../firebase";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { AddPost, Feed, Profile } from "./main";


const Tab = createMaterialBottomTabNavigator();

const MainTab = () => {
    const logout = () => {
        auth.signOut();
    }

    return (
        <Tab.Navigator
            activeColor='#111'
            barStyle={{ backgroundColor: '#ffdb3e' }}
        >
            <Tab.Screen 
                name="Лента" 
                component={Feed}
                options={{
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="home" color={color} size={26} />
                    )
                }}
            />
            <Tab.Screen 
                name="Добавить статию" 
                component={AddPost}
                options={{
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="plus-box" color={color} size={26} />
                    )
                }}
            />
            <Tab.Screen
                name="Профиль" 
                component={Profile}
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