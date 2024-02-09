import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import dynamicLinks from '@react-native-firebase/dynamic-links';
import React, { useEffect, useState } from 'react'
import Clipboard from '@react-native-clipboard/clipboard';

const App = () => {
 
  const [generatedLink, setGeneratedLink] = useState('')

  const buildLink=async()=> {
    const link = await dynamicLinks().buildLink({
      link: 'https://invertase.io/offer',
      // domainUriPrefix is created in your Firebase console
      domainUriPrefix: 'https://abhishekdeeplinkdemo.page.link',
      // optional setup which updates Firebase analytics campaign
      // "banner". This also needs setting up before hand
      analytics: {
        campaign: 'banner',
      },
    });
    setGeneratedLink(link);
  }


  //Foreground events
  const handleDynamicLink = link => {
    // Handle dynamic link inside your own application
    if (link.url === 'https://invertase.io/offer') {
      // ...navigate to your offers screen
      Alert.alert("Foreground Match")
    }else{
      Alert.alert("Foreground not matched");
    }
  };

  //Background/Quit events
  useEffect(() => {
    dynamicLinks()
      .getInitialLink()
      .then(link => {
        if (link.url === 'https://invertase.io/offer') {
          // ...set initial route as offers screen
          Alert.alert("Background match");
        }else{
          Alert.alert("Background unmatch");
        }
      });
  }, []);

  useEffect(() => {
    const unsubscribe = dynamicLinks().onLink(handleDynamicLink);
    // When the component is unmounted, remove the listener
    return () => unsubscribe();
  }, []);




  return (
    <View style={styles.container}>
      <Text>{generatedLink}</Text>
      <TouchableOpacity style={styles.btn} onPress={()=>buildLink()}>
        <Text>Generate deep link</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btn} onPress={()=>Clipboard.setString(generatedLink)}>
        <Text>Copy deep link</Text>
      </TouchableOpacity>
    </View>
  )
}

export default App

const styles = StyleSheet.create({
  container:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn: {
    height: 60,
    width: 200,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
  }
})