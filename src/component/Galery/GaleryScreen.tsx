import React, { Component } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";

import HTTP from "../../libs/HTTP";
import { openDatabase, transaction } from "../../libs/DB";

import GaleryItem from "./GaleryItem";

const API = "http://157.245.138.20:1337/categorias";
//1. Conexion con la base de datos
const db = openDatabase("dbGal.db");

const GaleryScreen = () => {
    const [categorias, setCategorias] = React.useState([]);

    const crearBdCategoria = () => {
        //2. Crear tabla
        const query =
            "create table if not exists categorias (id integer primary key not null, idCategoria integer, nombre text, url text, updateAt text);";
        //const queryDelete = "delete from categorias";
        try {
            transaction(db, query);
            //transaction(db, queryDelete);
        } catch (error) {
            console.log(error);
        }
    };

    const selectCategoriaLength = () => {
        db.transaction((tx: any) => {
            tx.executeSql(
                "select * from categorias;",
                [],
                (_: any, result: any) => {
                    if (parseInt(result.rows.length) > 0) {
                        console.log("no descargar img");
                        selectCategoria();
                    } else {
                        console.log("descargar img");
                        getCategory();
                    }
                }
            );
        });
    };

    const selectCategoria = async () => {
        try {
            db.transaction((tx: any) => {
                tx.executeSql(
                    "select * from categorias;",
                    [],
                    (_: any, result: any) => {
                        setCategorias(result.rows._array);
                    }
                );
            });
        } catch (error) {
            console.log(error);
        }
    };

    const getCategory = async () => {
        try {
            //3. Traer info de la API
            const response = await HTTP.instance.getCategoria(API);
            response.map((item: any) => {
                //2. Descargar la portada automaticamente
                downloadFile(
                    item.id,
                    `http://157.245.138.20:1337${item.portada.url}`,
                    item.nombre + "",
                    item.portada.ext + "",
                    item.updated_at
                );
            });
        } catch (error) {
            console.log(`getCategorias Error: ${error}`);
        }
    };

    const downloadFile = async (
        id: number,
        url: string,
        name: string,
        ext: string,
        updated_at: string
    ) => {
        try {
            let fileUrl = FileSystem.documentDirectory + name + ext;
            const { uri }: any = await FileSystem.downloadAsync(url, fileUrl);
            const urlImage = await FileSystem.getContentUriAsync(uri);
            saveFile(uri);
            const query = `insert into categorias (idCategoria, nombre, url, updateAt) values ('${id}','${name}','${urlImage}', '${updated_at}');`;
            transaction(db, query);
            selectCategoria();
        } catch (error) {
            console.log(error);
        }
    };

    const saveFile = async (fileUri: any) => {
        const { status } = await MediaLibrary.requestPermissionsAsync();
        if (status === "granted") {
            const asset = await MediaLibrary.createAssetAsync(fileUri);
            await MediaLibrary.createAlbumAsync(
                "MyAppNativeLite",
                asset,
                false
            );
        }
    };

    React.useEffect(() => {
        crearBdCategoria();
        selectCategoriaLength();
    }, []);

    return (
        <View>
            <FlatList
                style={styles.listContainer}
                data={categorias}
                renderItem={({ item }) => <GaleryItem categoria={item} />}
            />
        </View>
    );
};
const styles = StyleSheet.create({
    listContainer: {
        backgroundColor: "#bfd4d8",
        flexDirection: "row",
    },
});

export default GaleryScreen;
