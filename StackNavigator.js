import React,{Component} from "react";
import TabNavigator from './TabNavigator';
import Post from './PostCard';
import {createStackNavigator} from '@react-navigation/stack';

const Stack=createStackNavigator();
const StackNavigator=()=>{
return(
    <Stack.TabNavigator initialRouteName="Home" screenOptions={{headerShown:false}}>
        <Stack.Screen name={"Home"} component={TabNavigator}/>
        <Stack.Screen name={"Post"} component={Post}/>
    </Stack.TabNavigator>
)
}
export default StackNavigator;