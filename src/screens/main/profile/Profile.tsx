import { collection, doc, getFirestore, onSnapshot, orderBy, query } from "firebase/firestore";
import { FC, useEffect, useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";
import { app, auth } from "../../../../firebase";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { container, utils } from "../../../styles";
import { profileProps } from "../../../type";
import { FontAwesome5 } from "@expo/vector-icons";

const Profile: FC<profileProps> = ({ navigation, route}) => {
    const [ userPosts, setUserPosts] = useState<any[]>([]);
    const [ user, setUser] = useState<{} | null>(null);
    const [ loading, setLoading ] = useState(true);
    const [ followingUser, setFollowingUser ] = useState(false);
    const { currentUser, posts, following} = useTypedSelector(state => state.userState);

    useEffect(() => {
    
        if (route.params.uid === auth.currentUser?.uid) {
            setUser(currentUser);
            setUserPosts(posts);
            setLoading(false)
        } else {
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

                    setUser({ uid: route.params.uid, ...snapshot.data()});
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
        }

        if (following.indexOf(route.params.uid) > -1) {
            setFollowingUser(true);
        } else {
            setFollowingUser(false);
        }
    }, [route.params.uid, following, currentUser, posts])


    return (
        <ScrollView style={[container.container, utils.backgroundWhite]}>
            <View style={[container.profileInfo]}>
                <View style={[container.row]}>
                    {'default' === 'default'
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
                                    uri: ''
                                }}
                            />
                        )
                    }

                    <View style={[container.container, container.horizontal, utils.justifyCenter ,utils.padding10Sides]}>

                    </View>
                </View>
            </View>
        </ScrollView>
    );
};

export default Profile;