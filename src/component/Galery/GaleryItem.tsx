import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
const GaleryItem = ({ categoria }: any) => {
    return (
        <View style={styles.container}>
            <Text style={styles.textCategoria}>{categoria.nombre}</Text>
            <Image style={styles.portada} source={{ uri: categoria.url }} />
        </View>
    );
};
const styles = StyleSheet.create({
    portada: {
        width: 100,
        height: 100,
        borderWidth: 2,
        borderColor: "#f07847",
        padding: 8,
        borderRadius: 8,
    },
    container: {
        textAlign: "center",
        marginBottom: 16,
        marginTop: 16,
        padding: 16,
    },
    textCategoria: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#f07847",
    },
});
export default GaleryItem;
