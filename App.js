import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { StyleSheet, View, Image, Text, AppRegistry, TouchableOpacity, ImageBackground, Dimensions } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Delivered from './screens/MarkAsDelivered'
import Scan from './screens/QR';
import Map from './screens/GoogleMap';

const windowWidth = Dimensions.get('window').width;

function HomeScreen({ navigation(props) }) {
  return (
	<ImageBackground source={require('./images/wallpaper.jpg')} style={{flex:1}}>
    <View style={Styles.container}>
	  	<View style={Styles.top}/>
	  	<View style={Styles.bottom}>
	  	<TouchableOpacity 
			activeOpacity={0.5} 
			onPress = {() => navigation.openDrawer()}>
    		<Image source={require('./images/envilope.png')} style={Styles.image}/>
	  	</TouchableOpacity>
		</View>
    </View>
	</ImageBackground>
  );
}

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
		drawerContentOptions={{
    	  	activeTintColor: 'black',
			inactiveTintColor: 'goldenrod',
			activeBackgroundColor: 'white',
    	  	itemStyle: { marginTop:30},
			labelStyle: {fontWeight: '900',fontSize: 20}
        }}
		drawerStyle={{
          	backgroundColor: 'lavenderblush',
   		  	width: 200,
  		}}
	  initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeScreen} />
		<Drawer.Screen name="Deliver" component={Delivered} />
		<Drawer.Screen name="Scan QR" component={Scan} />
		<Drawer.Screen name="Map" component={Map} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
	
const Styles = StyleSheet.create({
  container: {
    flex: 1,
	alignItems: 'center',
  },
  image: {
    height: windowWidth*341/433/2,
    width: windowWidth/2,
    resizeMode: 'center',
  },
  top: {
    flex: 0.525,
  },
  bottom: {
    flex: 0.3,
  },
});




	

	




	
