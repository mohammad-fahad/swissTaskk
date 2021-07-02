/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  Image,
  StyleSheet,
  Button,
  Text,
  useColorScheme,
  TouchableOpacity,
  View,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
import Home from './Components/Home/Home';
import {useNavigation} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import MainTabScreen from './Components/MainTab/MainTabScreen';
import { Provider } from 'react-redux';
import store from './Redux/store';



const Stack = createStackNavigator();

GoogleSignin.configure({
  webClientId:
    '1012772136315-lhr6vlj3qqgnjc2nkj32hr6vh3stq072.apps.googleusercontent.com',
});



function Login() {
    const navigation = useNavigation();
  // Set an initializing state whilst Firebase connects
  



  async function onGoogleButtonPress() {
    // Get the users ID token
    const {idToken} = await GoogleSignin.signIn();
      console.log("test", idToken );
    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential

    return auth().signInWithCredential(googleCredential);
  }


  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
     //extra added
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  if (!user) {
    return (
      <SafeAreaProvider style={{backgroundColor: '#000'}}>
        <Image
          source={{
            uri: 'https://www.gizmochina.com/wp-content/uploads/2020/03/Netflix-Logo-696x395.png',
          }}
          style={{height: 300, width: 400}}
        />
        <TouchableOpacity
          title="Log Off"
          onPress={logOff}
          style={{
            padding: 15,
            borderRadius: 20,
            backgroundColor: '#ACD1AF',
            marginTop: 50,
            marginHorizontal: 20,
          }}>
          <Text
            style={{
              color: '#ff392e',
              fontWeight: 'bold',
              fontSize: 17,
              textAlign: 'center',
            }}>
            Log out
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            padding: 15,
            borderRadius: 20,
            backgroundColor: '#ACD1AF',
            marginVertical: 50,
            marginHorizontal: 20,
          }}
          onPress={() =>
            onGoogleButtonPress().then(() =>
              navigation.navigate('Home', MainTabScreen),
            )
          }>
          <Text
            style={{
              color: '#ff392e',
              fontWeight: 'bold',
              fontSize: 17,
              textAlign: 'center',
            }}>
            Google Sign-In
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            padding: 15,
            borderRadius: 20,
            backgroundColor: '#ACD1AF',
            marginHorizontal: 20,
          }}
          onPress={() => navigation.navigate('Home', MainTabScreen)}>
          <Text
            style={{
              color: '#ff392e',
              fontWeight: 'bold',
              fontSize: 17,
              textAlign: 'center',
            }}>
            Go to home
          </Text>
        </TouchableOpacity>
      </SafeAreaProvider>
    );
  }

  return navigation.navigate(Home, 'Home');
}
  const logOff = () => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
  };


const App = () => {  
 
 
  
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              title: 'Login',
              headerStyle: {
                backgroundColor: 'grey',
              },
              headerTintColor: '#fff',
            }}
          />
          <Stack.Screen
            name="Home"
            component={MainTabScreen}
            options={{
              title: 'Home',
              headerStyle: {
                backgroundColor: 'grey',
              },
              headerTintColor: '#fff',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

const styles = StyleSheet.create({
  text:{
    marginVertical:50,
    textAlign:'center',    
    fontSize:25,
    color:'white',
    backgroundColor:'green',
    borderRadius: 15,
    padding:10,
    marginHorizontal:20
  }
});

export default App;
