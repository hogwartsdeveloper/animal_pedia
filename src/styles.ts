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
    margin5Bottom: {
        marginBottom: 5
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
    profileImageSmall: {
        marginRight: 15,
        width: 50,
        height: 50,
        borderRadius: 50 / 2
    },
    profileImage: {
        marginRight: 15,
        width: 50,
        height: 50,
        borderRadius: 50 / 2
    },
    padding10Sides: {
        paddingRight: 10,
        paddingLeft: 10
    },
    padding10Top: {
        paddingTop: 10
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
    },
    centerHorizonta: {
        alignItems: 'center'
    },
    searchBar: {
        backgroundColor: 'whitesmoke',
        color: 'grey',
        paddingLeft: 10,
        borderRadius: 8,
        height: 40,
        marginTop: -5
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
    imagePost: {
        aspectRatio: 2 / 1
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
    },
    form: {
        flex: 1,
        margin: 25
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
    small: {
        fontSize: 10
    },
    medium: {
        fontSize: 15,
        marginBottom: 10
    },
    large: {
        fontSize: 20
    },
    green: {
        color: 'green'
    },
    grey: {
        color: 'grey'
    },
    changePhoto: {
        marginTop: 5,
        color: 'deepskyblue'
    },
    notAvailable: {
        textAlign: 'center',
        fontWeight: '700',
        fontSize: 20
    },
    username: {
        fontWeight: '600',
        color: 'black'
    },
    name: {
        color: 'gray'
    }
});

const form = StyleSheet.create({
    textInput: {
        marginBottom: 10,
        borderColor: 'gray',
        backgroundColor: 'whitesmoke',
        padding: 10,
        borderRadius: 8,
    },
})

export { utils, container, text, navbar, form }