import React from 'react';
import { 
  Text, 
  Platform,
  StyleSheet, 
  KeyboardAvoidingView,
  ImageBackground
} from 'react-native';
import SearchInput from './src/components/SearchInput'
import { fetchLocationId, fetchWeatherId } from './src/api'


export default class App extends React.Component {

  state = {
    text: '',
    location: '',
    weather: '',
    temperature: ''
  }

  _handleChangeText = (text) => {
    this.setState( { text } )
  }

  _handleSubmit = async () => {
    const { text } = this.state

    if( !text )  return

      this.setState({ location: text })
      this.setState({text: ''})

      const locationData = await fetchLocationId (text)
      const woeid = locationData[0].woeid
      
      const weatherData = await fetchWeatherId ( woeid )
      const {weather, temperature} = weatherData
      this.setState({weather, temperature})
  }

  render() {
    const {location, weather, temperature} = this.state
    return (
      <KeyboardAvoidingView 
        style={styles.container}
        behavior="padding"
      >
      
      <ImageBackground
        source={require ('./assets/bg/clear.png')}
        style={styles.imageBackground}
      >

        <Text style={[styles.largeText, styles.textStyle]}>{location}</Text>
        <Text style={[styles.smallText, styles.textStyle]}>{weather}</Text>
        <Text style={[styles.largeText, styles.textStyle]}>{Math.round(temperature)}°</Text>
        <SearchInput
          placeholder="Search a cool city"
          handleChangeText = { this._handleChangeText}
          value={this.state.text}
          onSubmit={this._handleSubmit}
        />
        </ImageBackground>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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

  imageBackground:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
 
});
