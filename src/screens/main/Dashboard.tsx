import { deleteDoc, doc, getFirestore, updateDoc } from "firebase/firestore";
import { FC, useEffect, useState } from "react";
import { Button, FlatList, TouchableOpacity, View } from "react-native";
import { app } from "../../../firebase";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { container, utils } from "../../styles";
import { dashboardProps } from "../../type";
import CachedImage from "./random/CachedImage";

const Dashboard: FC<dashboardProps> = ({ navigation }) => {
    const [usersPosts, setUsersPosts] = useState<any[]>([])
    const { posts } = useTypedSelector(state => state.userState);

    useEffect(() => {
        setUsersPosts(posts.filter(post => post.approved === false));
    }, [posts])

    const onApprove = (id: string) => {
        const db = getFirestore(app);
        const postRef = doc(db, 'posts', id)
        updateDoc(postRef, {
            approved: true
        })
    };

    const onReject = (id: string) => {
        const db = getFirestore(app);
        const postRef = doc(db, 'posts', id);
        deleteDoc(postRef)
    }

    return (
        <View style={[container.container, utils.backgroundWhite]}>
            <FlatList 
                numColumns={1}
                horizontal={false}
                data={usersPosts}
                keyExtractor={(index) => index.toString()}
                renderItem={({ item}) => (
                    <View style={[container.container]}>
                        <View>
                        <TouchableOpacity
                            style={[container.containerImage, utils.borderWhite]}
                            onPress={() => navigation.navigate('Post', {item})}
                        >
                            <CachedImage sourse={item.downloadURL} cacheKey={item.id} styles={container.imagePost} />
                        </TouchableOpacity>
                        </View>

                        <View style={{flexDirection: 'row',justifyContent: 'space-around'}}>
                            <Button title="Утвердить" onPress={() => onApprove(item.id)} />
                            <Button title="Удалить" onPress={() => onReject(item.id)} />
                        </View>
                    </View>
                )}
            />
        </View>
    )
}

export default Dashboard;