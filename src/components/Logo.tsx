import { useFonts, ArchitectsDaughter_400Regular } from "@expo-google-fonts/architects-daughter";
import { FC } from "react";
import { StyleSheet, Text, View } from "react-native";

interface LogoProps {
    name: string
}

const Logo: FC<LogoProps> = ({name}) => {
    const [fontsLoaded] = useFonts({
        ArchitectsDaughter_400Regular
    });

    if(!fontsLoaded) {
        return (
            <View>
                <Text>Loading</Text>
            </View>
        )
    }

    return (
        <Text style={styles.logo}>{name}</Text>
    );
};

const styles = StyleSheet.create({
    logo: {
        fontFamily: 'ArchitectsDaughter_400Regular',
        fontSize: 50,
        marginBottom: 30
    }
})

export default Logo;