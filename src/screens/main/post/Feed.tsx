import { FC, useRef, useState } from "react";
import { FlatList, RefreshControl, Text, Touchable, TouchableOpacity, View } from "react-native";
import { container, utils } from "../../../styles";
import { IPost } from "../../../type/user";
import BottomSheet from 'react-native-bottomsheet-reanimated'

interface IFeedProps {
    feed: IPost;
    reload: () => void
}

const Feed: FC<IFeedProps> = () => {
    const [posts, setPosts] = useState([]);
    const [refreshing, setRefreshing] = useState<boolean>(false);
    const [unmutted, setUnmuted] = useState(null);
    const [sheetRef, setSheetRef] = useState(useRef(null));
    const [modalShow, setModalShow] = useState({ visible: false, item: null });
    const [isValid, setIsValid] = useState(true);

    // const onViewableItemsChanged = useRef(({ viewableItems, changed}) => {
    //     if (changed && changed.length > 0) {
    //         setViewPort(changed[0].index);
    //     }
    // })

    return (
    
    <View>
        <Text>feed</Text>
    </View>
    );
};

export default Feed;