import { useIsFocused } from "@react-navigation/native";
import { Camera } from "expo-camera";
import { CameraType } from "expo-camera/build/Camera.types";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import * as VideoThumbnails from "expo-video-thumbnails";
import { FC, LegacyRef, useEffect, useRef, useState } from "react";
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { utils } from "../../styles";

const WINDOW_HEIGHT = Dimensions.get("window").height;
const WINDOW_WIDTH = Dimensions.get("window").width;

const AddPost: FC = () => {
    const [hasPermission, setHasPermission] = useState<boolean | null>(null);
    const [cameraType, setCameraType] = useState<CameraType>(Camera.Constants.Type.back);
    const [isPreview, setIsPreview] = useState(false);
    const [isCameraReady, setIsCameraReady] = useState(false);
    const [isFlash, setIsFlash] = useState(false);
    const [isVideoRecording, setIsVideoRecording] = useState(false);
    const [type, setType] = useState(0);
    const [galleryItems, setGallertItems] = useState<MediaLibrary.PagedInfo<MediaLibrary.Asset>>();
    const [galleryPickedImage, setGalleryPickedImage] = useState<MediaLibrary.Asset>();
    const cameraRef: LegacyRef<Camera> | undefined = useRef(null);
    const isFocused = useIsFocused();

    useEffect(() => {
        (async () => {
            const cameraPermissions = await Camera.requestCameraPermissionsAsync();
            const galleryPermissions = await Camera.requestCameraPermissionsAsync();

            if (cameraPermissions.status === 'granted' && galleryPermissions.status === 'granted') {
                const getPhotos = await MediaLibrary.getAssetsAsync(
                    { sortBy: [MediaLibrary.SortBy.creationTime], mediaType: [MediaLibrary.MediaType.photo] }
                );
                setGallertItems(getPhotos);
                setGalleryPickedImage(getPhotos.assets[0]);
                setHasPermission(true)
            }
        })();
    }, []);
    const onCameraReady = () => {
        setIsCameraReady(true);
    };

    const switchCamera = () => {
        if (isPreview) {
            return;
        }
        setCameraType((prevCameraType) => 
            prevCameraType === Camera.Constants.Type.back
                ? Camera.Constants.Type.front
                : Camera.Constants.Type.back
        );
    };

    const recordVideo = async () => {
        if (cameraRef.current) {
            try {

                const options = { maxDuration: 60, quality: Camera.Constants.VideoQuality['480p']}

                const videoRecordPromise = cameraRef.current.recordAsync(options);
                if (videoRecordPromise) {
                    setIsVideoRecording(true);
                    const data = await videoRecordPromise;
                    const sourse = data.uri;
                    let imageSource = await generateThumbnail(sourse)
                }
            } catch (error) {
                console.warn(error);
            }
        }
    }

    const generateThumbnail = async (source: string) => {
        try {
            const { uri } = await VideoThumbnails.getThumbnailAsync(
                source,
                {time: 500}
            );
            return uri;
        } catch (e) {
            console.warn(e);
        }
    };

    const renderCaptureControl = () => {
        <View>
            <View style={styles.renderCaptureControl}>
                <TouchableOpacity disabled={!isCameraReady} onPress={() => setIsFlash(!isFlash)}>
                    <Feather style={utils.margin15} name="zap" size={25} color="black" />
                </TouchableOpacity>
                <TouchableOpacity disabled={!isCameraReady} onPress={switchCamera}>
                    <Feather style={utils.margin15} name="rotate-cw" size={25} color="back" />
                </TouchableOpacity>
                {type === 0
                    ?
                    <TouchableOpacity
                        activeOpacity={0.7}
                        disabled={!isCameraReady}
                    >

                    </TouchableOpacity>
                    :
                    null
                }
            </View>
        </View>
    }

    return (
        <View style={styles.container}>
            <View style={styles.cameraContainer}>
                {isFocused
                    ?
                    <Camera
                        ref={cameraRef}
                        style={styles.camera}
                        type={cameraType}
                        flashMode={isFlash ? Camera.Constants.FlashMode.torch : Camera.Constants.FlashMode.off}
                        ratio={"1:1"}
                        onCameraReady={onCameraReady}
                    />
                    :
                    null}
            </View>

            <View style={styles.renderCaptureControlContainer}>
                <View>

                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fff'
    },
    cameraContainer: {
        aspectRatio: 1 / 1,
        height: WINDOW_WIDTH
    },
    camera: {
        flex: 1,
        aspectRatio: 1 / 1, height: WINDOW_HEIGHT
    },
    renderCaptureControlContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    renderCaptureControl: {
        justifyContent: 'space-evenly',
        width: '100%',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: 'white'
    }
})

export default AddPost
