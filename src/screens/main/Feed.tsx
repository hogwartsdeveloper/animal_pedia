import { FC, useRef, useState } from "react";
import { FlatList, RefreshControl, Text, View } from "react-native";
import { container, utils } from "../../styles";
import { IPost } from "../../type/user";
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

    const onViewableItemsChanged = useRef(({ viewableItems, changed}) => {
        if (changed && changed.length > 0) {
            setViewPort(changed[0].index);
        }
    })

    return (
       <View style={[ container.container, utils.backgroundWhite ]}>
           
           <FlatList
            refreshControl={
                <RefreshControl 
                    refreshing={refreshing}
                    onRefresh={() => {
                        setRefreshing(true)
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
                    <Post route={{ params: {user: item.user, item, index, unmutted, inViewPort, setUnmuted, setModalShow, feed: true}}}    
                </View>
            )}
           />

           <BottomSheet 
                bottomSheerColor="#fff"
                ref={setSheetRef}
                initialPosition={0}
                snapPoints={[300, 0]}
                isBackDrop={true}
                isBackDropDismissByPress={true}
                backDropColor="black"
                isModal
                containerStyle={{ backgroundColor: 'white'}}
                tipStyle={{ backgroundColor: 'white'}}
                headerStyle={{ backgroundColor: 'white', flex: 1}}
                bodyStyle={{}}
           />
       </View>
    );
};

export default Feed;