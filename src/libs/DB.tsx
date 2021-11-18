import React from "react";
import { Platform } from "react-native";
import * as SQLite from "expo-sqlite";
function openDatabase(nameBD: string) {
    if (Platform.OS === "web") {
        return {
            transaction: () => {
                return {
                    executeSql: () => {},
                };
            },
        };
    }
    const db = SQLite.openDatabase(nameBD);
    return db;
}

function transaction(db: any, query: string) {
    db.transaction((tx: any) => {
        tx.executeSql(query);
    });
}
export { openDatabase, transaction };
