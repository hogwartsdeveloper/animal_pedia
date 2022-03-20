import { useIsFocused } from "@react-navigation/native";
import { Camera } from "expo-camera";
import { CameraType } from "expo-camera/build/Camera.types";
import * as MediaLibrary from "expo-media-library";
import { FC, LegacyRef, useEffect, useRef, useState } from "react";
import { Dimensions, FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View, ViewProps } from "react-native";
import { Feather } from "@expo/vector-icons";
import { container, utils } from "../../../styles";
import { addPostProps } from "../../../type/screens";

const WINDOW_HEIGHT = Dimensions.get("window").height;
const WINDOW_WIDTH = Dimensions.get("window").width;
const captureSize = Math.floor(WINDOW_HEIGHT * 0.09);

const Photographic: FC<addPostProps> = ({ navigation }) => {
    const [hasPermission, setHasPermission] = useState<boolean | null>(null);
    const [cameraType, setCameraType] = useState<CameraType>(Camera.Constants.Type.back);
    const [isPreview, setIsPreview] = useState(false);
    const [isCameraReady, setIsCameraReady] = useState(false);
    const [isFlash, setIsFlash] = useState(false);
    // const [type, setType] = useState(0);
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
            const loadedAsset = await MediaLibrary.getAssetInfoAsync(galleryPickedImage);

            navigation.navigate('Save', {
                imageSource: loadedAsset.localUri
            })
        }

    }

    const takePicture = async () => {
        if (cameraRef.current) {
            const options = { quality: 0.5, base64: true, skipProcessing: true };
            const data = await cameraRef.current.takePictureAsync(options);
            const source = data.uri;
            if (source) {
                navigation.navigate('Save', {imageSource: source})
            }
        }
    }

    const renderCaptureControl = () => {
        return (
        <View>
            <View style={styles.renderCaptureControl}>
                <TouchableOpacity disabled={!isCameraReady} onPress={() => setIsFlash(!isFlash)}>
                    <Feather style={utils.margin15} name="zap" size={25} color="black" />
                </TouchableOpacity>
                <TouchableOpacity disabled={!isCameraReady} onPress={switchCamera}>
                    <Feather style={utils.margin15} name="rotate-cw" size={25} color="black" />
                </TouchableOpacity>

                    <TouchableOpacity 
                        activeOpacity={0.7}
                        disabled={!isCameraReady}
                        onPress={takePicture}
                        style={styles.capturePicture}
                    />

                <TouchableOpacity
                    disabled={!isCameraReady}
                >
                    <Feather style={utils.margin15} name='camera' size={25} color="black" />
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

    const showGalleryHeader = () => {
        return (
            <>
                <View style={{ aspectRatio: 1 / 1, height: WINDOW_WIDTH}}>
                        <Image 
                            style={{ flex: 1, aspectRatio: 1 / 1, height: WINDOW_WIDTH}}
                            source={{ uri: galleryPickedImage?.uri}}
                        />
                    </View>
                <View style={{ justifyContent: 'flex-end', alignItems: 'center', marginRight: 20, marginVertical: 10, flexDirection: 'row' }}>
                    <TouchableOpacity
                        style={{ alignItems: 'center', backgroundColor: '#ffdb3e', paddingHorizontal: 20, paddingVertical: 10, 
                                    marginRight: 15, borderRadius: 50, borderWidth: 1, borderColor: '#ffdb3e' 
                                }}
                        onPress={() => handleGoToSaveOnGalleryPick()}
                    >
                        <Text style={{ fontWeight: 'bold', color: 'white', paddingBottom: 1}}>Continue</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{ alignItems: 'center', backgroundColor: '#ffdb3e', borderRadius: 50, borderWidth: 1, borderColor: '#ffdb3e'}}
                        onPress={() => setShowGallery(false)}
                    >
                        <Feather style={{ padding: 10 }} name={"camera"} size={20} color="white" />
                    </TouchableOpacity>
                </View>
            </>
        )
    }

    if (showGallery) {
        return (
            <FlatList 
                ListHeaderComponent={showGalleryHeader}
                style={[container.container, utils.backgroundWhite]}
                data={[1]}
                renderItem={({ item }) => (
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
                )}
                keyExtractor={(item, index) => index.toString()}
            />
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

export default Photographic;
