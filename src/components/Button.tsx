import { FC } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native"


interface buttonProps {
    name: string;
    onPress: () => void
}

const Button: FC<buttonProps> = ({ name, onPress }) => {
    return (
        <TouchableOpacity 
            style={styles.buttonContainer}
            onPress={onPress}
        >
            <Text style={styles.buttonText}>{name}</Text>
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
    }
})

export default Button;