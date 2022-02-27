import { useIsFocused } from "@react-navigation/native";
import { Camera } from "expo-camera";
import { CameraType } from "expo-camera/build/Camera.types";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import * as VideoThumbnails from "expo-video-thumbnails";
import { FC, LegacyRef, ReactChild, ReactNode, useEffect, useRef, useState } from "react";
import { Dimensions, FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View, ViewProps } from "react-native";
import { Feather } from "@expo/vector-icons";
import { container, utils } from "../../../styles";
import { addPostProps } from "../../../type";

const WINDOW_HEIGHT = Dimensions.get("window").height;
const WINDOW_WIDTH = Dimensions.get("window").width;
const captureSize = Math.floor(WINDOW_HEIGHT * 0.09);

const AddPost: FC<addPostProps> = ({ navigation }) => {
    const [hasPermission, setHasPermission] = useState<boolean | null>(null);
    const [cameraType, setCameraType] = useState<CameraType>(Camera.Constants.Type.back);
    const [isPreview, setIsPreview] = useState(false);
    const [isCameraReady, setIsCameraReady] = useState(false);
    const [isFlash, setIsFlash] = useState(false);
    const [isVideoRecording, setIsVideoRecording] = useState(false);
    const [type, setType] = useState(0);
    const [showGallery, setShowGallery] = useState(true);
    const [galleryItems, setGallertItems] = useState<MediaLibrary.PagedInfo<MediaLibrary.Asset>>();
    const [galleryScrollRef, setGalleryScrollRef] = useState<ScrollView | null>(null);
    const [galleryPickedImage, setGalleryPickedImage] = useState<MediaLibrary.Asset | null>(null);
    const cameraRef: LegacyRef<Camera> | undefined = useRef(null);
    const isFocused = useIsFocused();

    useEffect(() => {
        (async () => {
            const cameraPermissions = await Camera.requestCameraPermissionsAsync();
            const galleryPermissions = await MediaLibrary.requestPermissionsAsync();

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

    const handleGoToSaveOnGalleryPick = async () => {
        if(galleryPickedImage) {
            let type = galleryPickedImage.mediaType === 'video' ? 0 : 1;

            const loadedAsset = await MediaLibrary.getAssetInfoAsync(galleryPickedImage);
            let imageSource = null;
            if (type === 0) {
                imageSource = await generateThumbnail(galleryPickedImage.uri)
            }

            navigation.navigate('Save', {
                source: loadedAsset.localUri,
                type,
                imageSource
            })
        }

    }

    const takePicture = async () => {
        if (cameraRef.current) {
            const options = { quality: 0.5, base64: true, skipProcessing: true };
            const data = await cameraRef.current.takePictureAsync(options);
            const source = data.uri;
            if (source) {
                navigation.navigate('Save', {source, imageSource: null, type})
            }
        }
    }

    const recordVideo = async () => {
        if (cameraRef.current) {
            try {

                const options = { maxDuration: 60, quality: Camera.Constants.VideoQuality['480p']}

                const videoRecordPromise = cameraRef.current.recordAsync(options);
                if (videoRecordPromise) {
                    setIsVideoRecording(true);
                    const data = await videoRecordPromise;
                    const source = data.uri;
                    let imageSource = await generateThumbnail(source)
                    navigation.navigate('Save', { source, imageSource, type})
                }
            } catch (error) {
                console.warn(error);
            }
        }
    };

    const stopVideoRecording = async () => {
        if (cameraRef.current) {
            setIsVideoRecording(false);
            cameraRef.current.stopRecording();
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
        return (
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
                        onLongPress={recordVideo}
                        onPressOut={stopVideoRecording}
                        style={styles.capture}
                    />
                    :
                    <TouchableOpacity 
                        activeOpacity={0.7}
                        disabled={!isCameraReady}
                        onPress={takePicture}
                        style={styles.capturePicture}
                    />
                }

                <TouchableOpacity
                    disabled={!isCameraReady} onPress={() => type === 1 ? setType(0) : setType(1)}
                >
                    <Feather style={utils.margin15} name={type === 0 ? 'camera' : 'video'} size={25} color="black" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setShowGallery(true)}>
                    <Feather style={utils.margin15} name={'image'} size={25} color="black" />
                </TouchableOpacity>
            </View>
        </View>
        )
    };
    if (hasPermission === null) {
        return <View />;
    }

    if (hasPermission === false) {
        return <Text style={styles.text}>No access to camera</Text>
    }

    if (showGallery) {
        return (
            <ScrollView
                ref={(ref) => setGalleryScrollRef(ref)}
                style={[container.container, utils.backgroundWhite]}
            >
                <View style={{ aspectRatio: 1 / 1, height: WINDOW_WIDTH}}>
                    <Image 
                        style={{ flex: 1, aspectRatio: 1 / 1, height: WINDOW_WIDTH}}
                        source={{ uri: galleryPickedImage?.uri}}
                    />
                </View>
                <View style={{ justifyContent: 'flex-end', alignItems: 'center', marginRight: 20, marginVertical: 10, flexDirection: 'row' }}>
                    <TouchableOpacity
                        style={{ alignItems: 'center', backgroundColor: 'gray', paddingHorizontal: 20, paddingVertical: 10, 
                                    marginRight: 15, borderRadius: 50, borderWidth: 1, borderColor: 'black' 
                                }}
                        onPress={() => handleGoToSaveOnGalleryPick()}
                    >
                        <Text style={{ fontWeight: 'bold', color: 'white', paddingBottom: 1}}>Continue</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{ alignItems: 'center', backgroundColor: 'gray', borderRadius: 50, borderWidth: 1, borderColor: 'black'}}
                        onPress={() => setShowGallery(false)}
                    >
                        <Feather style={{ padding: 10 }} name={"camera"} size={20} color="white" />
                    </TouchableOpacity>
                </View>
                <View style={[{ flex: 1}, utils.borderTopGray]}>
                    <FlatList 
                        numColumns={3}
                        horizontal={false}
                        data={galleryItems?.assets}
                        contentContainerStyle={{
                            flexGrow: 1
                        }}
                        renderItem={({ item}) => (
                            <TouchableOpacity
                                style={[container.containerImage, utils.borderWhite]}
                                onPress={() => { galleryScrollRef?.scrollTo({ x: 0, y: 0, animated: true}); setGalleryPickedImage(item); }}
                            >
                                <Image 
                                    style={container.image}
                                    source={{ uri: item.uri }}
                                />
                            </TouchableOpacity>
                        )}
                    />
                </View>
            </ScrollView>
        )
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
                    {renderCaptureControl()}
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
    capture: {
        backgroundColor: "red",
        height: captureSize,
        width: captureSize,
        borderRadius: Math.floor(captureSize / 2),
        marginHorizontal: 31
    },
    capturePicture: {
        borderWidth: 6,
        borderColor: 'gray',
        backgroundColor: 'white',
        height: captureSize,
        width: captureSize,
        borderRadius: Math.floor(captureSize / 2),
        marginHorizontal: 31
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
    },
    text: {
        color: "#000"
    }
})

export default AddPost
