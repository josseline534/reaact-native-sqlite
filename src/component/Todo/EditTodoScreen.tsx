import React from "react";
import { View, TextInput, StyleSheet, Button, Platform } from "react-native";

import { openDatabase, transaction } from "../../libs/DB";

const db = openDatabase("dbTodos.db");

const EditTodoScreen = (props: any) => {
    const [todo, setTodo] = React.useState(props.route.params.todo);
    const [editTodo, setEditTodo] = React.useState(
        props.route.params.todo.todo
    );

    const updateTodo = (todo: any, editTodo: string) => {
        const query = `update todos set todo = '${editTodo}' where id = ${parseInt(
            todo.id
        )};`;
        transaction(db, query);
        props.navigation.navigate("Home");
    };
    const handlerChange = (event: any) => {
        setEditTodo(event);
    };
    return (
        <View>
            <TextInput
                style={styles.textInput}
                placeholder='Todo'
                value={editTodo}
                onChangeText={handlerChange}
            />
            <Button
                title='Actualizar'
                onPress={() => updateTodo(todo, editTodo)}
            />
        </View>
    );
};
const styles = StyleSheet.create({
    textInput: {
        padding: 8,
        fontSize: 14,
        borderColor: "grey",
        borderRadius: 8,
        borderWidth: 1,
        margin: 8,
        backgroundColor: "white",
    },
});
export default EditTodoScreen;
