import React, { FC, useState } from "react";
import { Button, Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { IPost } from "../../../type/user";
import { postProps } from "../../../type/screens";
import { container, text, utils } from "../../../styles";
import CachedImage from "../random/CachedImage";
import { AnimalsClass } from "../../../type/animals";

const Post: FC<postProps> = ({ navigation, route }) => {
    const [item, setItem] = useState<IPost>(route.params.item);

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
    console.log(item);
    

    return (
        <ScrollView style={[container.container, utils.backgroundWhite]}>
            <View>
                <CachedImage 
                    cacheKey={item.id}
                    styles={[container.imagePost]}
                    sourse={item.downloadURL}
                />
            </View>
            <View style={[styles.contentPost]}>
                <View>
                    <Text style={[styles.titlePost, text.bold]}>{item.caption}</Text>
                    {item.arHref ? <Button title="Посмотреть в AR" onPress={() => Linking.openURL(item.arHref)}/> : null}
                    <View>
                        <Text style={{color: '#6b6e6c'}}>Вид: {getClass(item.class)}</Text>
                    </View>
                </View>
                <View style={{paddingTop: 10}}>
                    <Text>{item.content}</Text>
                </View>
            </View>
        </ScrollView>
    )
};

export default Post;

const styles = StyleSheet.create({
    contentPost: {
        margin: 15
    },
    titlePost: {
        fontSize: 18,
        textAlign: 'center',
    }
})
