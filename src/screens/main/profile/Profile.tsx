import { FC, useEffect, useState } from "react";
import { FlatList, Text, TouchableOpacity, View, StyleSheet, Image, ActivityIndicator} from "react-native";
import { app, auth } from "../../../../firebase";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { container, text, utils } from "../../../styles";
import { profileProps } from "../../../type";
import { FontAwesome5 } from "@expo/vector-icons";
import CachedImage from "../random/CachedImage";
import { IPost, IUser } from "../../../type/user";
import Loader from "../../../components/Loader";
import { deleteDoc, doc, getFirestore, setDoc } from "firebase/firestore";
import { useActions } from "../../../hooks/useActions";


const Profile: FC<profileProps> = ({ navigation, route}) => {
   
    const [user, setUser] = useState<IUser | null>(null);
    const [userPosts, setUserPosts] = useState<IPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [followingUser, setFollowingUser] = useState(false);

    const { currentUser, posts, following } = useTypedSelector(state => state.userState);
    const { uid } = useTypedSelector(state => state.usersState);
    const { fetchUsersUid } = useActions();
    

    useEffect(() => {
        setUser(currentUser);
        setUserPosts(posts);
        setLoading(false);
        fetchUsersUid();
        console.log(uid);
        

        if (following.indexOf(route.params.uid) > -1) {
            setFollowingUser(true);
        } else {
            setFollowingUser(false);
        }
    }, [route.params.uid, currentUser, posts, following]);

    if (loading) {
        return (
            <Loader />
        )
    }

    if (user === null) {
        return (
            <View style={{ height: '100%', justifyContent: 'center', margin: 'auto' }}>
                <FontAwesome5 style={{ alignSelf: 'center', marginBottom: 20}} name="dizzy" size={40} color="black" />
                <Text style={[text.notAvailable]}>User Not Found</Text>
            </View>
        )
    }

    const onFollow = () => {
        const db = getFirestore(app);
        if (auth.currentUser?.uid) {
            const followRef = doc(db, 'following', auth.currentUser?.uid);
            const userFollowRef = doc(followRef, "userFollowing", route.params.uid)
            setDoc(userFollowRef, {});
        }
        
    };

    const onUnfollow = async() => {
        const db = getFirestore(app);
        if (auth.currentUser?.uid) {
            const followRef = doc(db, 'following', auth.currentUser?.uid);
            const userFollowRef = doc(followRef, "userFollowing", route.params.uid)
            deleteDoc(userFollowRef);
        }
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
                    <View style={[container.container, container.horizontal, utils.justifyCenter, utils.padding10Sides]}>
                        <View style={[utils.justifyCenter, container.containerImage]}>
                            <Text style={[text.bold, text.large, text.center]}>{userPosts.length}</Text>
                            <Text style={[text.center]}>Posts</Text>
                        </View>
                        <View style={[utils.justifyCenter, container.containerImage]}>
                            <Text style={[text.bold, text.large, text.center]}>{user.followersCount}</Text>
                            <Text style={[text.center]}>Followers</Text>
                        </View>
                        <View style={[utils.justifyCenter, container.containerImage]}>
                            <Text style={[text.bold, text.large, text.center]}>{user.followingCount}</Text>
                            <Text style={[text.center]}>Following</Text>
                        </View>
                    </View>
                    <View style={[container.horizontal]}>
                        {route.params.uid === auth.currentUser?.uid
                            ?   <TouchableOpacity 
                                    style={utils.buttonOutlined}
                                    onPress={() => navigation.navigate('Edit')}
                                >
                                    <Text style={[text.bold, text.center]}>Редактировать</Text>
                                </TouchableOpacity>
                            :   (
                                <View>
                                    {followingUser ? (
                                        <TouchableOpacity
                                            style={[utils.buttonOutlined, container.container, utils.margin15Right]}
                                            onPress={onUnfollow}
                                        >
                                            <Text style={[text.bold, text.center, text.green]}>Following</Text>
                                        </TouchableOpacity>
                                    )
                                        : (
                                            <TouchableOpacity
                                                style={[utils.buttonOutlined, container.container, utils.margin15Right]}
                                                onPress={onFollow}
                                            >
                                                <Text style={[text.bold, text.center, text.green]}>Follow</Text>
                                            </TouchableOpacity>
                                        )
                                    }
                                </View>
                            )
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
                                    onPress={() => navigation.navigate('Post', {item, user})}
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
