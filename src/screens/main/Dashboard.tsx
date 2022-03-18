import { FC, useEffect } from "react";
import { Button, FlatList, Text, TouchableOpacity, View } from "react-native";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { container, utils } from "../../styles";
import { dashboardProps } from "../../type";
import CachedImage from "./random/CachedImage";

const Dashboard: FC<dashboardProps> = ({ navigation }) => {
    const { posts } = useTypedSelector(state => state.usersState);

    useEffect(() => {
        console.log(posts);
    }, [posts])
    return (
        <View style={[container.container, utils.backgroundWhite]}>
            <FlatList 
                numColumns={1}
                horizontal={false}
                data={posts}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item}) => (
                    <>
                        <TouchableOpacity
                            style={[container.containerImage, utils.borderWhite]}
                            onPress={() => navigation.navigate('Post', {item})}
                        >
                            <CachedImage sourse={item.downloadURL} cacheKey={item.id} styles={container.imagePost} />
                        </TouchableOpacity>
                        <View>
                            <Button title="Утвердить" onPress={() => console.log('Approve')} />
                            <Button title="Удалить" onPress={() => console.log('Удалить')} />
                        </View>
                    </>
                )}
            />
        </View>
    )
}

export default Dashboard;