import React, { FC, useEffect, useLayoutEffect, useState } from "react";
import * as ImagePicker from 'expo-image-picker';
import * as Updates from 'expo-updates';
import { Image, Text, TouchableOpacity, View, TextInput, Button } from "react-native";
import { container, form, navbar, text, utils } from "../../../styles";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { FontAwesome5, Feather } from "@expo/vector-icons";
import { app, auth } from "../../../../firebase";
import { editProfileProps } from "../../../type";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { doc, getFirestore, updateDoc } from "firebase/firestore";

const Edit: FC<editProfileProps> = ({ navigation }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState<string>('');
    const [imageChanged, setImageChanged] = useState<boolean>(false);
    const [hasGalleryPermission, setHasGalleryPermission] = useState(null);

    const {currentUser} = useTypedSelector(state => state.userState);

    useEffect(() => {
        setName(currentUser.name);
        setImage(currentUser.image);

        if (currentUser.description !== undefined) {
            setDescription(currentUser.description);
        }
        console.log(currentUser);
    }, []);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Feather style={navbar.image} name="check" size={24} color="green" onPress={() => {console.log({ name, description}); save()}} />
            )
        })
    });

    const onLogout = async () => {
        auth.signOut();
        Updates.reloadAsync();
    }

    const imagePicker = async () => {
        if (true) {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1
            });

            if (!result.cancelled) {
                setImage(result.uri);
                setImageChanged(true);
            }
        }
    };

    const save = async () => {
        if (imageChanged) {
            const uri = image;
            const childPath = `profile/${auth.currentUser?.uid}`;

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
                            if (auth.currentUser?.uid) {
                                const db = getFirestore(app);
                                const fileDoc = doc(db, 'users', auth.currentUser?.uid);
                                updateDoc(fileDoc, {
                                    name,
                                    description,
                                    image: downloadURL
                                }).then(() => {
                                    navigation.goBack()
                                })
                            }
                        })
                }
            )
        } else {
            saveData({
                name,
                description
            })
        }
    }

    const saveData = (data: {}) => {
        if (auth.currentUser?.uid) {
            const db = getFirestore(app);
            const docRef = doc(db, 'users', auth.currentUser?.uid)
            updateDoc(docRef, data)
                .then(() => {
                    navigation.goBack();
                }) 
        }
    }

    return (
        <View style={container.form}>
            <TouchableOpacity style={[utils.centerHorizonta, utils.marginBottom]} onPress={imagePicker}>
                {image === 'default'
                    ?
                    (
                        <FontAwesome5 
                            style={[utils.profileImageBig, utils.marginBottomSmall]}
                            name="user-circle" size={80} color="black"
                        />
                    )
                    :
                    (
                        <Image 
                            style={[utils.profileImageBig, utils.marginBottomSmall]}
                            source={{
                                uri: image
                            }}
                        />
                    )
                }
                <Text style={text.changePhoto}>Change Profile Photo</Text>
            </TouchableOpacity>
            <TextInput 
                value={name}
                style={form.textInput}
                placeholder="Name"
                onChangeText={(name) => setName(name)}
            />
            <TextInput 
                value="description"
                style={[form.textInput]}
                placeholder="Description"
                onChangeText={(description) => setDescription(description)}
            />

            <Button 
                title="Logout"
                onPress={onLogout}
            />
        </View>
    )
};

export default Edit;