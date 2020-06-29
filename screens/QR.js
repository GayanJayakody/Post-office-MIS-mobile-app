
import React, { Component } from 'react';
import { Text, View, TouchableHighlight, PermissionsAndroid, Platform, StyleSheet} from 'react-native';
import { CameraKitCameraScreen, } from 'react-native-camera-kit';

export default class Scan extends Component {
  constructor() {
    super();
    this.state = {
      qrvalue: 'Scan the letter or parcel',
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
            that.setState({ qrvalue: 'Scan the letter or parcel' });
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
      that.setState({ qrvalue: 'Scan the letter or parcel' });
      that.setState({ opneScanner: true });
    }    
  }
  
  render() {
    if (!this.state.opneScanner) {
      return (
        <View style={styles.container}>{this.onOpneScanner()}

        </View>
      );
    }else{
    return (
      <View style={{flex:1}}>
        <CameraKitCameraScreen
          showFrame={false}
          scanBarcode={true}
          laserColor={'blue'}
          frameColor={'yellow'}
          colorForScannerFrame={'black'}
          onReadCode={event =>
            this.onBarcodeScan(event.nativeEvent.codeStringValue)
          }
        />
		  <View style={{width: '100%', height: 300, backgroundColor: 'powderblue',
    		borderTopLeftRadius: 20,
    		borderTopRightRadius: 20,
			borderBottomLeftRadius: 20,
    		borderBottomRightRadius: 20,
        	alignItems: 'center',
			textAlign: 'center'}} >
		  <Text style={styles.subheading}>Letter/Parcel Details</Text>
		  <Text style={styles.simpleText}>{this.state.qrvalue ? this.state.qrvalue : ''}</Text>
		  </View>
      </View>
    );
	}
  }
}




const styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#2c3539',
    padding: 10,
    width:300,
    marginTop:16
  },
  heading: { 
    color: 'white', 
    fontSize: 24, 
    alignSelf: 'center', 
    padding: 10, 
    marginTop: 30 
  },
  simpleText: { 
    color: 'royalblue',
	fontWeight: '900',
    fontSize: 20, 
    alignSelf: 'center', 
    padding: 10, 
  },
  subheading:{
    color: 'royalblue',
	fontWeight: 'bold',
    fontSize: 25, 
    alignSelf: 'center', 
     	
  }
});