import { FC, useEffect, useState } from "react";
import { FlatList, Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { auth } from "../../../../firebase";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { container, text, utils } from "../../../styles";
import { profileProps } from "../../../type/screens";
import { FontAwesome5 } from "@expo/vector-icons";
import CachedImage from "../random/CachedImage";
import { IPost, IUser } from "../../../type/user";
import Loader from "../../../components/Loader";

const Profile: FC<profileProps> = ({ navigation, route}) => {
   
    const [user, setUser] = useState<IUser | null>(null);
    const [userPosts, setUserPosts] = useState<IPost[]>([]);
    const [loading, setLoading] = useState(true);

    const { currentUser, posts } = useTypedSelector(state => state.userState);

    useEffect(() => {
        setUser(currentUser);
        setUserPosts(posts.filter(post => post.uid === route.params.uid));
        setLoading(false);
        
    }, [route.params.uid, currentUser, posts ]);

    if (loading) {
        return (
            <Loader />
        )
    }

    const showEditHeader = () => {
        return (
            <View style={[container.profileInfo]}>
                <View style={[container.row, {padding: 0}]}>

                    {user?.image === 'default'
                        ?
                        (
                            <FontAwesome5 
                                style={[utils.profileImageBig, utils.marginBottomSmall]}
                                name="user-circle" size={80} color="#ffdb3e"
                            />
                        )
                        :
                        (
                            <CachedImage 
                                styles={[utils.profileImageBig, utils.marginBottomSmall]}
                                sourse={user?.image ? user.image: ''}
                                cacheKey={user?.uid ? user.uid : ''}
                            />
                        )
                    }

                </View>

                <View>
                    <Text style={[text.bold, styles.name]}>{user?.name}</Text>
                    <View style={[container.horizontal]}>
                        {route.params.uid === auth.currentUser?.uid
                            ?   <TouchableOpacity 
                                    style={utils.buttonOutlined}
                                    onPress={() => navigation.navigate('Edit')}
                                >
                                    <Text style={[text.bold, text.center, {color: '#ffdb3e'}]}>Редактировать</Text>
                                </TouchableOpacity>
                            :  null
                        }
                    </View>
                    
                </View>
                
            </View>
        )
    }

    return (
            <FlatList
                ListHeaderComponent={showEditHeader}
                style={[container.container, utils.backgroundWhite]}
                data={[1]}
                renderItem={({item}) => (
                    <View style={utils.borderTopGray} key={item}>
                        <FlatList 
                            numColumns={3}
                            horizontal={false}
                            data={userPosts}
                            renderItem={({ item })=>(
                                <TouchableOpacity
                                    style={[container.containerImage, utils.borderWhite]}
                                    onPress={() => navigation.navigate('Post', {item})}
                                >
                                    <CachedImage sourse={item.downloadURL} cacheKey={item.id} styles={container.image}/>
                                </TouchableOpacity>
                            )}
                        />
                        
                    </View>
                )}
                keyExtractor={(item) => item.toString()}
            />
    );
};

const styles = StyleSheet.create({
    btn:{
        padding: 12,
        backgroundColor: '#ffdb3e',
        borderRadius: 10,
        flexDirection: "row",
        alignItems: "center",
        
    },

    viewStyle:{
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
    },

    name: {
        fontSize: 20,
        textTransform: "capitalize",
    },

    iconLogOut: {
        marginLeft: 10,
        color: "white",
    },

})

export default Profile;
