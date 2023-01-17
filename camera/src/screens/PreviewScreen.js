import React from 'react'; 
import { SafeAreaView, Image, Button, StyleSheet, Pressable, TextInput, KeyboardAvoidingView } from 'react-native';
import { shareAsync } from 'expo-sharing';
import { useState } from 'react';

const PreviewScreen = ({route, navigation}) => {
  const {photo, backPhoto} = route.params;
  const [showFront, setShowFront] = useState(true);
  const [caption, setCaption] = useState('');
  let sharePic = () => {
    shareAsync(photo.uri).then(() => {
      setPhoto(undefined);
    });
  }
  
    
    
    return (
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView style={styles.preview}behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <Pressable style={styles.preview} onPress={() => setShowFront(!showFront)}>
          <Image style={styles.preview} source={{ uri: "data:image/jpg;base64," +  (showFront ? photo.base64: backPhoto.base64) }}/>
        </Pressable>
        <TextInput
          style={styles.input}
          text={caption}
          onChangeText={(newValue) => {
            setCaption(newValue);
          }}
          placeHolder={"Test Caption"}
        />
        </KeyboardAvoidingView>
        <Button title="Post" onPress={sharePic} />
        <Button title="Retake" onPress={() => {navigation.goBack()}} />
      </SafeAreaView>
    );

    };

const styles = StyleSheet.create({
  preview: {
    alignSelf: 'stretch',
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    borderRadius: 30
  }, 
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black'
  },
  input: {
    backgroundColor: 'black',
    color: 'white',
    margin: 5
  }
})
export default PreviewScreen;