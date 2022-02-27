import { FC, useLayoutEffect, useState } from "react"
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { ActivityIndicator, Snackbar } from "react-native-paper";
import { container, navbar, text, utils } from "../../../styles";
import { Video } from "expo-av";
// @ts-ignore
import MentionsTextInput from 'react-native-mentions';
import { collection, doc, getFirestore, onSnapshot, query, serverTimestamp, setDoc, where } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage"
import { app, auth } from "../../../../firebase";
import { saveProps } from "../../../type";
import { Feather } from "@expo/vector-icons";
import { useActions } from "../../../hooks/useActions";
import { sendNotification } from "../../../redux/actions/user";

const Save: FC<saveProps> = ({ route, navigation }) => {
    const [caption, setCaption] = useState<string>("");
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState(false);
    const [keyword, setKeyword] = useState<string>("");
    const [data, setData] = useState<void | string>("");

    const { fetchUserPosts } = useActions();


    useLayoutEffect(() => {
        navigation.navigation.setOptions({
            headerRight: () => (
                <Feather style={navbar.image} name="check" size={24} color="green" onPress={() => uploadingImage()}/>
            )
        })
    })

    const uploadingImage = async () => {
        if(uploading) {
            return;
        }
        setUploading(true);
        let downloadURLStill = null;
        const childPath: string = `post/${auth.currentUser?.uid}/${Math.random().toString(36)}`

        let downloadURL = await SaveStorage(childPath, route.params.source)

        if (route.params.imageSource !== null) {
            downloadURLStill = await SaveStorage(childPath, route.params.imageSource)
        }
        savePostData(downloadURLStill, downloadURL)
    }

    const SaveStorage = async (path: string, image?: string) => {
        if (image === 'default') {
            return '';
        }

        if (image !== undefined) {
            const storage = getStorage(app);
            const fileRef = ref(storage, path);
    
            const response = await fetch(image);
            const blob =  await response.blob();
    
            const uploadTask = uploadBytesResumable(fileRef, blob);
    
            let url = ''
    
            getDownloadURL(uploadTask.snapshot.ref)
                .then((downloadURL) => {
                    console.log(`File availd at ${downloadURL}`);
                    url =  downloadURL;
                })
    
            return url;
        }
    }

    const savePostData = (downloadURLStill?: string | null, downloadURL?: string) => {
        let object = {
            downloadURL,
            downloadURLStill,
            caption,
            likesCount: 0,
            commentsCount: 0,
            type: route.params.type,
            creation: serverTimestamp()
        }
        if (downloadURLStill !== null) {
            object.downloadURLStill = downloadURLStill
        }

        
        if (auth.currentUser?.uid) {
            const db = getFirestore(app);
            const fireDoc = doc(db, 'posts', auth.currentUser?.uid);
            const colRef = doc(collection(fireDoc, "userPosts"));
            setDoc(colRef, object)
                .then((result) => {
                    fetchUserPosts();
                    navigation.navigation.popToTop();
                })
                .catch((error) => {
                    setUploading(false);
                    setError(true);
                });
            
            var pattern = /\B@[a-z0-9_-]+/gi;
            let array = caption.match(pattern);

            if (array !== null) {
                for (let i = 0; i < array.length; i++) {
                    const db = getFirestore(app);
                    const userCol = collection(db, "users")
                    const q = query(userCol, where("username", "==", array[i].substring(1)))
                    onSnapshot(q, (snapshot) => {
                        snapshot.forEach((doc) => {
                            sendNotification(doc.data().notificationToken, "New tag", `${auth.currentUser?.displayName} Tagged you in a post`, { type: 0, user: auth.currentUser?.uid})
                        })
                    })
                }
            }
        }
        
    }


    const renderSuggestionsRow = ({ item }: any, hidePanel: any) => {
        return (
            <TouchableOpacity
                onPress={() => onSuggestionTap(item.username, hidePanel)}
            >
                <View style={styles.suggestionsRowContainer}>
                    <View style={styles.userIconBox}>
                        <Image 
                            style={{ aspectRatio: 1 / 1, height: 45}}
                            source={{
                                uri: item.image
                            }}
                        />
                    </View>
                    <View style={styles.userDetailsBox}>
                        <Text style={styles.displayNameText}>{ item.name }</Text>
                        <Text style={styles.usernameText}>@{item.username}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    const onSuggestionTap = (username: any, hidePanel: any) => {
        hidePanel();
        const comment = caption.slice(0, - keyword.length)
        setCaption(comment + '@' + username + " ")
    }

    const callback = (keyword: string) => {
        setKeyword(keyword);
        const db = getFirestore(app);
        const usersCol = collection(db, 'users')
        const q = query(usersCol, where('username', ">=", keyword.substring(1)))
        onSnapshot(q, (querySnapshot) => {
            let result = querySnapshot.forEach((doc) => {
                const data = doc.data();
                const id = doc.id;
                return { id, ...data}
            });
            setData(result)
        })
    }


    return (
        <View style={[container.container, utils.backgroundWhite]}>
            {uploading
                ?
                (
                    <View style={[container.container, utils.justifyCenter, utils.alignItemsCenter]}>
                        <ActivityIndicator style={utils.marginBottom} size="large" />
                        <Text style={[text.bold, text.large]}>Upload in progress...</Text>
                    </View>
                )
                :
                (
                    <View style={container.container}>
                        <View style={[container.container, utils.backgroundWhite, utils.padding15]}>
                            <View style={[utils.marginBottom, {width: '100%'}]}>

                                <MentionsTextInput
                                    textInputStyle={{ borderColor: '#ebebeb', borderWidth: 1, padding: 5, fontSize: 15, width: '100%'}}
                                    suggestionsPanelStyle={{ backgroundColor: 'rgba(100, 100, 100, 0.1' }}
                                    loadingComponent={() => <View style={{ flex: 1, width: 200, justifyContent: 'center', alignItems: 'center' }}><ActivityIndicator /></View>}
                                    textInputMinHeight={30}
                                    textInputMaxHeight={80}
                                    trigger={'@'}
                                    triggerLocation={'new-word-only'}
                                    value={caption}
                                    onChangeText={setCaption}
                                    triggerCallback={callback.bind(this)}
                                    renderSuggestionsRow={renderSuggestionsRow.bind(this)}
                                    suggestionsData={data}
                                    keyExtractor={(item: any, index: any) => item.username}
                                    suggestionRowHeight={45}
                                    horizontal={true}
                                    MaxVisibleRowCount={3}
                                />
                            </View>
                            <View>
                                {route.params.type ? 
                                    <Image 
                                        style={[container.image, {backgroundColor: 'black'}]}
                                        source={{ uri: route.params.source}}
                                    />

                                    :

                                    <Video
                                        source={{ uri: route.params.source ? route.params.source : '' }}
                                        shouldPlay={true}
                                        isLooping={true}
                                        resizeMode="cover"
                                        style={{ aspectRatio: 1 / 1, backgroundColor: 'black' }}
                                    />
                                }
                            </View>
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