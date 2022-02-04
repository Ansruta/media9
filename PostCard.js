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
  Dimensions
} from "react-native";
import Ionicon from 'react-native-vector-icons/Ionicons';
import { RFValue } from "react-native-responsive-fontsize";
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as Font from "expo-font";

let customFonts = {
  "Bubblegum-Sans": require("./BubbleGum.ttf")
};

export default class PostCard extends Component{

  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false,
      light_theme: true,
      post_id:this.props.post.key,
      post_data:this.props.post.value
    };
  }

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this._loadFontsAsync();
    this.fetchUser();
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
        return(
<TouchableOpacity style={this.state.light_theme ? styles.containerLight:styles.container} onPress={()=>this.props.navigatoin.navigate("StoryScreen",{story:this.props.story})}>
    <View style={this.state.light_theme ? styles.cardContainerLight:styles.cardContainer}>
        <View style={styles.authorContainer}>
            <View style={styles.authorImageContainer}>
                <Image source={require("./profile_img.png")}
                       style={styles.profileImage}/>
            </View>
            <View style={styles.authorNameContainer}>
                <Text style={this.state.light_theme ? styles.authorNameTextLight:styles.authorNameText}>(this.props.post.author)</Text>
            </View>
        </View>
        <Image source={require("./post.jpeg")}
                style={styles.postImage}/>
        <View >
            <Text style={this.state.light_theme ? styles.captionTextLight:styles.captionText}>
                {this.props.post.caption}
            </Text>
        </View>
        <View style={styles.actionContainer}>
            <View style={styles.likeButton}>
                <Ionicons name={"heart"} size={RFValue(30)} color={"white"}/>
                <Text style={this.state.light_theme ? styles.likeTextLight:styles.likeText}>12k</Text>
            </View>
        </View>
    </View>
</TouchableOpacity>
        )
    }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:"black"
    },
    containerLight: {
      flex: 1,
      backgroundColor:"white"
    },
    cardContainer: {
      margin: RFValue(13),
      backgroundColor: "#2f345d",
      borderRadius: RFValue(20)
    },
    cardContainerLight: {
      margin: RFValue(13),
      backgroundColor: "white",
      borderRadius: RFValue(20)
    },
    profileImage: {
      resizeMode: "contain",
      width: "95%",
      alignSelf: "center",
      height: RFValue(250)
    },
    authorNameContainer: {
      paddingLeft: RFValue(20),
      justifyContent: "center"
    },
    
    authorNameText: {
      fontSize: RFValue(18),
      fontFamily: "sans-serif",
      color: "white"
    },
    authorNameTextLight: {
      fontSize: RFValue(18),
      fontFamily: "sans-serif",
      color: "black"
    },
    captionText: {
      fontFamily: "sans-serif",
      fontSize: 13,
      color: "white",
      paddingTop: RFValue(10)
    },
    captionTextLight: {
      fontFamily: "sans-serif",
      fontSize: 13,
      color: "black",
      paddingTop: RFValue(10)
    },
    actionContainer: {
      justifyContent: "center",
      alignItems: "center",
      padding: RFValue(10)
    },
    likeButton: {
      width: RFValue(160),
      height: RFValue(40),
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "row",
      backgroundColor: "#eb3948",
      borderRadius: RFValue(30)
    },
    likeText: {
      color: "white",
      fontFamily: "sans-serif",
      fontSize: RFValue(25),
      marginLeft: RFValue(5)
    },
    likeTextLight: {
      color: "black",
      fontFamily: "sans-serif",
      fontSize: RFValue(25),
      marginLeft: RFValue(5)
    }
  });
  