import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FC } from "react";
import { landingProps } from "../../type";
import { Button, Logo } from "../../components";


const Landing: FC<landingProps> = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Logo name="Animal Pedia" />
            <View>
                <Button name="Создать новый аккаунт" onPress={() => navigation.navigate('SignUp')}/>
                <TouchableOpacity
                    onPress={() => navigation.navigate("Login")}
                >
                    <Text style={[styles.buttonText, styles.buttonLogin]}>
                        Войти
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        textAlign: 'center',
        fontWeight: '600',
    },
    buttonSingUp: {
        color: '#ffdb3e'
    },
    buttonLogin: {
        color: '#111'
    }
})

export default Landing;