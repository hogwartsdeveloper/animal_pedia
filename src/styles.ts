import { StyleSheet } from "react-native";
const utils = StyleSheet.create({
    margin15: {
        margin: 15
    },
    marginBottom: {
        marginBottom: 20
    },
    justifyCenter: {
        justifyContent: 'center'
    },
    alignItemsCenter: {
        alignItems: 'center'
    },
    backgroundWhite: {
        backgroundColor: '#fff'
    },
    padding15: {
        paddingTop: 15,
        paddingRight: 15,
        paddingLeft: 15
    }
});

const container = StyleSheet.create({
    container: {
        flex: 1
    }
});

const text = StyleSheet.create({
    bold: {
        fontWeight: '700'
    },
    large: {
        fontSize: 20
    }
})

export { utils, container, text }