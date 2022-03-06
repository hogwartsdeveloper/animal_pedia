import { FC, useEffect, useRef, useState } from "react"
import { Image } from "react-native";
import * as FileSystem from "expo-file-system";

interface ICachedImage {
    sourse: string,
    cacheKey: string
}

const CachedImage: FC<ICachedImage> = ({sourse, cacheKey}) => {

    const fileSystemURI = `${FileSystem.cacheDirectory}${cacheKey}`

    const [imgURL, setImgURI] = useState<string>(fileSystemURI);
    const componentIsMounted = useRef(true);

    useEffect(() => {
        loadImage(fileSystemURI);

        return () => {
            componentIsMounted.current = false
        }
    }, [])

    const loadImage = async (fileURI: string) => {
        try {
            const metadata = await FileSystem.getInfoAsync(fileURI);
            if(!metadata.exists) {
                if (componentIsMounted.current) {
                    await FileSystem.downloadAsync(sourse, fileURI)
                    setImgURI(fileURI)
                }
            }
        } catch (err) {
            setImgURI(sourse)
        }
    }

    return (
        <Image
            source={imgURL ? {uri: imgURL} : {uri: ''}}
        />
    );
};

export default CachedImage;