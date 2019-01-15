import React from 'react';
import {
  Text,
  Platform,
  StyleSheet,
  ImageBackground,
  ActivityIndicator,
  KeyboardAvoidingView
} from 'react-native';

import SearchInput from './src/components/SearchInput'
import { fetchLocationId, fetchWeatherId } from './src/api'
import getWeatherBackground from './src/utils/getWeatherBackground'
//-------------------------------------------------------------------------

export default class App extends React.Component {

  state = {
    text: '',
    city: '',
    weather: '',
    temperature: '',
    isLoading: false,
    error: false
  }
//-------------------------------------------------
  componentDidMount() {
    //buscar clima por defecto
    this._searchWeather("San Francisco")
  }
//-------------------------------------------------------
  _handleChangeText = (text) => this.setState({ text })
//-------------------------------------------------------
  _handleSubmit = () => {
    const { text } = this.state

    if (!text) return
    this._searchWeather(text)
    this.setState({ text: '' })
  }
//--------------------------------------------------------
  _searchWeather = async (location) => {

    try {
      this.setState({ isLoading: true })

      const locationData = await fetchLocationId(location)
      const woeid = locationData[0].woeid
      const weatherData = await fetchWeatherId(woeid)
      const { weather, temperature, city } = weatherData
      this.setState({ weather, temperature, city, isLoading: false, error: false })

    } catch (error) {
      //Manejar el error
      this.setState({
        error: true,
        isLoading: false
      })
    }
  }
//------------------------------------------------------------
  render() {
    const { city, weather, temperature, isLoading, error } = this.state
    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior="padding"
      >

        <ImageBackground
          source={ getWeatherBackground(weather)}
          style={styles.imageBackground}
        >

          {
            isLoading
              ? <ActivityIndicator size="large" />
              : (
                error
                  ? <Text style={[styles.textStyle, styles.smallText]}>Ocurrio un error</Text>
                  : <React.Fragment>
                    <Text style={[styles.largeText, styles.textStyle]}>{city}</Text>
                    <Text style={[styles.smallText, styles.textStyle]}>{weather}</Text>
                    <Text style={[styles.largeText, styles.textStyle]}>{Math.round(temperature)}°</Text>
                  </React.Fragment>
              )
          }
          <SearchInput
            handleChangeText={this._handleChangeText}
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
  largeText: {
    fontSize: 44
  },
  smallText: {
    fontSize: 18
  },
  textStyle: {
    fontFamily: Platform.OS === 'ios' ? 'AvenirNext-Regular' : 'Roboto'
  },

  imageBackground: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }

});
