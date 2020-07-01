
import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { Text, View, TouchableHighlight, PermissionsAndroid, Platform, ImageBackground, Image, Dimensions } from 'react-native';
import { CameraKitCameraScreen, } from 'react-native-camera-kit';
import {Button} from 'react-native-elements';
import { QRStyles } from './styles'


export default class Scan extends Component {
  constructor() {
    super();
    this.state = {
      qrvalue: null,
      opneScanner: false,
	  getqrvalues: false
    };
  }
  
  onBarcodeScan(qrvalue) {
    //called after te successful scanning of QRCode/Barcode
    this.setState({ opneScanner: true });
	this.setState({ getqrvalues: true });
	let qr_content = qrvalue.split('_');
	if(qr_content === undefined || qr_content[0] === undefined ||qr_content[1] === undefined){
        alert('Invalid QR Code');
          }
	else{
        let content1 = qr_content[0].split('=');
        let content2 = qr_content[1].split('=');
		let content3 = qr_content[2].split('=');
		if (content1[1]==='RegPost'){
			var content4 = qr_content[3].split('=');
		}
        if(content1[0] === 'type' && content2[0] === 'id' && content1[1]==='RegPost'){
			this.setState({ qrvalue: 'Type = '+content1[1]+'\nId      = '+content2[1]+'\n\nDelivery Address = '+content3[1]+'\n\nSender Address = '+content4[1] });
        }
        else if(content1[0] === 'type' && content2[0] === 'id'){
			this.setState({ qrvalue: 'Type = '+content1[1]+'\nId      = '+content2[1]+'\n\nDelivery Address = '+content3[1] });
        }
        else{
            alert('Invalid QR Code');
        }                
      }
  }
  
  // check camera permission
  onOpneScanner() {
    var that =this;
    if(Platform.OS === 'android'){
      async function requestCameraPermission() {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,{
              'title': 'Camera Permission',
              'message': 'Post Office MIS needs access to your camera ',
			  buttonPositive: "OK"
            }
          )
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            //If CAMERA Permission is granted
            that.setState({ qrvalue: null});
            that.setState({ opneScanner: true });
          } else {
            alert("CAMERA permission denied");
          }
        } catch (err) {
          alert("Camera permission err",err);
          console.warn(err);
        }
      }
      //Calling the camera permission function
      requestCameraPermission();
    }else{
      that.setState({ qrvalue: null });
      that.setState({ opneScanner: true });
    }    
  }
  
  render() {
    if (!this.state.opneScanner) {
      	return (
			<ImageBackground source={require('../images/wallpaper.jpg')} style={{flex:1}}>
        		<View style={QRStyles.container}>
					{this.onOpneScanner()}
        		</View>
			</ImageBackground>
      	);
    }
	else if (this.state.qrvalue === null){
	    return (
	      <View style={{flex:1}}>
		 		<View style={{flex: 0.1}}>
				<Image source={require('../images/background.jpg')} style={QRStyles.image}/>
					<Text style={QRStyles.absoluteText}>Scan QR Code</Text>
				</View>
	        	<CameraKitCameraScreen
	          		showFrame={false}
	          		scanBarcode={true}
	          		laserColor={'blue'}
	          		frameColor={'yellow'}
	          		colorForScannerFrame={'black'}
	          		onReadCode={event => this.onBarcodeScan(event.nativeEvent.codeStringValue)}
	        	/>
	      </View>
		
	    );
	}
	else{
	    return (
	      <View style={{flex:1}}>
		  	<View style={{flex:0.5}}>
	        	<CameraKitCameraScreen
	          		showFrame={false}
	          		scanBarcode={true}
	          		laserColor={'blue'}
	          		frameColor={'yellow'}
	          		colorForScannerFrame={'black'}
	          		onReadCode={event => this.onBarcodeScan(event.nativeEvent.codeStringValue)}
	        	/>
			</View>
			<View style={{flex:0.5}}>
			<Image source={require('../images/background.jpg')} style={QRStyles.image}/>
				<View style={QRStyles.subContainer}>
			  	<Text style={QRStyles.simpleText}>{this.state.qrvalue ? this.state.qrvalue : ''}{'\n'}</Text>
				<Button
	          		title="Clear"
					buttonStyle={QRStyles.button}
					titleStyle={QRStyles.buttonTitle}
	          		onPress={() => this.setState({ qrvalue: null})}
	        	/>
			  </View>
			</View>
	      </View>
		
	    );
	}
  }
}
