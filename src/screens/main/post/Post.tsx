import React, { FC, useState } from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { IPost, IUser } from "../../../type/user";
import { postProps } from "../../../type";
import { container, text, utils } from "../../../styles";
import CachedImage from "../random/CachedImage";

const Post: FC<postProps> = ({ navigation, route }) => {
    const [item, setItem] = useState<IPost>(route.params.item);

    return (
        <View style={[container.container, utils.backgroundWhite]}>
            <View>
                <CachedImage 
                    cacheKey={item.id}
                    styles={[container.imagePost]}
                    sourse={item.downloadURL}
                />
            </View>
            <View style={[styles.contentPost]}>
                <View>
                    <Text style={[styles.titlePost, text.bold]}>{item.caption}</Text>
                </View>
                <View style={{paddingTop: 10}}>
                    <Text>{item.content}</Text>
                </View>
            </View>
        </View>
    )
};

export default Post;

const styles = StyleSheet.create({
    contentPost: {
        margin: 15
    },
    titlePost: {
        fontSize: 18,
        textAlign: 'center',
    }
})
