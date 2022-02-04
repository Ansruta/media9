import React,{Component} from "react";
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
  Dimensions,
  Alert,
  Button
} from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { RFValue } from "react-native-responsive-fontsize";
import firebase from "firebase";

let customFonts = {
    "Bubblegum-Sans": require("./BubbleGum.ttf")
  };
  
  export default class CreateStory extends Component {
    constructor(props) {
      super(props);
      this.state = {
        fontsLoaded: false,
        previewImage: "image_1",
        dropdownHeight: 40,
        light_theme:true
      };
    }
  
    async _loadFontsAsync() {
      await Font.loadAsync(customFonts);
      this.setState({ fontsLoaded: true });
    }
  
    componentDidMount() {
      this._loadFontsAsync();
      this.fetchUser();
    };

async addPost(){
  if(this.state.caption){
    let postData={
      preview_image:this.state.previewImage,
      caption:this.state.caption,
      author:firebase.auth().currentUser.displayName,
      created_on:new Date(),
      author_uid:firebase.auth().currentUser.uid,
      profileImage:this.state.profile_image,
      likes:0
    };
    await firebase.database.ref(
      "/posts/"+Math.random().toString(36).slice(2))
      .set(postData)
      .then(function(snapshot) {})
      this.props.setUpdateToTrue();
      this.props.navigation.navigate("Feed")
  }else{
    Alert.alert(
      "Error",
      "All fields are required",
      [{text:"OK",onPress:()=>console.log("OK pressed")}],
      {cancelled:false}
    )
  }
}

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
    render(){
      if(!this.state.fontsLoaded){
        return <AppLoading/>
      }else{
        
          let previewImages={
            image1:require("./image_1.jpg"),
            image2:require("./image_2.jpg"),
            image3:require("./image_3.jpg"),
            image4:require("./image_4.jpg"),
            image5:require("./image_5.jpg"),
            image6:require("./image_6.jpg"),
            image7:require("./image_7.jpg"),
          };
          return(
            <View style={this.state,light_theme ?  styles.containerLight:styles.container}>
            <SafeAreaView style={styles.droidSafeArea}/>
            <View style={styles.appTitle}>
                <View style={styles.appIcon}>
                    <Image source={require("./logo.png")}
                    style={styles.iconImage}/>
                </View>
                <View style={styles.appTitleTextContainer}>
                    <Text style={this.state,light_theme ?  styles.appTitleTextLight:styles.appTitleText}>New Post</Text>
                </View>
            </View>
            <View style={styles.fieldsContainer}>
                <ScrollView>
                    <Image source={previewImages[this.state.previewImage]}
                    style={styles.previewImage}/>
                    <View style={{height:RfValue(this.state.dropdownHeight)}}>
                        <DropDownPicker
                        items={[
                            {label:"Image1", value:"image1"},
                            {label:"Image2", value:"image2"},
                            {label:"Image3", value:"image3"},
                            {label:"Image4", value:"image4"},
                            {label:"Image5", value:"image5"},
                            {label:"Image6", value:"image6"},
                            {label:"Image7", value:"image7"},
                        ]}
                        defaultValue={this.state.previewImage}
                        containerStyle={{
                            height:40,
                            borderRadius:20,
                            marginBottom:10
                        }}
                        onOpen={()=>{
                            this.setState({dropdownHeight:170});
                        }}
                        onClose={()=>{
                            this.setState({dropdownHeight:40});
                        }}
                        style={{backgroungColor:"transparent"}}
                        labelstyle={{color:this.state.light_theme ?  "black" :"white"}}
                        arrowStyle={{color:this.state.light_theme ?  "black" :"white"}}
                        onChangeItem={item=>
                        this.setState({previewImage:item.value})}></DropDownPicker>

                    </View>
                    <View>
                    <TextInput
                    style={this.state,light_theme ?  styles.inputFontLight:styles.inputFont, inputFontExtra,inputTextBig}
                    onChangeText={caption=>this.setState({caption:caption})}
                    placeHolder={"Caption"}
                    placeHolderTextColor={this.state,light_theme ?  "black":"white"}
                    />
                    </View>
                    <View style={styles.submitButton}>
                      <Button
                      onPress={()=>this.addPost()}
                      title="Submit"
                      color="#841584"/>
                      </View>
                   
                </ScrollView>
            </View>
            </View>
        )
      }
    }
};

const styles=StyleSheet.create({
container:{
    flex:1,
    backgroundColor:"black"
},
containerLight:{
  flex:1,
  backgroundColor:"white"
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
appTitleTextLight:{
  color:"black",
  fontSize:RFValue(28)
},
fieldsContainer: {
    flex: 0.85
  },
previewImage: {
    width: "93%",
    height: RFValue(250),
    alignSelf: "center",
    borderRadius: RFValue(10),
    marginVertical: RFValue(10),
    resizeMode: "contain"
  },
  inputFont: {
    height: RFValue(40),
    borderColor: "white",
    borderWidth: RFValue(1),
    borderRadius: RFValue(10),
    paddingLeft: RFValue(10),
    color: "white",
    fontFamily: "Bubblegum-Sans"
  },
  inputFontLight: {
    height: RFValue(40),
    borderColor: "black",
    borderWidth: RFValue(1),
    borderRadius: RFValue(10),
    paddingLeft: RFValue(10),
    color: "white",
    fontFamily: "Bubblegum-Sans"
  },
  inputFontExtra: {
    marginTop: RFValue(15)
  },
  inputTextBig: {
    textAlignVertical: "top",
    padding: RFValue(5)
  },
  submitButton: {
    marginTop: RFValue(20),
    alignItems: "center",
    justifyContent: "center"
  }
})
