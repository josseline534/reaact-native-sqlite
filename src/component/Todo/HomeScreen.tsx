import React from "react";
import {
    View,
    FlatList,
    Text,
    Platform,
    TextInput,
    StyleSheet,
    Button,
} from "react-native";

import { openDatabase, transaction } from "../../libs/DB";

import TodoScreen from "./TodoScreen";

const db = openDatabase("dbPrueba.db");

const HomeScreen = (props: any) => {
    const [newTodo, setNewTodo] = React.useState("");
    const [allTodos, setAllTodos] = React.useState([
        {
            id: "",
            todo: "",
        },
    ]);

    React.useEffect(() => {
        const query =
            "create table if not exists todos (id integer primary key not null, todo text);";
        try {
            transaction(db, query);
            selectDb();
        } catch (error) {
            console.log(error);
        }
    }, [allTodos]);

    const selectDb = () => {
        db.transaction((tx: any) => {
            tx.executeSql("select * from todos", [], (tx: any, result: any) => {
                var temp = [];
                const tempObj = {
                    id: "",
                    todo: "",
                };
                for (let i = 0; i < result.rows.length; ++i) {
                    tempObj.id = result.rows.item(i).id + "";
                    tempObj.todo = result.rows.item(i).todo;
                    temp[i] = {
                        id: tempObj.id,
                        todo: tempObj.todo,
                    };
                }
                setAllTodos(temp);
            });
        });
    };
    const handlerUpdate = (todo: any) => {
        props.navigation.navigate("Edit", { todo });
    };

    const handlerDelete = (id: string) => {
        const query = `delete from todos where id = ${parseInt(id)};`;
        transaction(db, query);
    };

    const addTodo = () => {
        const queryInsert = `insert into todos (todo) values ('${newTodo}')`;
        transaction(db, queryInsert);
    };
    const handlerChange = (event: any) => {
        setNewTodo(event);
    };
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.textInput}
                placeholder='Todo'
                value={newTodo}
                onChangeText={handlerChange}
            />
            <Button title='Añadir' onPress={addTodo} />
            <View style={styles.listTodo}>
                <FlatList
                    data={allTodos}
                    renderItem={({ item }) => (
                        <TodoScreen
                            item={item}
                            onPressEdit={handlerUpdate}
                            onPressDelete={handlerDelete}
                        />
                    )}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
        paddingRight: 20,
        paddingLeft: 20,
    },
    textInput: {
        padding: 8,
        fontSize: 14,
        borderColor: "grey",
        borderRadius: 8,
        borderWidth: 1,
        margin: 8,
        backgroundColor: "white",
    },
    listTodo: {
        marginTop: 20,
    },
});

export default HomeScreen;
