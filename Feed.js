import * as React from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    Platform,
    StatusBar,
    Image,
    ScrollView,
    TextInput,
    Dimensions
  } from "react-native";
  import { RFValue } from "react-native-responsive-fontsize";
  import DropDownPicker from "react-native-dropdown-picker";
  import { FlatList } from "react-native-gesture-handler";
  import AppLoading from "expo-app-loading";
  import * as Font from "expo-font";
  import PostCard from './PostCard';
  import firebase from "firebase";
  

export default class Feed extends React.Component{

    constructor(props){
        super(props);
        this.state=({
            posts:[]
        })
    };

    componentDidMount() {
        this.fetchStories();
        this.fetchUser();
      }

 fetchPosts=()=>{
firebase.database.ref("/posts/").on(
    "value",
    snapshot=>{
        let posts=[];
        if(snapshot.val()){
            Object.keys(snapshot.val()).forEach(function(key){
                posts.push({
                    key:key,
                    value:snapshot.val()[key]
                });
            });
        }
        this.setState({post:posts});
        this.props.setUpdateToFalse();
    },
    function(errorObject){
        console.log("the rea failed:"+errorObject);
    }
)
 };

 fetchUser = () => {
    let theme;
    firebase
      .database()
      .ref("/users/" + firebase.auth().currentUser.uid)
      .on("value", snapshot => {
        theme = snapshot.val().current_theme;
        this.setState({ light_theme: theme === "light" });
      });
  };

    renderItem=({item:post})=>{
        return <PostCard post={post} navigation={this.props.navigation}></PostCard>
    };

    keyExtractor=(item,index)=>index.toString();
    render(){
        return(
            <View style={styles.contain}>
                <SafeAreaView style={styles.droidSafeArea}/>
                    <View style={styles.appTitle}>
                        <View style={styles.appIcon}>
                            <Image source={require("./logo.png")}
                                    style={styles.iconImage}/>
                        </View>
                        <View style={styles.appTitleTextContainer}>
                            <Text style={styles.appTitleText}> Spectagram </Text>
                        </View>
                    </View>
                    <View styles={styles.cardContainer}>
                        <FlatList
                        keyExtractor={this.keyExtractor}
                        data={posts}
                        renderItem={this.renderItem}
                        />
                    </View>
            </View>
        )
    }
}
const styles=StyleSheet.create({
contain:{
    flex:1,
    backgroundColor:"black"
},
droidSafeArea:{
    marginTop:Platform.OS==="android"?StatusBar.currentHeight:RFValue(30)
},
appTitle:{
    flex:0.07,
    flexDirection:"row"
},
appIcon:{
    flex:0.2,
    justifyContent:"center",
    alignItems:"center"
},
iconImage:{
    width:"100%",
    height:"100%",
    resizeMode:"contain"
},
appTitleTextContainer:{
    flex:0.8,
    justifyContent:"center"
},
appTitleText:{
    color:"white",
    fontSize:RFValue(28)
},
cardContainer:{
    flex:0.05
}
})
