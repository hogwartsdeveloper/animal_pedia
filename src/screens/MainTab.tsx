import { Text, View } from "react-native"
import { auth } from "../../firebase";
import { Button } from "../components";

const MainTab = () => {
    const logout = () => {
        auth.signOut();
    }

    return (
        <View>
            <Text>MainTab</Text>
            <Button name="logout" onPress={logout} container={true}/>
        </View>
    )
}

export default MainTab;