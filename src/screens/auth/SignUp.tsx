import { FC, useState } from "react";
import { StyleSheet, TextInput, View } from "react-native"
import { Button, Logo } from "../../components";
import { signUpProps } from "../../type";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";

const SignUp: FC<signUpProps> = ({ navigation }) => {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    return (
        <View style={styles.container}>
            <Logo name="Animal Pedia"/>
            <View>
                <View style={styles.inputContainer}>
                    <View style={{marginRight: 15}}>
                        <FontAwesome5 name="cat" size={24} color="black" />
                    </View>
                    <TextInput 
                        placeholder="Введите имя"
                        onChangeText={(name) => setName(name)}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <View style={{marginRight: 15}}>
                        <MaterialIcons name="email" size={24} color="black" />
                    </View>
                    <TextInput 
                        placeholder="Введите email"
                        onChangeText={(email) => setEmail(email)}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <View style={{marginRight: 15}}>
                        <FontAwesome5 name="lock" size={24} color="black" />
                    </View>
                    <TextInput 
                        placeholder="Введите пароль"
                        onChangeText={(password) => setPassword(password)}
                    />
                </View>

                <Button 
                    name="Создать новый аккаунт" 
                    onPress={() => console.log("SignUp")} 
                    container={true}
                />
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
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 2,
        paddingHorizontal: 20,
        borderColor: '#fbd52c',
        borderRadius: 5,
        paddingVertical: 10,
        marginBottom: 7
    }
})

export default SignUp;