import { useRef, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import BottomSheet from 'react-native-bottomsheet-reanimated';
import { container, text, utils } from "../../../styles";
import { IPost, IUser } from "../../../type/user";
import { FontAwesome5, Feather } from "@expo/vector-icons";
import CachedImage from "../random/CachedImage";
import ParsedText from "react-native-parsed-text";
import { timeDifference } from "../../../utils";
import {Divider, Snackbar} from "react-native-paper";
import firebase from "firebase/compat";
import auth = firebase.auth;

function Post() {
    const [user, setUser] = useState<IUser | null>(null);
    const [item, setItem] = useState<IPost>({
        id: '',
        caption: '',
        creation: {
            nanoseconds: 0,
            seconds: 0
        },
        downloadURL: ''
    });

    const [sheetRef, setSheetRef] = useState(useRef(null));
    const [modalShow, setModalShow] = useState({ visible: false, item: null});
    const [isValid, setIsValid] = useState(true);

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
                    >
                        <Feather name="more-vertical" size={20} color="black" />
                    </TouchableOpacity>
                    
                    <CachedImage 
                        cacheKey={item.id}
                        styles={container.image}
                        sourse={item.downloadURL}
                    />
                    
                    <View style={[container.container, utils.padding10Sides]}>
                        <Text style={[utils.margin15Right, utils.margin5Bottom]}>
                            <Text style={[text.bold]}>
                                {user?.name}
                            </Text>
                            <ParsedText 
                                parse={
                                    [
                                        { pattern: /@(\w+)/, style: {color: 'green', fontWeight: 'bold' }}
                                    ]
                                }
                            >{item.caption}</ParsedText>
                        </Text>
                        <Text
                            style={[text.grey, utils.margin5Bottom]}
                        >
                            View all Comments
                        </Text>
                        <Text
                            style={[ text.grey, text.small, utils.margin5Bottom]}
                        >
                            {timeDifference(new Date(), item.creation)}
                        </Text>
                    </View>
                </View>

                <BottomSheet 
                    bottomSheerColor="#fff"
                    ref={setSheetRef}
                    initialPosition={0}
                    snapPoints={[300, 0]}
                    isBackDrop={true}
                    isBackDropDismissByPress={true}
                    isRoundBorderWithTipHeader={true}
                    backDropColor="back"
                    isModal
                    containerStyle={{ backgroundColor: 'white' }}
                    tipStyle={{ backgroundColor: 'white' }}
                    headerStyle={{ backgroundColor: 'white', flex: 1}}
                    bodyStyle={{ backgroundColor: 'white', flex: 1, borderRadius: 20}}
                    body={
                        <View>
                            {modalShow.item != null
                                ?
                                <View>
                                    <TouchableOpacity style={{ padding: 20}}>
                                        <Text>Profile</Text>
                                    </TouchableOpacity>
                                    <Divider />
                                    {user?.uid === ''
                                        ?
                                        <TouchableOpacity style={{padding: 20}}>
                                            <Text>Delete</Text>
                                        </TouchableOpacity>
                                        :
                                        null
                                    }
                                    <Divider />
                                    <TouchableOpacity style={{ padding: 20}}>
                                        <Text>Cancel</Text>
                                    </TouchableOpacity>
                                </View>
                                :
                                null
                            }
                        </View>
                    }
                />
                <Snackbar
                    visible={isValid}
                    duration={2000}
                    onDismiss={() => {setIsValid(false)}}
                >message</Snackbar>
            </View>
        </View>
    )
};

export default Post;
