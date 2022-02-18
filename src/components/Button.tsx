import { FC } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native"


interface buttonProps {
    name: string;
    onPress: () => void;
    container: boolean;
}

const Button: FC<buttonProps> = ({ name, onPress, container }) => {
    return (
        <TouchableOpacity 
            style={container ? styles.buttonContainer: null}
            onPress={onPress}
        >
            <Text style={[styles.buttonText, !container ? styles.buttonBlack : null]}>{name}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        backgroundColor: '#000',
        paddingHorizontal: 40,
        paddingVertical: 15,
        marginBottom: 20,
        borderRadius: 5
    },
    buttonText: {
        textAlign: 'center',
        fontWeight: '600',
        color: '#ffdb3e'
    },
    buttonBlack: {
        color: '#111'
    }
})

export default Button;