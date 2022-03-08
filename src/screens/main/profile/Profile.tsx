import { FC, useEffect, useState } from "react";
import { FlatList, Text, TouchableOpacity, View, StyleSheet, Image, ActivityIndicator} from "react-native";
import { auth } from "../../../../firebase";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { container, text, utils } from "../../../styles";
import { profileProps } from "../../../type";
import { FontAwesome5 } from "@expo/vector-icons";
import CachedImage from "../random/CachedImage";
import { IPost } from "../../../type/user";
import { useActions } from "../../../hooks/useActions";


type IUser = {
    email: string;
    name: string;
    uid: string;
    image: string;
}

const Profile: FC<profileProps> = ({ navigation, route}) => {
   
    const [user, setUser] = useState<IUser | null>(null);
    const [userPosts, setUserPosts] = useState<IPost[]>([]);
    const [loading, setLoading] = useState(true);
    const { currentUser, posts } = useTypedSelector(state => state.userState);
    

    useEffect(() => {
        setUser(currentUser);
        setUserPosts(posts);
        setLoading(false);
    }, []);

    if (loading) {
        return (
            <View style={{ height: '100%', justifyContent: 'center', margin: 'auto' }}>
                <ActivityIndicator style={{ alignSelf: 'center', marginBottom: 20 }} size="large" color="#00ff00" />
                <Text style={[ text.notAvailable ]}>Loading</Text>
            </View>
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
                                name="user-circle" size={80} color="black"
                            />
                        )
                        :
                        (
                            <Image 
                                style={[utils.profileImageBig, utils.marginBottomSmall]}
                                source={{
                                    uri: user?.image
                                }}
                            />
                        )
                    }


                    <View style={[container.container, container.horizontal, utils.justifyCenter, utils.padding10Sides]}>
                        <View style={[utils.justifyCenter, container.containerImage]}>
                            <Text style={[text.bold, text.large, text.center]}>{userPosts.length}</Text>
                            <Text style={[text.center]}>Posts</Text>
                        </View>
                    </View>
                </View>

                <View>
                    <Text style={[text.bold, styles.name]}>{user?.name}</Text>
                    <Text style={[text.bold, text.large, text.center]}>{posts.length}</Text>
                    <Text style={[text.center]}>Posts</Text>
                    <View style={[container.horizontal]}>
                        {route.params.uid === auth.currentUser?.uid
                            ?   <TouchableOpacity 
                                    style={utils.buttonOutlined}
                                    onPress={() => navigation.navigate('Edit')}
                                >
                                    <Text style={[text.bold, text.center]}>Редактировать</Text>
                                </TouchableOpacity>
                            :   null
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
                            <TouchableOpacity style={[container.containerImage, utils.borderWhite]}>
                                <CachedImage sourse={item.downloadURL} cacheKey={item.id} styles={container.image}/>
                            </TouchableOpacity>
                            
                        
                        )}
                    />
                    
                </View>
            )}
            keyExtractor={(index) => index.toString()}
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