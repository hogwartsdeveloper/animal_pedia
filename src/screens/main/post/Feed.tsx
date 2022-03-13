import { FC, useRef, useState } from "react";
import { FlatList, RefreshControl, Text, Touchable, TouchableOpacity, View } from "react-native";
import { container, utils } from "../../../styles";
import { IPost } from "../../../type/user";
import BottomSheet from 'react-native-bottomsheet-reanimated'
import Loader from "../../../components/Loader";
import { useActions } from "../../../hooks/useActions";
import Post from "./Post";

interface IFeedProps {
    feed: IPost;
    reload: () => void
}

const Feed: FC<IFeedProps> = () => {
    const [posts, setPosts] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [inViewPort, setInViewPort] = useState(0);


    const { clearData, fetchUser, fetchUserPosts, fetchUserFollowing} = useActions();

    const reload = () => {
        clearData(),
        fetchUser(),
        fetchUserPosts(),
        fetchUserFollowing()
    };

    const onViewableItemsChanged = useRef(( changed: any) => {
        if (changed && changed.length > 0) {
            setInViewPort(changed[0].index);
        }
    })

    return (
        <View style={[container.container, utils.backgroundWhite]}>
            <FlatList 
                refreshControl={
                    <RefreshControl 
                        refreshing={refreshing}
                        onRefresh={() => {
                            setRefreshing(true);
                            reload()
                        }}
                    />
                }

                onViewableItemsChanged={onViewableItemsChanged.current}
                viewabilityConfig={{
                    waitForInteraction: false,
                    viewAreaCoveragePercentThreshold: 70
                }}
                numColumns={1}
                horizontal={false}
                data={posts}
                keyExtractor={(item, index) => index.toString()}

                renderItem={({ item, index}) => (
                    <View key={index}>
                        <Text>Test</Text>
                    </View>
                )}
            />
        </View>
    )
};

export default Feed;