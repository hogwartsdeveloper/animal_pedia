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
    },
    borderTopGray: {
        borderTopWidth: 1,
        borderColor: 'lightgrey'
    },
    borderWhite: {
        borderLeftWidth: 2,
        borderRightWidth: 2,
        borderTopWidth: 2,
        borderColor: 'white'
    }
});

const navbar = StyleSheet.create({
    image: {
        padding: 20
    }
})

const container = StyleSheet.create({
    container: {
        flex: 1
    },
    containerImage: {
        flex: 1 / 3
    },
    image: {
        aspectRatio: 1 / 1
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

export { utils, container, text, navbar }