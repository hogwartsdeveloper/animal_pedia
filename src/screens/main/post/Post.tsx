import React, { FC, useRef, useState } from "react";
import { Text, View } from "react-native";
import { IPost, IUser } from "../../../type/user";
import { postProps } from "../../../type";

const Post: FC<postProps> = ({ navigation, route }) => {
    const [user, setUser] = useState<IUser | null>(route.params.user);
    const [item, setItem] = useState<IPost>(route.params.item);

    return (
        <View>
            <Text>{user?.name}</Text>
            <Text>{item.caption}</Text>
        </View>
    )
};

export default Post;
