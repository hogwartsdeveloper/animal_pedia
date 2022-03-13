import { FC, useEffect, useState } from "react"
import { FlatList, Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useActions } from "../../../hooks/useActions";
import { container, text, utils } from "../../../styles";
import { FontAwesome5 } from "@expo/vector-icons"
import { searchProps } from "../../../type";

import { queryUsersByUsername } from "../../../redux/actions/user";

const Search: FC<searchProps> = ({ navigation }) => {
    const [users, setUsers] = useState<any>([]);

    useEffect(() => {
        console.log(users);
        
    }, users)

    return (
        <View style={[utils.backgroundWhite, container.container]}>
            <View style={{ marginVertical: 30, paddingHorizontal: 20}}>
                <TextInput 
                    style={utils.searchBar}
                    placeholder="Type Here..."
                    onChangeText={(search) => queryUsersByUsername(search).then(setUsers)}
                />
            </View>

            <FlatList 
                numColumns={1}
                horizontal={false}
                data={users}
                renderItem={({item}) => (
                    <TouchableOpacity
                        style={[container.horizontal, utils.padding10Sides, utils.padding10Top]}
                        onPress={() => navigation.navigate('Profile', {uid: item.id})}
                    >
                        {item.image === 'default'
                            ? (
                                <FontAwesome5 
                                    style={[utils.profileImage, utils.marginBottomSmall]}
                                    name="user-circle" size={50} color="black"
                                />
                            )
                            :
                            (
                                <Image 
                                    style={[utils.profileImage, utils.marginBottomSmall]}
                                    source={{
                                        uri: item.image
                                    }}
                                />
                            )
                        }
                        <View style={utils.justifyCenter}>
                            <Text style={text.username}>{item.userName}</Text>
                            <Text style={text.name}>{item.name}</Text>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </View>
    )
};

export default Search;