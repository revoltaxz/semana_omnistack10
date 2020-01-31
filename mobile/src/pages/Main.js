import React, { useState, useEffect } from 'react'
import { StyleSheet, Image, View, Text } from 'react-native'
import MapView, { Marker, Callout } from 'react-native-maps'
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location'

function Main() {
  const [currentRegion, setCurrentRegion ] = useState(null)

  useEffect(() => {
    async function loadInitialPosition() {  
      const { granted } = await requestPermissionsAsync();

      if (granted) {
        const { coords } = await getCurrentPositionAsync({
          enableHighAccuracy: true
        })

        const { latitude, longitude } = coords

        setCurrentRegion({
          latitude,
          longitude,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        })
      }
    }
    loadInitialPosition()
  }, [])

  if (!currentRegion) {
    return null;
  }

  return (
    <MapView initialRegion={currentRegion} style={styles.map}>
      <Marker coordinate={{ latitude: -20.8325918, longitude: -49.3925664 }}>
        <Image style={styles.avatar} source={{ uri: 'https://avatars3.githubusercontent.com/u/13983654?s=460&v=4'}} />
        <Callout>
          <View style={styles.callout}>
            <Text style={styles.devName}>Guilherme Revolta</Text>
            <Text style={styles.devBio}>22y , FullStack Developer (Elixir, ReactJS)</Text>
            <Text style={styles.devTechs}>ReactJS, ReactNative, Elixir</Text>
          </View>
        </Callout>
      </Marker>
    </MapView>
  )
}

const styles = StyleSheet.create({
  map: {
    flex: 1
  },

  avatar: {
    width: 54,
    height: 54,
    borderRadius: 4,
    borderWidth: 4,
    borderColor: '#FFF'
  },

  callout: {
    width: 280,
  },

  devName: {
    fontWeight: 'bold',
    fontSize: 16
  },

  devBio: {
    color: '#666',
    marginTop: 5
  },

  devTechs: {
    marginTop: 5
  }
})

export default Main