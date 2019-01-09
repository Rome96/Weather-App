'use strict'
import React from 'react'
import {TextInput, StyleSheet } from 'react-native'
import PropsTypes from 'prop-types'

function SearchInput ({ placeholder, handleChangeText, value, onSubmit }){
    return(
        <TextInput
          style={styles.textInput}
          //autoFocus
          clearButtonMode="while-editing"
         // value="hello cosmo"
         //maxLength={10}
         placeholder={placeholder}
         returnKeyType="search"
         // secureTextEntry -> para input de password
         placeholderTextColor="#55968f"
         underlineColorAndroid="transparent"
         onChangeText={ handleChangeText } //cap datos del teclado
         value={value} // pasar el valor que esta en mi state
         onSubmitEditing={ onSubmit }
        />
    )
}

SearchInput.prototype = {
    placeholder: PropsTypes.string.isRequired
}


const styles = StyleSheet.create({
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
})

export default SearchInput