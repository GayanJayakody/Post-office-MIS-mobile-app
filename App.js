import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { StyleSheet, Button, View, Image, Text, AppRegistry, TouchableHighlight, ImageBackground} from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Delivered from './screens/MarkAsDelivered'
import Scan from './screens/QR';
import Map from './screens/GoogleMap';



const textStyles = StyleSheet.create({
  container: {
    marginTop: 50,
  },
  bigBlue: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 30,
  },
  red: {
    color: 'azure',
	fontWeight: 'bold',
    fontSize: 30,
	textAlign: 'center',
  },
});




function HomeScreen({ navigation }) {
  return (
	<ImageBackground source={require('./images/background.jpg')} style={{flex:1}}>
    <View style={textStyles.container} style={{flex: 1,alignItems: 'center'}}>
	  <Text style={textStyles.red}>{'\n'}{'\n'}Sri Lanka Post Office Management and Information System{'\n'}</Text>
	  <Image source={require('./images/sl_post_logo.png')} style={{width: '100%', height: 200}} />
	  <Text>{'\n'}{'\n'}{'\n'}</Text>
	  <TouchableHighlight 
	   	activeOpacity={0.8}
       	underlayColor="blue"
	  	onPress = {() => navigation.openDrawer()}>
	  	<Text style={textStyles.red}>Start Duties</Text>
	  </TouchableHighlight>
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
			inactiveTintColor: 'white',
			activeBackgroundColor: 'white',
    	  	itemStyle: { marginVertical: 10 },
			labelStyle: {fontWeight: 'bold',fontSize: 15}
        }}
		drawerStyle={{
          	backgroundColor: '#1483f9',
   		  	width: 240,
  		}}
	  initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeScreen} />
		<Drawer.Screen name="Mark Delivered" component={Delivered} />
		<Drawer.Screen name="Letter/Parcel Details" component={Scan} />
		<Drawer.Screen name="Map" component={Map} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
	




	

	




	
