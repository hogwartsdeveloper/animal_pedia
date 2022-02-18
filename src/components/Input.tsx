import { FC } from "react";
import { StyleSheet, TextInput, View } from "react-native";


interface inputProps {
    placeholder: string;
    onChangeText: (text: string) => void;
    value: string;
}

const Input: FC<inputProps> = ({ placeholder, onChangeText, value }) => {
    return (
        <View style={styles.inputContainer}>
            <View>
                
            </View>
            <TextInput 
                placeholder={placeholder}
                onChangeText={onChangeText}
                value={value}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 2,
        paddingHorizontal: 20,
        borderColor: '#fbd52c',
        borderRadius: 5,
        paddingVertical: 10,
        marginBottom: 7
    }
})

export default Input;