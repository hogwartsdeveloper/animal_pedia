import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useFonts, ArchitectsDaughter_400Regular } from "@expo-google-fonts/architects-daughter";
import { FC } from "react";
import { Props } from "../../type";


const Landing: FC<Props> = ({ navigation }) => {
    const [fontsLoaded] = useFonts({
        ArchitectsDaughter_400Regular
    });

    if(!fontsLoaded) {
        return (
            <View>
                <Text>Loading</Text>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <Text style={styles.logo}>Animal Pedia</Text>
            <View>
                <TouchableOpacity 
                    style={styles.buttonContainer} 
                    onPress={() => navigation.navigate("SignUp")}
                >
                    <Text style={[styles.buttonText, styles.buttonSingUp]}>
                        Создать новый аккаунт
                    </Text>
                </TouchableOpacity>
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
    logo: {
        fontFamily: 'ArchitectsDaughter_400Regular',
        fontSize: 50,
        marginBottom: 30
    },
    buttonContainer: {
        backgroundColor: '#000',
        paddingHorizontal: 40,
        paddingVertical: 15,
        marginBottom: 20,
        borderRadius: 5
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