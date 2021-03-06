import { FC, useLayoutEffect, useState } from "react"
import { View, StyleSheet, Image, TextInput, ActivityIndicator } from "react-native";
import { Snackbar } from "react-native-paper";
import { container, utils } from "../../../styles";
import { collection, doc, getFirestore, serverTimestamp, setDoc } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage"
import { app, auth } from "../../../../firebase";
import { saveProps } from "../../../type/screens";
import { Feather } from "@expo/vector-icons";
import { useActions } from "../../../hooks/useActions";
import { IAnimal } from "../../../type/animals";
import DropDownPicker from 'react-native-dropdown-picker';

const Save: FC<saveProps> = ({ navigation, route }) => {
    const [caption, setCaption] = useState<string>("");
    const [content, setContent] = useState<string>('');
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState(false);


    const [openSelect, setOpenSelect] = useState(false);
    const [valueSelect, setValueSelect] = useState<string | null | number | boolean>('');
    const [itemsSelect, setItemSelect] = useState<IAnimal[]>([
        {label: 'Млекопитающие', value: 'mammal'},
        {label: 'Птицы', value: 'bird'},
        {label: 'Рыбы', value: 'fish'}
    ])

    const { fetchUserPosts } = useActions();


    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Feather name="check" size={24} color="#ffdb3e" onPress={uploadingImage}/>
            )
        })
    })

    const uploadingImage = async () => {
        if(uploading) {
            return;
        }
        setUploading(true);
        let uri: string | undefined = route.params.imageSource;
        const childPath = `posts/${auth.currentUser?.uid}/${Math.random().toString(36)}`

        if (uri) {
            const response = await fetch(uri);
            const blob = await response.blob();
            const storage = getStorage(app);
            const fileRef = ref(storage, childPath);

            const uploadTask = uploadBytesResumable(fileRef, blob);

            uploadTask.on('state_changed', 
                (snapshot) => {
                    console.log(`transferred: ${snapshot.bytesTransferred}`);
                },
                (error) => {
                    console.log(error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref)
                        .then((downloadURL) => {
                            savePostData(downloadURL)
                        })
                }
            )

        }
    }


    const savePostData = (downloadURL: string) => {
        if (auth.currentUser?.uid) {
            const db = getFirestore(app);
            const postColl = collection(db, 'posts');
            setDoc(doc(postColl), {
                uid: auth.currentUser.uid,
                downloadURL,
                caption,
                content,
                class: valueSelect,
                creation: serverTimestamp(),
                approved: false
            })
                .then((result) => {
                    console.log(result);
                    fetchUserPosts();
                    navigation.popToTop();
                })
                .catch((error) => {
                    console.log(error)
                    setUploading(false);
                    setError(true);
                });
            console.log(downloadURL);
        }
        
    }


    return (
        <View style={[container.container, utils.backgroundWhite]}>
            {uploading
                ?
                (
                    <View style={{ height: '100%', justifyContent: 'center', margin: 'auto'}}>
                        <ActivityIndicator style={{ alignSelf: 'center', marginBottom: 20 }} size="large" color="#ffdb3e" />
                    </View>
                )
                :
                (
                    <View style={container.container}>
                        <View style={[container.container, utils.backgroundWhite, utils.padding15]}>
                            <View style={[utils.marginBottom, {width: '100%'}]}>
                                <TextInput 
                                    style={{ borderColor: '#ebebeb', borderWidth: 1, padding: 5, fontSize: 15, width: '100%' }}
                                    placeholder="Введите название поста..."
                                    onChangeText={(text) => setCaption(text)}
                                />
                            </View>
                            <View style={[utils.marginBottom]}>
                                <Image 
                                    style={[container.image, {backgroundColor: 'black', aspectRatio: 2 / 1}]}
                                    source={{ uri: route.params.imageSource}}
                                />

                            </View>
                            <View>
                                <TextInput 
                                    multiline={true} 
                                    style={{ borderColor: '#ebebeb', borderWidth: 1, padding: 10, fontSize: 15, width: '100%', marginBottom: 10 }}
                                    placeholder="Введите контент поста..."
                                    value={content}
                                    onChangeText={(content) => setContent(content)}
                                />


                            </View>
                            <DropDownPicker 
                                open={openSelect}
                                value={valueSelect}
                                items={itemsSelect}
                                setOpen={setOpenSelect}
                                setValue={setValueSelect}
                                setItems={setItemSelect}
                                placeholder='Выберите класс животных'
                                style={{borderColor: '#ebebeb', borderWidth: 1}}
                                placeholderStyle={{color: '#cbcbcb'}}
                                dropDownDirection='BOTTOM'
                                dropDownContainerStyle={{borderColor: '#ebebeb', borderWidth: 1}}
                            />
                        </View>
                        <Snackbar
                            visible={error}
                            duration={2000}
                            onDismiss={() => setError(false)}
                        >
                            Something Went Wrong!
                        </Snackbar>
                    </View>
                )
            }

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 300,
        justifyContent: 'flex-end',
        paddingTop: 100
    },
    suggestionsRowContainer: {
        flexDirection: 'row'
    },
    userIconBox: {
        height: 45,
        width: 45,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#54c19c'
    },
    userDetailsBox: {
        flex: 1,
        justifyContent: 'center',
        paddingLeft: 10,
        paddingRight: 15
    },
    displayNameText: {
        fontSize: 13,
        fontWeight: '500'
    },
    usernameText: {
        fontSize: 12,
        color: 'rgba(0, 0, 0, 0.6)'
    }
})

export default Save;