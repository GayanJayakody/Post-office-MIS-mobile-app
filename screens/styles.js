import { Dimensions,StyleSheet } from 'react-native';


const windowWidth = Dimensions.get('window').width;


const MarkAsDeliveredStyles = StyleSheet.create({
  container: {
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  subContainer: {
	position: 'absolute',
	left: '25%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  simpleText: {
	textAlign: 'center',
    color: 'goldenrod',
	fontWeight: 'bold',
    fontSize: 25, 
    alignSelf: 'center', 
    padding: 10, 
  },
  image: {
    height: '100%',
    width: windowWidth,
  },
  buttonDeliver:{
	  backgroundColor: 'goldenrod',
	  borderRadius:10,
	  width: 200,
	  height:100 	
  },
  buttonUnavailable:{
	  backgroundColor: 'goldenrod',
	  borderRadius:10,
	  width: 200,
	  height:40 	
  },
  buttonTitle:{
	  color: "white",
	  fontSize: 20
  }
});

const QRStyles = StyleSheet.create({
  container: {
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  subContainer: {
	position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  simpleText: { 
    color: 'goldenrod',
	fontWeight: '900',
    fontSize: 20, 
    alignSelf: 'center',
	padding: 10

  },
  absoluteText: { 
	position: 'absolute',
    color: 'goldenrod',
	fontWeight: '900',
    fontSize: 25, 
    alignSelf: 'center', 
    padding: 10, 
  },
  image: {
    height: '100%',
    width: windowWidth,
  },
  button:{
	  backgroundColor: 'goldenrod',
	  borderRadius:10,
	  width: 200,
	  height:40 	
  },
  buttonTitle:{
	  color: "white",
	  fontSize: 20
  }
});

const MapStyles = StyleSheet.create({
	container:{
		...StyleSheet.absoluteFillObject
	},
	map:{
		...StyleSheet.absoluteFillObject
	}
})
	
export { MapStyles,QRStyles, MarkAsDeliveredStyles} 