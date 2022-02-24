import { auth } from "../../firebase";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { AddPost, Feed } from "./main";


const Tab = createMaterialBottomTabNavigator();

const MainTab = () => {
    const logout = () => {
        auth.signOut();
    }

    return (
        <Tab.Navigator>
            <Tab.Screen 
                name="Лента" 
                component={Feed}
                options={{
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="home" color={color} size={26} />
                    )
                }}
            />
            <Tab.Screen name="Add" component={AddPost} />
            <Tab.Screen name="Profile" component={AddPost} />
        </Tab.Navigator>
    )
}

export default MainTab;