import { FC, useState } from "react";
import { StyleSheet, TextInput, View } from "react-native"
import { Button, Logo } from "../../components";
import { signUpProps } from "../../type";

const SignUp: FC<signUpProps> = ({ navigation }) => {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    return (
        <View style={styles.container}>
            <Logo name="Animal Pedia"/>
            <View>
                <View>
                    <TextInput 
                        placeholder="Введите имя"
                        onChangeText={(name) => setName(name)}
                    />
                </View>

                <View>
                    <TextInput 
                        placeholder="Введите email"
                        onChangeText={(email) => setEmail(email)}
                    />
                </View>

                <View>
                    <TextInput 
                        placeholder="Введите пароль"
                        onChangeText={(password) => setPassword(password)}
                    />
                </View>

                <Button name="Создать новый аккаунт" onPress={() => console.log("SignUp")} />
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default SignUp;