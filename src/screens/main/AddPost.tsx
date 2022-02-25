import { Camera } from "expo-camera";
import { CameraType } from "expo-camera/build/Camera.types";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import { FC, useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const AddPost: FC = () => {
    const [hasPermission, setHasPermission] = useState<boolean | null>(null);
    const [type, setType] = useState<CameraType>(Camera.Constants.Type.back);
    const [galleryItems, setGallertItems] = useState<MediaLibrary.PagedInfo<MediaLibrary.Asset>>();
    const [galleryPickedImage, setGalleryPickedImage] = useState(null);

    useEffect(() => {
        (async () => {
            const cameraPermissions = await Camera.requestCameraPermissionsAsync();
            const galleryPermissions = await Camera.requestCameraPermissionsAsync();

            if (cameraPermissions.status === 'granted' && galleryPermissions.status === 'granted') {
                const getPhotos = await MediaLibrary.getAssetsAsync(
                    { sortBy: [MediaLibrary.SortBy.creationTime], mediaType: [MediaLibrary.MediaType.photo] }
                );
                setGallertItems(getPhotos)
            }
        })();
    }, [])

    if (hasPermission === null) {
        return <View />;
    }

    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
       <View style={styles.container}>
           <Camera style={styles.camera} type={type}>
               <View style={styles.buttonContainer}>
                   <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                            setType(
                                type === Camera.Constants.Type.back
                                    ? Camera.Constants.Type.front
                                    : Camera.Constants.Type.back
                            )
                        }}
                   >
                       <Text style={styles.text}> Flip </Text>
                   </TouchableOpacity>
               </View>
           </Camera>
       </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    camera: {
        flex: 1
    },
    buttonContainer: {
        flex: 1,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        margin: 20
    },
    button: {
        flex: 0.1,
        alignSelf: 'flex-end',
        alignItems: 'center'
    },
    text: {
        fontSize: 18,
        color: 'white'
    }
})

export default AddPost;