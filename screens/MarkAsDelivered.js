import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { StyleSheet, Button, View, Image, Text, FlatList, AppRegistry, TextInput, ScrollView, TouchableHighlight,PermissionsAndroid, Platform} from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { CameraKitCameraScreen } from 'react-native-camera-kit';


export default class Delivered extends Component{
	constructor(props){
		super(props)
		this.state = {
			dataId:null,
			opneScanner: false,
		}
		let letterStatus = '';
		let type = ''
		
	}
// To check whether camera permission is granted	
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
      that.setState({ opneScanner: true });
    }    
 }
	
currentTime = () => {
    let dt = new Date();
    let date = dt.toLocaleDateString().split('/');
    let time = dt.toTimeString().split(' ');
    let dt_str = `${date[2]}-${date[0]}-${date[1]} ${time[0]}`;
	return dt_str;
}

// mark register posts/normal posts/ parcels as delivered
deliveredButton = () => {
	if(!(this.state.dataId === null)){
		if(this.type === 'NormalPost'|| this.type === 'Parcel'){
			this.letterStatus = 'delivered'
			fetch('http://192.168.8.128:4545/users',{
				method: 'PUT',
				headers: {
					'Accept':'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({id: this.state.dataId, letterType: this.type, status: this.letterStatus, time: this.currentTime()})
			}).then((responseData) => {
				return responseData.json();
			}).then((jsonData) => {
				console.log(jsonData['changedRows']);
				if(jsonData['changedRows'] == 1){
					if(this.type === 'NormalPost')
						alert('Incremented the Normal Post delivered count')
					else if(this.type === 'Parcel')
						alert(this.type + ' marked as ' + this.letterStatus)
				}
				else{
					alert('Nothing Changed in Database. Scan again')
				}
				this.letterStatus = '';
			}).done();
			this.setState({dataId:null});
		}
		else if(this.type === 'RegPost' ){
			fetch('http://192.168.8.128:4545/users/'+(this.state.dataId),{
				method: 'GET',
			}).then((responseData) => {
				return responseData.json();
			}).then((jsonData) => {
				if(jsonData[0]["status"] === "on-route-receiver" || jsonData[0]["status"] === "receiver-unavailable" ){
					this.letterStatus = 'delivered'
				}
				else if(jsonData[0]["status"] === 'on-route-sender' || jsonData[0]["status"] === 'sender-unavailable'){
					this.letterStatus = 'sent-back'
				}
				console.log(this.letterStatus);
				fetch('http://192.168.8.128:4545/users',{
					method: 'PUT',
					headers: {
						'Accept':'application/json',
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({id: this.state.dataId, letterType: this.type, status: this.letterStatus, time: this.currentTime()})
				}).then((responseData) => {
					return responseData.json();
				}).then((jsonData) => {
					console.log(jsonData['changedRows']);
					if(jsonData['changedRows'] == 1){
						if(this.letterStatus === 'delivered' ||this.letterStatus === 'sent-back' )
							alert(this.type + ' marked as ' + this.letterStatus)
						else{
							alert('Something Wrong. May be letter is not in an accepted state to deliver')
						}
					}
					else{
						alert('Nothing Changed in Database. Scan again')
					}
					this.letterStatus = '';
				}).done();				
				this.setState({dataId:null});
			}).done();
		}			
	}
	else{
		alert('Id is not Detected. Please scan again or Enter the ID and submit')
	}		
}

// mark register posts/normal posts/ parcels as undelivered
unavailableButton = () => {
	if(!(this.state.dataId === null)){
		if(this.type === 'NormalPost' || this.type === 'Parcel' ){
			this.letterStatus = 'receiver-unavailable'
			fetch('http://192.168.8.128:4545/users',{
				method: 'PUT',
				headers: {
					'Accept':'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({id: this.state.dataId, letterType: this.type, status: this.letterStatus, time: this.currentTime()})
			}).then((responseData) => {
				return responseData.json();
			}).then((jsonData) => {
				console.log(jsonData['changedRows']);
				if(jsonData['changedRows'] == 1){
					if(this.type === 'NormalPost')
						alert('Incremented the Normal Post failed delivered count')
					else if(this.type === 'Parcel')
						alert(this.type + ' marked as ' + this.letterStatus)
				}
				else{
					alert('Nothing Changed in Database. Scan again')
				}
				this.letterStatus = '';
			}).done();
			this.setState({dataId:null});
		}
		else if(this.type === 'RegPost' ){
			fetch('http://192.168.8.128:4545/users/'+(this.state.dataId),{
				method: 'GET',
			}).then((responseData) => {
				return responseData.json();
			}).then((jsonData) => {
				if(jsonData[0]["status"] === "on-route-receiver" || jsonData[0]["status"] === "receiver-unavailable" ){
					this.letterStatus = 'receiver-unavailable'
				}
				else if(jsonData[0]["status"] === 'on-route-sender' || jsonData[0]["status"] === 'sender-unavailable'){
					this.letterStatus = 'sender-unavailable'
				}
				console.log(this.letterStatus);
				fetch('http://192.168.8.128:4545/users',{
					method: 'PUT',
					headers: {
						'Accept':'application/json',
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({id: this.state.dataId, letterType: this.type, status: this.letterStatus, time: this.currentTime()})
				}).then((responseData) => {
					return responseData.json();
				}).then((jsonData) => {
					console.log(jsonData['changedRows']);
					if(jsonData['changedRows'] == 1){
						if(this.letterStatus == 'receiver-unavailable' ||this.letterStatus == 'sender-unavailable' )
							alert(this.type + ' marked as ' + this.letterStatus)
						else{
							alert('Something Wrong. May be letter is not in an accepetd state to mark undelivered')
						}
					}
					else{
						alert('Nothing Changed in Database. Scan again')
					}
					this.letterStatus = '';
				}).done();				
				this.setState({dataId:null});
			}).done();
		}			
	}
	else{
		alert('Id is not Detected. Please scan again or Enter the ID and submit')
	}
}

// to get data from sacnned QR code	
getData = (qrvalue) => {
	 let qr_content = qrvalue.split('_');
	 if(qr_content === undefined || qr_content[0] === undefined ||qr_content[1] === undefined){
         alert('Invalid QR Code');
     }
	 else{
         let content1 = qr_content[0].split('=');
         let content2 = qr_content[1].split('=');
         if(content1[0] === 'type' && content2[0] === 'id'){
             this.type = content1[1];
             let id = content2[1];
			 if(!(id===this.state.dataId)){
				 this.setState({dataId:id})				  
			 }
         }
         else{
             alert('Invalid QR Code');
         }                
     }
}
	
	
render(){
	if (!this.state.opneScanner) {
	    return (
	        <View style={{flex:1, alignItems: 'center', justifyContent: 'center',}}>{this.onOpneScanner()}
	        </View>
	    );
	}else{
		return(
			<View style={{flex:1}}>
				<CameraKitCameraScreen 
	          		showFrame={false}
	          		scanBarcode={true}
	          		laserColor={'blue'}
	          		frameColor={'yellow'}
	          		colorForScannerFrame={'black'}
	          		onReadCode={event =>
	            		this.getData(event.nativeEvent.codeStringValue)
	          		}
				/>        			
				<View style={{
					width: '100%', height: 200, backgroundColor: 'lightblue',
	    			borderTopLeftRadius: 20,
	    			borderTopRightRadius: 20,
					borderBottomLeftRadius: 20,
	    			borderBottomRightRadius: 20,
	        		justifyContent: 'center',
	        		alignItems: 'center',
					textAlign: 'center'
	      		}}> 
	     			<Text style={{fontSize: 25,color: 'royalblue'}}>Letter/Parcel ID</Text>
					<Text style={{fontSize: 25,color: 'royalblue',}}>{this.state.dataId}</Text>	
					<Text style={{fontSize:5}}>{'\n'}</Text>
					<Button
	          			title="            Delivered            "
	          			onPress={this.deliveredButton}
	        		/>
					<Text style={{fontSize: 5}}>{'\n\n'}</Text>
					<Button
	          			title="        Receiver Unavailable        "
	          			onPress={this.unavailableButton}
	        		/>
					<Text style={{fontSize:5}}>{'\n'}</Text>		
					</View>	
				</View>
			);
		}
}}

const textStyles = StyleSheet.create({
  container: {
    marginTop: 50,
  },
  blue: {
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
  
  black: {
    color: 'azure',
    fontSize: 20,
	textAlign: 'center',
  },
});

AppRegistry.registerComponent('Appname',() => Delivered);


