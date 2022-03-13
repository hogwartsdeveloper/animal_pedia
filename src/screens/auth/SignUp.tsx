import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, getFirestore, setDoc } from "firebase/firestore"
import { FC, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from "react-native"
import { app, auth } from "../../../firebase";
import { Button, Input, Logo } from "../../components";
import { signUpProps } from "../../type";

const SignUp: FC<signUpProps> = ({ navigation }) => {
    const [userName, setUserName] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const onSignUp = () => {
        if(name && email && password) {
            createUserWithEmailAndPassword(auth, email, password)
            .then((result) => {
                const db = getFirestore(app);
                const docRef = doc(db, "users", auth.currentUser?.uid ? auth.currentUser?.uid : "")
                setDoc(docRef, {
                    name,
                    email,
                    userName,
                    image: 'default',
                    followingCount: 0,
                    followersCount: 0
                })
                alert("Welcome baby!")
            })
            .catch((error) => console.log(error))
        } else {
            alert("Заполните все поля!")
        }
    }

    return (
        <ScrollView>
            <View style={styles.container}>
                <Logo name="Animal Pedia"/>
                <View>
                    <Input 
                        placeholder="Введите username"
                        value={userName}
                        onChangeText={(userName) => setUserName(userName)}
                        icon={false}
                    />
                    <Input 
                        placeholder="Введите имя" 
                        value={name}
                        onChangeText={(text) => setName(text)}
                        icon={true}
                        iconName="cat"
                    />
                    <Input 
                        placeholder="Введите email" 
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                        icon={true}
                        iconName="email"
                    />
                    <Input 
                        placeholder="Введите пароль" 
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                        icon={true}
                        iconName="lock"
                    />

                    <Button 
                        name="Создать новый аккаунт" 
                        onPress={onSignUp} 
                        container={true}
                    />

                    <View style={styles.linkContainer}>
                        <Text>У вас уже есть аккаунт?</Text>
                        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                            <Text style={styles.linkItem}>Войти</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ScrollView>
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
    }
})

export default SignUp;