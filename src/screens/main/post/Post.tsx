import React, { FC, useRef, useState } from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { IPost, IUser } from "../../../type/user";
import { postProps } from "../../../type";
import { container, text, utils } from "../../../styles";
import CachedImage from "../random/CachedImage";
import { ScrollView } from "react-native-gesture-handler";

const Post: FC<postProps> = ({ navigation, route }) => {
    const [user, setUser] = useState<IUser | null>(route.params.user);
    const [item, setItem] = useState<IPost>(route.params.item);

    return (
        <ScrollView style={[container.container, utils.backgroundWhite]}>
            <View style={[container.horizontal, { alignItems: 'center', padding: 10}]}>
                {user ?
                    <TouchableOpacity
                        style={[container.horizontal, {alignItems: 'center'}]}
                        onPress={() => navigation.navigate('Profile', {uid: user?.uid})}
                    >
                        {user?.image === 'default' ?
                            (
                                <FontAwesome5 
                                    style={[utils.profileImageSmall]}
                                    name="user-circle"
                                    size={35} color="black"
                                />
                            )
                            :
                            (
                                <CachedImage 
                                    cacheKey={user?.uid}
                                    styles={[utils.profileImageSmall]}
                                    sourse={user.image}
                                />
                            )
                        }
                        <View style={{ alignSelf: 'center'}}>
                            <Text style={[text.bold, text.medium, {marginBottom: 0}]}>{user?.name}</Text>
                        </View>
                    </TouchableOpacity>
                    : null}
            </View>
            <View>
                <CachedImage 
                    cacheKey={item.id}
                    styles={[container.imagePost]}
                    sourse={item.downloadURL}
                />
            </View>
            <View style={styles.contentPost}>
                <View>
                    <Text style={styles.titlePost}>{item.caption}</Text>
                </View>
                <View>
                    <Text>{item.content}</Text>
                </View>
            </View>
        </ScrollView>
    )
};

export default Post;

const styles = StyleSheet.create({
    contentPost: {
        margin: 15
    },
    titlePost: {
        fontSize: 18,
        textAlign: 'center'
    }
})
