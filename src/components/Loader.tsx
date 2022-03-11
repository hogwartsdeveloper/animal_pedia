import { FC } from "react";
import { StyleSheet, View } from "react-native";


const Loader: FC = () => {
    return (
        <View style={styles.wrapper}>
            <View style={styles.bird}>
                <View style={styles.hairContainer}>
                    <View style={styles.hair}></View>
                </View>
                <View style={styles.face}>
                    <View style={styles.whiteContainer}>
                        <View style={styles.white}></View>
                    </View>
                    <View style={styles.shadowContainer}>
                        <View style={styles.shadow}></View>
                    </View>
                    <View style={styles.bigBeakContainer}>
                        <View style={styles.bigBeak}></View>
                    </View>
                    <View style={styles.smallContainer}>
                        <View style={styles.smallBeak}></View>
                    </View>
                    <View style={styles.eye}></View>
                </View>
            </View>
        </View>
    );
};

export default Loader;

const styles = StyleSheet.create({
    wrapper: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    bird: {
        position: 'relative',
        width: 150,
        height: 150
    },
    hairContainer: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
    },
    hair: {
        position: 'absolute',
        width: '50%',
        height: '100%',
        top: 0,
        left: '50%',
        backgroundColor: '#A12A15',
        borderTopLeftRadius: 0,
        borderTopRightRadius: 125,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 125,
    },
    face: {
        position: 'absolute',
        width: '70%',
        height: '70%',
        top: '50%',
        left: '50%',
        transform: [
            {translateX: -50},
            {translateY: -50},
        ],
        zIndex: 1
    },
    whiteContainer: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        zIndex: 1
    },
    white: {
        position: 'absolute',
        width: '50%',
        height: '100%',
        top: 0,
        left: '50%',
        borderTopLeftRadius: 0,
        borderTopRightRadius: 87.5,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 87.5,
        backgroundColor: 'white'
    },
    shadowContainer: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        zIndex: 2
    },
    shadow: {
        position: 'absolute',
        width: '50%',
        height: '50%',
        top: '50%',
        left: '50%',
        backgroundColor: 'rgba(0, 0, 0, 0.15)',
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 87.5
    },
    bigBeakContainer: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        zIndex: 3
    },
    bigBeak: {
        position: 'absolute',
        width: '50%',
        height: '50%',
        top: 0,
        left: 0,
        backgroundColor: '#f7ce42',
        borderTopLeftRadius: 87.5,
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        borderBottomLeftRadius: 0
    },
    smallContainer: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        zIndex: 0
    },
    smallBeak: {
        position: 'absolute',
        width: '25%',
        height: '25%',
        top: '50%',
        left: '25%',
        backgroundColor: '#f7a500',
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        borderBottomLeftRadius: 43.25,
        borderBottomRightRadius: 0,
    },
    eye: {
        position: 'absolute',
        width: '25%',
        height: '25%',
        bottom: '51%',
        left: '51%',
        backgroundColor: '#18233e',
        borderRadius: 50,
        zIndex: 2,
    }
})