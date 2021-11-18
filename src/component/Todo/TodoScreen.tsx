import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
const TodoScreen = ({ item, onPressEdit, onPressDelete }: any) => {
    return (
        <View style={styles.container}>
            <Text style={styles.textBtn}>{item.todo}</Text>
            <View style={styles.containerBtn}>
                <Pressable
                    onPress={() => onPressEdit(item)}
                    style={styles.btnEdit}
                >
                    <Text>Editar</Text>
                </Pressable>
                <Pressable
                    onPress={() => onPressDelete(item.id)}
                    style={styles.btnDelete}
                >
                    <Text>Eliminar</Text>
                </Pressable>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        borderBottomWidth: 1,
        borderBottomColor: "#999999",
        justifyContent: "space-between",
    },
    containerBtn: {
        flexDirection: "row",
    },
    btnEdit: {
        width: 70,
        height: 40,
        padding: 10,
        backgroundColor: "#3799de",
        marginRight: 8,
    },
    btnDelete: {
        width: 70,
        height: 40,
        padding: 10,
        backgroundColor: "#cc0000",
    },
    textBtn: {
        marginLeft: 8,
        fontSize: 14,
        color: "#444444",
    },
});

export default TodoScreen;
