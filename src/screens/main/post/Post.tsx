import { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { container, text, utils } from "../../../styles";
import { IPost, IUser } from "../../../type/user";
import { FontAwesome5, Feather } from "@expo/vector-icons";

function Post() {
    const [user, setUser] = useState<IUser | null>(null);
    return (
        <View style={[container.container, utils.backgroundWhite]}>
            <View>
                <View style={[container.horizontal, { alignItems: 'center', padding: 10}]}>
                    <TouchableOpacity
                        style={[container.horizontal, {alignItems: 'center'}]}
                    >
                        {user?.image === 'default'
                            ?
                            (
                                <FontAwesome5 
                                    style={[utils.profileImageSmall]}
                                    name="user-circle" size={35} color="black"
                                />
                            )
                            :
                            (
                                <Image style={[utils.profileImageSmall]} 
                                    source={{
                                        uri: user?.image
                                    }}
                                />
                            )
                        }
                        <View style={{ alignSelf: 'center'}}>
                            <Text style={[ text.medium, { marginBottom: 0 }]}>{ user?.name }</Text>    
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={[{ marginLeft: 'auto' }]}

                        onPress={() => {

                        }}
                    />
                    <Feather name="more-vertical" size={20} color="black" />
                </View>
            </View>
        </View>
    )
}