import { FC, useEffect, useRef, useState } from "react";
import { FlatList, RefreshControl, Text, Touchable, TouchableOpacity, View } from "react-native";
import { container, utils } from "../../../styles";
import { IPost } from "../../../type/user";
import BottomSheet from 'react-native-bottomsheet-reanimated'
import Loader from "../../../components/Loader";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { useActions } from "../../../hooks/useActions";

interface IFeedProps {
    feed: IPost;
    reload: () => void
}

const Feed: FC<IFeedProps> = () => {
    const [post, setPost] = useState([]);
    const [refreshing, setRefreshing] = useState<boolean>(false);
    const [unmutted, setUnmuted] = useState(null);
    const [sheetRef, setSheetRef] = useState(useRef(null));
    const [modalShow, setModalShow] = useState({ visible: false, item: null });
    const [isValid, setIsValid] = useState(true);

    const { uid, posts } = useTypedSelector(state => state.usersState);
    const { fetchUsersPosts } = useActions();

    useEffect(() => {
        fetchUsersPosts(uid);
        console.log(uid);
    }, [uid])

    useEffect(() => {
    }, [posts])

    return (
    
    <View>
        <Loader />
    </View>
    );
};

export default Feed;