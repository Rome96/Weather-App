import React from 'react';
import { 
  Text, 
  View,
  Platform,
  TextInput,
  StyleSheet, 
  KeyboardAvoidingView
} from 'react-native';

export default class App extends React.Component {
  render() {
    return (
      <KeyboardAvoidingView 
        style={styles.container}
        behavior="padding"
      >
        <Text style={[styles.largeText, styles.textStyle]}>San Francisco</Text>
        <Text style={[styles.smallText, styles.textStyle]}>Clear</Text>
        <Text style={[styles.largeText, styles.textStyle]}>15°</Text>
        <TextInput
          style={styles.textInput}
          //autoFocus
          clearButtonMode="while-editing"
         // value="hello cosmo"
         maxLength={10}
         placeholder="Search any city"
         returnKeyType="search"
         // secureTextEntry -> para input de password
         placeholderTextColor="#55968f"
        />
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  largeText:{
    fontSize: 44
  },
  smallText:{
    fontSize: 18
  },
  textStyle:{
    fontFamily: Platform.OS === 'ios' ? 'AvenirNext-Regular' : 'Roboto'
  },
  textInput:{
    backgroundColor: '#bdc3c7',
    height: 40,
    width: 300,
    marginTop: 20,
    borderRadius: 5,
    paddingHorizontal: 10,
    color: 'white',
    elevation: 5, // para ponerle sombrita en andrioid
  }
});
