import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,  Button, TouchableOpacity } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import { Camera, CameraType} from 'expo-camera';
import * as MediaLibrary from 'expo-media-library'; 
import { useIsFocused } from '@react-navigation/native';

const CameraScreen = ({navigation, route}) => {
  let cameraRef = useRef();
  const isFocused = useIsFocused();
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();
  const [photo, setPhoto] = useState(undefined);
  const [type, setType] = useState(CameraType.back);
  const [backPhoto, setBackPhoto] = useState(undefined);
  const [backPhotoReady, setBackPhotoReady] = useState(false);
  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync();
      setHasCameraPermission(cameraPermission.status === "granted");
      setHasMediaLibraryPermission(mediaLibraryPermission.status === "granted");
    })();
  }, []);

  if (hasCameraPermission === undefined) {
    return <Text>Requesting permissions...</Text>
  } else if (!hasCameraPermission) {
    return <Text>Permission for camera not granted. Please change this in settings.</Text>
  }

  let takePic = async () => {
    let options = {
      quality: 1,
      base64: true,
      exif: false
    };
    
      let newPhoto = await cameraRef.current.takePictureAsync(options);
      
      
      cameraRef.current.pausePreview();
      setPhoto(newPhoto);
      toggleCameraType();
      cameraRef.current.resumePreview();
      setTimeout(async ()  => {
        newPhoto = await cameraRef.current.takePictureAsync(options);
        setBackPhoto(newPhoto);
      }, 1000);
      
      
    
    // else if (!backPhoto) {
    //   
    // }
    
    
  };

  if (photo && backPhoto) {
    
    navigation.navigate("Preview", {photo: photo, backPhoto: backPhoto});
    setPhoto(undefined);
    setBackPhoto(undefined);
    
  }
  function toggleCameraType() {
    setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
  }
  
  return (
    <View style={styles.container}>
        {isFocused && <Camera style={styles.camera} ref={cameraRef} type={type} borderRadius={15} resizeMode="cover" overflow="hidden" >
      <StatusBar style="auto" />
     
      </Camera> }
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={takePic}>
          <View style={styles.ring}/>
        </TouchableOpacity>
        
        <Button title="Reverse" onPress={toggleCameraType}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black'
  },
  buttonContainer: {
    flexDirection: 'row'
  },
  smallPreview: {
    alignSelf: 'flex-start',
    aspectRatio: 0.5,
    marginLeft: 50,
  }, 
  camera: {
    margin: 5,
    width: "80%",
    height: "50%",
  },
  ring: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: "transparent",
    borderColor: "white",
    borderWidth: 5,
    alignSelf: 'center', 
    margin: 10,
    justifyContent: 'center'
  },

});

export default CameraScreen;