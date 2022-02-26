import { useState } from "react"
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { container, text, utils } from "../../styles";
import { MentionsInput } from "react-mentions";
// @ts-ignore
import MentionsTextInput from 'react-native-mentions';
import { collection, getFirestore, onSnapshot, query, where } from "firebase/firestore";
import { app, auth } from "../../../firebase";

const Save = () => {
    const [caption, setCaption] = useState<string>("");
    const [uploading, setUploading] = useState(false);
    const [keyword, setKeyword] = useState<string>("");
    const [data, setData] = useState<void | string>("");


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
                        </View>
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