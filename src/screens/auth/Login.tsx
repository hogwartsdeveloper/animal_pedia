import { signInWithEmailAndPassword } from "firebase/auth";
import { FC, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { auth } from "../../../firebase";
import { Button, Input, Logo } from "../../components";
import { loginProps } from "../../type/screens";
import { Dimensions } from "react-native";

const windowWidth = Dimensions.get('window').width;

const Login: FC<loginProps> = ({ navigation }) => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const onLogin = () => {
        if(email && password) {
            signInWithEmailAndPassword(auth, email, password)
            .then((result) => {
                console.log(result);
                alert("Welcome baby!")
            })
            .catch((error) => console.log(error))
        }
    }

    return (
        <View style={styles.container}>
            <Logo name="Animal Pedia" />
            <Input 
                placeholder="Введите email"
                value={email}
                onChangeText={(text) => setEmail(text)}
                icon={true}
                iconName="email"
                style={styles.inputWidth}
            />
            <Input 
                placeholder="Введите пароль"
                value={password}
                onChangeText={(text) => setPassword(text)}
                icon={true}
                iconName="lock"
                style={styles.inputWidth}
            />
            <Button name="Войти" 
                onPress={onLogin}
                container={true}
            />

            <View style={styles.linkContainer}>
                <Text>У вас нет аккаунта?</Text>
                <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
                    <Text style={styles.linkItem}>Зарегистрироваться</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    linkContainer: {
        flexDirection: 'row'
    },
    linkItem: {
        marginLeft: 5,
        color: '#0c9af6',
        fontWeight: '600'
    },
    inputWidth: {
        width: (windowWidth / 100) * 60
    }
})

export default Login;
