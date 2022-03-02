import { StyleSheet } from "react-native";
const utils = StyleSheet.create({
    margin15: {
        margin: 15
    },
    margin15Right: {
        marginRight: 15
    },
    marginBottom: {
        marginBottom: 20
    },
    marginBottomSmall: {
        marginBottom: 10
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
    buttonOutlined: {
        padding: 8,
        color: 'white',
        borderWidth: 1,
        borderColor: 'lightgrey',
        borderRadius: 8,
        textAlign: 'center'
    },
    padding15: {
        paddingTop: 15,
        paddingRight: 15,
        paddingLeft: 15
    },
    profileImageBig: {
        width: 80,
        height: 80,
        borderRadius: 80 / 2,
    },
    padding10Sides: {
        paddingRight: 10,
        paddingLeft: 10
    },
    noPadding: {

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
    },
    profileInfo: {
        padding: 25,
        flexDirection: 'row'
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 'auto'
    },
    horizontal: {
        flexDirection: 'row',
        display: 'flex'
    }
});

const text = StyleSheet.create({
    center: {
        textAlign: 'center'
    },
    profileDescription: {
        fontWeight: '300'
    },
    bold: {
        fontWeight: '700'
    },
    large: {
        fontSize: 20
    },
    green: {
        color: 'green'
    }
})

export { utils, container, text, navbar }