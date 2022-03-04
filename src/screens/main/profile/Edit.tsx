import React, { useState } from "react"
import * as ImagePicker from 'expo-image-picker';
import { TouchableOpacity, View } from "react-native"
import { container, utils } from "../../../styles"

const Edit = () => {

    const [image, setImage] = useState<string>('');
    const [imageChanged, setImageChanged] = useState<boolean>(false)

    const imagePicker = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1
        });

        if (!result.cancelled) {
            setImage(result.uri);
            setImageChanged(true);
            
        }
    }

    return (
        <View style={container.form}>
            <TouchableOpacity style={[utils.centerHorizonta, utils.marginBottom]} onPress={imagePicker}>

            </TouchableOpacity>
        </View>
    )
}