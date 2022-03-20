import { FC, useEffect, useState } from "react";
import { FlatList, Text, TouchableOpacity, View, StyleSheet, ActivityIndicator } from "react-native";
import { app, auth } from "../../../../firebase";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { container, text, utils } from "../../../styles";
import { profileProps } from "../../../type/screens";
import { FontAwesome5 } from "@expo/vector-icons";
import CachedImage from "../random/CachedImage";
import { IPost, IUser, IUser2 } from "../../../type/user";
import { doc, getFirestore, onSnapshot } from "firebase/firestore";

const Profile: FC<profileProps> = ({ navigation, route}) => {
   
    const [user, setUser] = useState<IUser2 | null>(null);
    const [userPosts, setUserPosts] = useState<IPost[]>([]);
    const [loading, setLoading] = useState(true);

    const { currentUser, posts } = useTypedSelector(state => state.userState);

    useEffect(() => {
        setUserPosts(posts.filter(post => post.uid === route.params.uid && post.approved === true));
        if (route.params.uid === auth.currentUser?.uid) {
            setUser(currentUser);
            setLoading(false);
        } else {
            const db = getFirestore(app);
            const usersRef = doc(db, 'users', route.params.uid);
            onSnapshot(usersRef, (snapshot) => {
                if (snapshot.exists()) {
                    navigation.setOptions({title: snapshot.data().userName})
                    setUser({
                        id: snapshot.id,
                        description: snapshot.data().description,
                        email: snapshot.data().email,
                        image: snapshot.data().image,
                        name: snapshot.data().name,
                        role: snapshot.data().role,
                        userName: snapshot.data().userName
                    })
                }
                setLoading(false)
            })
        }
        
        
        
    }, [route.params.uid, currentUser, posts ]);

    if (loading) {
        return (
            <View style={{ height: '100%', justifyContent: 'center', margin: 'auto'}}>
                <ActivityIndicator style={{ alignSelf: 'center', marginBottom: 20 }} size="large" color="#ffdb3e" />
            </View>
        )
    }

    const showEditHeader = () => {
        return (
            <View style={[container.profileInfo]}>
                <View style={[container.container, {padding: 0}]}>

                    {user?.image === 'default' || !user?.image
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
                                sourse={user?.image}
                                cacheKey={route.params.uid}
                            />
                        )
                    }

                    <View>
                        <Text style={[text.bold, styles.name]}>{user?.name}</Text>
                        <Text style={{color: '#6b6e6c'}}>{user?.role}</Text>
                    </View>
                    

                </View>

                <View>

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
