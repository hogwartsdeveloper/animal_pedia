import { collection, doc, getFirestore, onSnapshot, orderBy, query } from "firebase/firestore";
import { FC, useEffect, useState } from "react";
import { FlatList, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { app, auth } from "../../../../firebase";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { container, text, utils } from "../../../styles";
import { profileProps } from "../../../type";
import { FontAwesome5 } from "@expo/vector-icons";
import CachedImage from "../random/CachedImage";

type IUser = {
    email: string;
    name: string;
    uid: string;
}

const Profile: FC<profileProps> = ({ navigation, route}) => {
    const [ userPosts, setUserPosts] = useState<any[]>([]);
    const [ user, setUser] = useState<IUser>();
    const [ loading, setLoading ] = useState(true);
    const [ followingUser, setFollowingUser ] = useState(false);
    const { currentUser, posts, following} = useTypedSelector(state => state.userState);

    useEffect(() => {
    
        // if (route.params.uid === auth.currentUser?.uid) {
        //     setUser(currentUser);
        //     setUserPosts(posts);
        //     setLoading(false)
        // } else {
            const db = getFirestore(app);
            const userDoc = doc(db, 'users', route.params.uid);

            const postsDoc = doc(db, 'posts', route.params.uid);
            const postsCol = collection(postsDoc, "userPosts");
            const q = query(postsCol, orderBy("creation", "desc"))

            onSnapshot(userDoc, (snapshot) => {
                if (snapshot.exists()) {
                    navigation.setOptions({
                        title: snapshot.data().username,
                    })

                    setUser({uid: route.params.uid, email: snapshot.data().email, name: snapshot.data().name});
                    console.log(user);
                }
                setLoading(false);
                
            });

            onSnapshot(q, (snapshot) => {
                let posts = snapshot.docs.map(doc => {
                    const data = doc.data();
                    const id = doc.id;
                    return { id, ...data }
                })
                setUserPosts(posts);
            });
        // }

        if (following.indexOf(route.params.uid) > -1) {
            setFollowingUser(true);
        } else {
            setFollowingUser(false);
        }
    }, [])


    return (
        <ScrollView style={[container.container, utils.backgroundWhite]}>
            <View style={[container.profileInfo]}>
                <View style={[container.row]}>

                    <FontAwesome5 
                        style={[utils.profileImageBig, utils.marginBottomSmall]}
                        name="user-circle" size={80} color="black"
                    />


                    {/* <View style={[container.container, container.horizontal, utils.justifyCenter ,utils.padding10Sides]}>
                        <View style={[utils.justifyCenter, container.containerImage]}>
                            <Text style={[text.bold, text.large, text.center]}>{userPosts.length}</Text>
                            <Text style={[text.center]}>Posts</Text>
                        </View>
                    </View> */}
                </View>

                <View>
                    {/* <Text style={[text.bold]}>{user.name}</Text> */}

                    {route.params.uid !== auth.currentUser?.uid
                        ? (
                            <View style={[container.horizontal]}>
                                {following
                                    ? (
                                        <TouchableOpacity
                                            style={[utils.buttonOutlined, container.container, utils.margin15Right]}
                                        >
                                            <Text style={[text.center, text.bold, text.green]}>Following</Text>
                                        </TouchableOpacity>
                                    )

                                    : (
                                        <TouchableOpacity
                                            style={[utils.buttonOutlined, container.container, utils.margin15Right]}
                                        >
                                            <Text style={[text.center, text.bold, {color: '#2196F3'}]}>Follow</Text>
                                        </TouchableOpacity>
                                    )
                                }

                                <TouchableOpacity
                                    style={[utils.buttonOutlined, container.container ]}
                                >
                                    <Text style={[text.center, text.bold ]}>Message</Text>
                                </TouchableOpacity>
                            </View>
                        )
                        :
                        <TouchableOpacity
                            style={[utils.buttonOutlined]}
                        >
                            <Text style={[text.center, text.bold ]}>Edit Profile</Text>
                        </TouchableOpacity>
                    }
                </View>
            </View>

            <View style={[utils.borderTopGray]}>
                <FlatList 
                    numColumns={3}
                    horizontal={false}
                    data={userPosts}
                    style={{}}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={[container.containerImage, utils.borderWhite]}
                        >
                            {item.type === 0 ?
                                <CachedImage
                                    cacheKey={item.id}
                                    sourse={{uri: item.downloadURLStill}}
                                />

                                :
                                <CachedImage
                                    cacheKey={item.id}
                                    sourse={{uri: item.downloadURLStill}}
                                />
                            }
                        </TouchableOpacity>
                    )}
                />
            </View>
        </ScrollView>
    );
};

export default Profile;