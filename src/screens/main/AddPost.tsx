import { async } from "@firebase/util";
import { Camera } from "expo-camera";
import { CameraType } from "expo-camera/build/Camera.types";
import { FC, useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

const AddPost: FC = () => {
    const [hasPermission, setHasPermission] = useState<boolean | null>(null);
    const [type, setType] = useState<CameraType>(Camera.Constants.Type.back);

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, [])

    if (hasPermission === null) {
        return <View />;
    }

    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
       <View>
           <Camera type={type}>
               <View>
                   <TouchableOpacity>
                       <Text> Flip </Text>
                   </TouchableOpacity>
               </View>
           </Camera>
       </View>
    );
};

export default AddPost;