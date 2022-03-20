import { FC, useEffect, useState } from "react";
import { FlatList, Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { container, text, utils } from "../../../styles";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import CachedImage from "../random/CachedImage";
import { feedProps } from "../../../type/screens";
import { FontAwesome5 } from '@expo/vector-icons';


const Feed: FC<feedProps> = ({ navigation }) => {
    const [usersPosts, setUsersPosts] = useState<any[]>([]);

    const { posts } = useTypedSelector(state => state.userState);


    useEffect(() => {
        setUsersPosts(posts.filter(post => post.approved === true));
        if (posts[0]) {
            console.log(posts[0].user);
            
        }
        
    }, [posts])

    return (
    
        <View style={[container.container, utils.backgroundWhite]}>
            <View style={{ marginVertical: 30, paddingHorizontal: 20}}>
                <TextInput 
                    style={utils.searchBar}
                    placeholder="Поиск статьи"
                />
            </View>
            <FlatList 
                numColumns={1}
                horizontal={false}
                data={usersPosts}
                keyExtractor={(index) => index.toString()}
                renderItem={({ item, index}) => (
                    <View key={index}>
                        <TouchableOpacity
                            style={[container.horizontal, { alignItems: 'center'}]}
                            onPress={() => navigation.navigate('Profile', {uid: item.uid})}
                        >
                            {item.user.image === 'default'
                                ? (
                                    <FontAwesome5 
                                        style={[utils.profileImageSmall]}
                                        name="user-circle" size={35} color="black"
                                    />
                                )
                                : (
                                    <Image 
                                        style={[utils.profileImageSmall]}
                                        source={{
                                            uri: item.user.image
                                        }}
                                    />
                                )
                            }
                            <View style={{ alignSelf: 'center'}}>
                                <Text style={[text.bold, text.medium, { marginBottom: 0}]}>{ item.user.name}</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[container.containerImage, utils.borderWhite, utils.marginBottom]}
                            onPress={() => navigation.navigate('Post', {item})}
                        >
                            <CachedImage sourse={item.downloadURL} cacheKey={item.id} styles={container.imagePost} />
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    );
};

export default Feed;