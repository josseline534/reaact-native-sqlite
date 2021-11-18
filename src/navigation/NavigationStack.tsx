import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "../component/Todo/HomeScreen";
import EditTodoScreen from "../component/Todo/EditTodoScreen";

const Stack = createStackNavigator();
const NavigationStack = () => {
    return (
        <Stack.Navigator initialRouteName='Home'>
            <Stack.Screen name='Home' component={HomeScreen} />
            <Stack.Screen name='Edit' component={EditTodoScreen} />
        </Stack.Navigator>
    );
};

export default NavigationStack;
