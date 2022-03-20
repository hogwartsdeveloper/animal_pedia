import { FC, useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { container, text, utils } from "../../../styles";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import CachedImage from "../random/CachedImage";
import { feedProps } from "../../../type/screens";
import { FontAwesome5 } from '@expo/vector-icons';
import { IPost } from "../../../type/user";
import { useSearchPost } from "../../../hooks/useSearchPost";
import { AnimalsClass } from "../../../type/animals";


const Feed: FC<feedProps> = ({ navigation, route }) => {
    const [usersPosts, setUsersPosts] = useState<IPost[]>([]);
    const [filter, setFilter] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);
    const searchedPosts = useSearchPost(usersPosts, filter)

    const { posts } = useTypedSelector(state => state.userState);


    useEffect(() => {
        setUsersPosts(posts.filter(post => post.approved === true));
        setLoading(false);
    }, [posts])

    const getClass = (animalClass: string) => {
        
        switch(animalClass) {
            case 'bird':
                return AnimalsClass.bird
            case 'fish':
                return AnimalsClass.fish
            case 'mammal':
                return AnimalsClass.mammal
            default:
                return ''
        }
    }

    if (loading) {
        return (
            <View style={{ height: '100%', justifyContent: 'center', margin: 'auto'}}>
                <ActivityIndicator style={{ alignSelf: 'center', marginBottom: 20 }} size="large" color="#ffdb3e" />
            </View>
        )
    }


    return (
    
        <View style={[container.container, utils.backgroundWhite]}>
            <View style={{ marginVertical: 30, paddingHorizontal: 20}}>
                <TextInput 
                    style={utils.searchBar}
                    placeholder="Поиск статьи"
                    value={filter}
                    onChangeText={(text) => setFilter(text)}
                />
            </View>
            <FlatList 
                numColumns={1}
                horizontal={false}
                data={searchedPosts.length > 0 ? searchedPosts : usersPosts}
                renderItem={({ item}) => (
                    <View key={item.id}>
                        <TouchableOpacity
                            style={[container.horizontal, { alignItems: 'center'}]}
                            onPress={() => navigation.navigate('Profile', {uid: item.uid})}
                        >
                            {item.user.image === 'default' || !item.user.image
                                ? (
                                    <FontAwesome5 
                                        style={[utils.profileImageSmall]}
                                        name="user-circle" size={35} color="black"
                                    />
                                )
                                : (
                                    <CachedImage
                                        styles={utils.profileImageSmall}
                                        sourse={item.user.image}
                                        cacheKey={item.uid}
                                    />
                                )
                            }
                            <View style={{ alignSelf: 'center'}}>
                                <Text style={[text.medium, { marginBottom: 0}]}>{ item.user.name}</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[container.containerImage, utils.borderWhite, utils.marginBottom]}
                            onPress={() => navigation.navigate('Post', {item})}
                        >
                            <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: "bold"}}>{item.caption}</Text>
                            <Text style={{color: '#6b6e6c'}}>Вид: {getClass(item.class)}</Text>
                            <CachedImage sourse={item.downloadURL} cacheKey={item.id} styles={container.imagePost} />
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    );
};

export default Feed;