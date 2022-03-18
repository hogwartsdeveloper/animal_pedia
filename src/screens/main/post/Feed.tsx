import { FC, useEffect, useRef, useState } from "react";
import { FlatList, RefreshControl, Text, Touchable, TouchableOpacity, View } from "react-native";
import { container, utils } from "../../../styles";
import { IPost } from "../../../type/user";
import BottomSheet from 'react-native-bottomsheet-reanimated'
import Loader from "../../../components/Loader";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { useActions } from "../../../hooks/useActions";
import CachedImage from "../random/CachedImage";
import { PostScreen } from "../..";

interface IFeedProps {
    feed: IPost;
    reload: () => void
}

const Feed: FC<IFeedProps> = () => {
    const [usersPosts, setUsersPosts] = useState<any[]>([]);

    const { uid, posts } = useTypedSelector(state => state.usersState);
    const { fetchUsersPosts } = useActions();

    useEffect(() => {
        setUsersPosts(posts);
        console.log(posts);
        
    }, [posts])

    return (
    
        // <View style={[container.container, utils.backgroundWhite]}>
        //     <FlatList 
        //         numColumns={1}
        //         horizontal={false}
        //         data={posts}
        //         keyExtractor={(item, index) => index.toString()}
        //         renderItem={({ item, index}) => (
        //             <View key={index} style={[container.containerImage, utils.borderWhite]}>
        //                 <Text>{item.caption}</Text>
        //                 <CachedImage sourse={item.downloadURL} cacheKey={item.id} styles={container.image} />
        //             </View>
        //         )}
        //     />
        // </View>
        <View>
            <Text>{posts[0] ? posts[0].caption: ''}</Text>
        </View>
    );
};

export default Feed;