import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FC } from "react";
import { landingProps } from "../../type";
import { Button, Logo } from "../../components";


const Landing: FC<landingProps> = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Logo name="Animal Pedia" />
            <View>
                <Button 
                    name="Создать новый аккаунт" 
                    onPress={() => navigation.navigate('SignUp')}
                    container={true}
                />
                <Button 
                    name="Войти"
                    onPress={() => navigation.navigate("Login")}
                    container={false}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default Landing;