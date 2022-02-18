import { FC } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";


interface inputProps {
    placeholder: string;
    onChangeText: (text: string) => void;
    value: string;
    icon: boolean;
    iconName?: "email" | "lock" | "cat";
}

const Input: FC<inputProps> = ({ placeholder, onChangeText, value, icon, iconName }) => {
    return (
        <View style={styles.inputContainer}>
            {icon 
                ? 
                <View style={styles.iconContainer}>
                    <MaterialCommunityIcons name={iconName} size={24} color="black" />
                </View>
                : null
            }
            
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
    },
    iconContainer: {
        marginRight: 15
    }
})

export default Input;