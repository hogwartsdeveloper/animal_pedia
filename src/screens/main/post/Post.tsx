import React, { FC, useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { IPost, IUser } from "../../../type/user";
import { postProps } from "../../../type";
import { container, utils } from "../../../styles";
import CachedImage from "../random/CachedImage";

const Post: FC<postProps> = ({ navigation, route }) => {
    const [user, setUser] = useState<IUser | null>(route.params.user);
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
            <View style={styles.contentPost}>
                <View>
                    <Text style={styles.titlePost}>{item.caption}</Text>
                </View>
                <View>
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
        textAlign: 'center'
    }
})
