import { collection, doc, getFirestore, onSnapshot, orderBy, query } from "firebase/firestore";
import { FC, useEffect, useState } from "react";
import { FlatList, Image, ScrollView, Text, TouchableOpacity, View, Button, StyleSheet} from "react-native";
import { app, auth } from "../../../../firebase";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { container, text, utils } from "../../../styles";
import { profileProps } from "../../../type";
import { FontAwesome5, AntDesign } from "@expo/vector-icons";
import CachedImage from "../random/CachedImage";
import { IPost } from "../../../type/user";
import { Item } from "react-native-paper/lib/typescript/components/List/List";
import { useActions } from "../../../hooks/useActions";


type IUser = {
    email: string;
    name: string;
    uid: string;
}

const Profile: FC<profileProps> = ({ navigation, route}) => {
   
    const [user, setUser] = useState<IUser | null>(null);
    const [post, setPost] = useState<IPost[]>([]);
    const { currentUser, posts } = useTypedSelector(state => state.userState);
    const { fetchUserPosts} = useActions();
    const [image, setImage] = useState<string>('');

    useEffect(() => {
        setUser(currentUser);
        
        posts.map((i) => {
            console.log(i.downloadURL);
            setImage(i.downloadURL)
        })
        

    }, [])

    const logout = () => {
        auth.signOut()
    }

    return (
        
        <ScrollView style={[container.container, utils.backgroundWhite]}>
            <View style={[container.profileInfo]}>
                <View style={[container.row]}>

                    <FontAwesome5 
                        style={[utils.profileImageBig, utils.marginBottomSmall]}
                        name="user-circle" size={80} color="black"
                    />
                </View>

                <View>
                    <Text style={[text.bold, styles.name]}>{user?.name}</Text>
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
            <View style={utils.borderTopGray}>
                <FlatList 
                    numColumns={3}
                    horizontal={false}
                    data={posts}
                    renderItem={({ item })=>(
                        <TouchableOpacity style={[container.containerImage, utils.borderWhite]}>
                            <CachedImage sourse={item.downloadURL} cacheKey={item.id} styles={container.image}/>
                        </TouchableOpacity>
                        
                    
                    )}
                />
                
            </View>
            

            
        </ScrollView>
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